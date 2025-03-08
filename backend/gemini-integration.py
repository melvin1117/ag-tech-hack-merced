import pandas as pd
import google.generativeai as genai
import os
import json
from farm_data_processor import FarmDataProcessor, load_example_data
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

def generate_gemini_insights(sensor_data, lat=None, lon=None, model_name="gemini-1.5-pro"):
    """
    Generate farming insights using the Gemini AI API.
    
    Args:
        sensor_data (dict or pd.DataFrame): NPK sensor data from the farm
        lat (float, optional): Latitude for weather data
        lon (float, optional): Longitude for weather data
        model_name (str): Gemini model to use
    
    Returns:
        dict: Gemini's farming recommendations in JSON format
    """
    # Initialize the data processor
    processor = FarmDataProcessor()
    
    # Try to load pre-trained models
    if not processor.load_models("models/farm_data"):
        print("Pre-trained models not found. Training new models...")
        # If models don't exist, train them on example data
        df = load_example_data()
        processor.create_preprocessor()
        processor.fit_preprocessor(df)
        processor.train_crop_yield_model(df, df['yield'])
        processor.train_crop_recommendation_model(df, df['crop'])
        processor.save_models("models/farm_data")
    
    # Generate insights and get the Gemini JSON prompt
    insights = processor.generate_insights(sensor_data, lat, lon)
    json_prompt = insights['gemini_prompt']
    
    # Call the Gemini API with JSON instructions
    model = genai.GenerativeModel(model_name)
    
    # Configure the model to generate JSON responses
    generation_config = {
        "temperature": 0.2,  # Lower temperature for more deterministic responses
        "top_p": 0.8,
        "top_k": 40,
        "response_mime_type": "application/json"  # Request JSON response
    }
    
    # Generate response
    response = model.generate_content(
        json_prompt,
        generation_config=generation_config
    )
    
    # Parse JSON response
    try:
        gemini_json_response = json.loads(response.text)
    except json.JSONDecodeError:
        # Fallback in case Gemini doesn't return valid JSON
        gemini_json_response = {
            "error": "Invalid JSON response from Gemini",
            "raw_response": response.text
        }
    
    # Structure the complete response with all data needed for frontend
    gemini_insights = {
        'sensor_data': insights['raw_sensor_data'],
        'soil_health': insights['soil_health'],
        'crop_recommendations': insights.get('crop_recommendations', []),
        'predicted_yield': insights.get('predicted_yield'),
        'gemini_recommendations': gemini_json_response
    }
    
    return gemini_insights

def format_recommendations_for_dashboard(gemini_insights):
    """
    Format the Gemini insights for display on the Streamlit dashboard.
    
    Args:
        gemini_insights (dict): The insights from Gemini in JSON format
    
    Returns:
        dict: Formatted insights for the dashboard
    """
    # Format for dashboard
    dashboard_data = {
        'soil_summary': {
            'npk_status': {
                'N': gemini_insights['soil_health']['N']['status'],
                'P': gemini_insights['soil_health']['P']['status'],
                'K': gemini_insights['soil_health']['K']['status'],
            },
            'overall_health': gemini_insights['soil_health']['derived_metrics']['growth_potential']['status']
        },
        'top_recommendations': []
    }
    
    # Extract structured recommendations from Gemini JSON response
    gemini_recommendations = gemini_insights['gemini_recommendations']
    
    # Add recommendations sections in a structured way
    recommendation_categories = [
        ('soil_management_recommendations', 'Soil Management'),
        ('fertilizer_suggestions', 'Fertilizer Recommendations'),
        ('crop_rotation_advice', 'Crop Rotation Advice'),
        ('irrigation_recommendations', 'Irrigation Recommendations'),
        ('potential_issues', 'Potential Issues'),
        ('sustainable_practices', 'Sustainable Practices')
    ]
    
    for key, title in recommendation_categories:
        if key in gemini_recommendations:
            recommendations = gemini_recommendations[key]
            
            # Handle different formats (string, list, or object)
            if isinstance(recommendations, str):
                dashboard_data['top_recommendations'].append({
                    'title': title,
                    'details': [recommendations]
                })
            elif isinstance(recommendations, list):
                dashboard_data['top_recommendations'].append({
                    'title': title,
                    'details': recommendations
                })
            elif isinstance(recommendations, dict):
                # Convert dict to list of strings
                details = []
                for subtitle, content in recommendations.items():
                    if isinstance(content, str):
                        details.append(f"{subtitle}: {content}")
                    elif isinstance(content, list):
                        details.append(f"{subtitle}: {', '.join(content)}")
                
                dashboard_data['top_recommendations'].append({
                    'title': title,
                    'details': details
                })
    
    # Add crop recommendations with nutrient comparison data for frontend visualization
    if 'crop_recommendations' in gemini_insights:
        dashboard_data['crop_recommendations'] = []
        
        for rec in gemini_insights['crop_recommendations'][:3]:  # Top 3 crops
            crop_data = {
                'name': rec['crop'],
                'score': rec['suitability_score']
            }
            
            # Only add nutrient_comparison if it exists
            if 'nutrient_comparison' in rec:
                crop_data['nutrient_comparison'] = rec['nutrient_comparison']
            else:
                # Add placeholder data for visualization
                crop_data['nutrient_comparison'] = {
                    'N': {'actual': gemini_insights['sensor_data']['N'], 
                          'ideal': 100, 'min': 80, 'max': 120, 'status': 'optimal'},
                    'P': {'actual': gemini_insights['sensor_data']['P'], 
                          'ideal': 45, 'min': 30, 'max': 60, 'status': 'optimal'},
                    'K': {'actual': gemini_insights['sensor_data']['K'], 
                          'ideal': 45, 'min': 30, 'max': 60, 'status': 'optimal'}
                }
            
            dashboard_data['crop_recommendations'].append(crop_data)
    
    # Add predicted yield if available
    if 'predicted_yield' in gemini_insights:
        dashboard_data['predicted_yield'] = gemini_insights['predicted_yield']
    
    return dashboard_data

def save_insights_to_mongodb(farm_id, insights, mongo_client):
    """
    Save the farming insights to MongoDB.
    
    Args:
        farm_id (str): Unique identifier for the farm
        insights (dict): Generated insights
        mongo_client: MongoDB client connection
    
    Returns:
        bool: Success status
    """
    try:
        # Access the database and collection
        db = mongo_client.smart_farming
        insights_collection = db.farm_insights
        
        # Structure the document
        document = {
            'farm_id': farm_id,
            'timestamp': pd.Timestamp.now(),
            'sensor_data': insights['sensor_data'],
            'soil_health': insights['soil_health'],
            'crop_recommendations': insights.get('crop_recommendations', []),
            'predicted_yield': insights.get('predicted_yield'),
            'gemini_recommendations': insights['gemini_recommendations']
        }
        
        # Insert into MongoDB
        result = insights_collection.insert_one(document)
        
        print(f"Insights saved to MongoDB with ID: {result.inserted_id}")
        return True
    
    except Exception as e:
        print(f"Error saving to MongoDB: {e}")
        return False

def main():
    """
    Main function to demonstrate the Gemini AI integration.
    """
    print(f"AccuWeather API Key: {os.getenv('ACCUWEATHER_API_KEY')}")

    # Example sensor data (in a real app, this would come from actual NPK sensors)
    sensor_data = {
        'N': 90,
        'P': 42,
        'K': 43,
        'soil_type': 'Clay'
    }
    
    # Example location coordinates for Merced, California
    lat = 37.325954
    lon = -120.499992
    
    print("Generating farming insights with Gemini AI...")
    
    # Generate insights - pass lat/lon
    gemini_insights = generate_gemini_insights(sensor_data, lat, lon)
    print("Farming insights generated successfully!")
    
    # Format for dashboard
    dashboard_data = format_recommendations_for_dashboard(gemini_insights)
    
    # Print results
    print("\n=== GEMINI AI RECOMMENDATIONS (JSON) ===")
    print(json.dumps(gemini_insights['gemini_recommendations'], indent=2))
    
    print("\n=== DASHBOARD SUMMARY ===")
    print(f"Soil Health: {dashboard_data['soil_summary']['overall_health']}")
    print(f"NPK Status: N: {dashboard_data['soil_summary']['npk_status']['N']}, " +
          f"P: {dashboard_data['soil_summary']['npk_status']['P']}, " +
          f"K: {dashboard_data['soil_summary']['npk_status']['K']}")
    
    if 'crop_recommendations' in dashboard_data:
        print("\nTop Recommended Crops:")
        for crop in dashboard_data['crop_recommendations']:
            print(f"- {crop['name']} (Score: {crop['score']:.2f})")
            
            # Print nutrient comparison for frontend
            for nutrient, data in crop['nutrient_comparison'].items():
                print(f"  * {nutrient}: Current {data['actual']} vs. Ideal {data['ideal']} ({data['status']})")
    
    if 'predicted_yield' in dashboard_data:
        print(f"\nPredicted Yield: {dashboard_data['predicted_yield']:.2f}")
    
    print("\nTop Recommendations:")
    for rec in dashboard_data['top_recommendations']:
        print(f"- {rec['title']}")
        for detail in rec['details'][:2]:  # Show first two details for brevity
            print(f"  * {detail}")
        if len(rec['details']) > 2:
            print(f"  * ... ({len(rec['details']) - 2} more)")
    
    return gemini_insights, dashboard_data

if __name__ == "__main__":
    gemini_insights, dashboard_data = main()