import pandas as pd
import google.generativeai as genai
import os
import json
import base64
import requests
import time
from pathlib import Path
from farm_data_processor import FarmDataProcessor, load_example_data
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

# Configure the Gemini API with error checking
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment variables")
else:
    print(f"Gemini API Key found: {GEMINI_API_KEY[:5]}...")
    genai.configure(api_key=GEMINI_API_KEY)

# OpenWeatherMap API key
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not OPENWEATHER_API_KEY:
    print("WARNING: OPENWEATHER_API_KEY not found in environment variables")

def get_weather_data(lat, lon):
    """Get weather data using OpenWeatherMap API."""
    if not OPENWEATHER_API_KEY:
        print("WARNING: Cannot fetch weather data - OPENWEATHER_API_KEY not set")
        return {
            "temperature": 25.0,
            "humidity": 60.0,
            "precipitation": 0.0,
            "wind_speed": 5.0,
            "conditions": "Clear",
            "description": "clear sky (default values - no API key)"
        }
        
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
        response = requests.get(url)
        response.raise_for_status()
        weather_data = response.json()
        
        return {
            "temperature": weather_data["main"]["temp"],
            "humidity": weather_data["main"]["humidity"],
            "precipitation": weather_data.get("rain", {}).get("1h", 0),
            "wind_speed": weather_data["wind"]["speed"],
            "conditions": weather_data["weather"][0]["main"],
            "description": weather_data["weather"][0]["description"]
        }
        
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        return {
            "temperature": 25.0,
            "humidity": 60.0,
            "precipitation": 0.0,
            "wind_speed": 5.0,
            "conditions": "Clear",
            "description": "clear sky (default values after API error)"
        }

def encode_image(image_path):
    """Encode an image file as base64 for sending to Gemini API."""
    try:
        if not os.path.exists(image_path):
            print(f"WARNING: Image file not found at path: {image_path}")
            return None
            
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    except Exception as e:
        print(f"Error encoding image: {e}")
        return None

def generate_gemini_insights(current_crop, lat=None, lon=None, image_path=None, model_name="gemini-1.5-pro"):
    """Generate farming insights using the Gemini AI API."""
    print("\n=== STARTING GEMINI INSIGHTS GENERATION ===")
    sensor_data = {
        'N': 95,
        'P': 52,
        'K': 50,
        'humidity': 70,
        'soil_type': 'Clay'
    }
    
    # Check API key availability
    if not GEMINI_API_KEY:
        print("ERROR: Cannot proceed with Gemini insights - API key not available")
        return create_fallback_output(sensor_data, current_crop, {}, None)
    
    # Initialize the data processor
    processor = FarmDataProcessor()
    
    # Try to load pre-trained models with robust error handling
    try:
        models_loaded = processor.load_models("models/farm_data")
    except (AttributeError, ImportError, Exception) as e:
        print(f"Error loading models: {str(e)}")
        print("Falling back to training new models")
        models_loaded = False
    
    # Train new models if loading failed
    if not models_loaded:
        try:
            print("Pre-trained models not found or incompatible. Training new models...")
            df = load_example_data()
            processor.create_preprocessor()
            processor.fit_preprocessor(df)
            processor.train_crop_yield_model(df, df['yield'])
            processor.train_crop_recommendation_model(df, df['crop'])
            processor.save_models("models/farm_data")
        except Exception as e:
            print(f"Error training new models: {str(e)}")
            print("Falling back to simplified insights generation")
            return create_fallback_output(sensor_data, current_crop, {}, None)
    
    # Get weather data if coordinates are provided
    weather_data = None
    if lat is not None and lon is not None:
        try:
            weather_data = get_weather_data(lat, lon)
            print("Weather data fetched:", json.dumps(weather_data, indent=2))
        except Exception as e:
            print(f"Error fetching weather data: {str(e)}")
            # Create basic weather data
            weather_data = {
                'temperature': 25,
                'humidity': 70,
                'precipitation': 0,
                'wind_speed': 5,
                'description': 'Weather data unavailable'
            }
    
    # Generate insights with error handling
    try:
        insights = processor.generate_insights(sensor_data, lat, lon)
        
        # Add current crop to insights
        insights['current_crop'] = current_crop
        print(f"Current crop: {current_crop}")
        
        # Add weather data to the insights if available
        if weather_data:
            insights['weather_data'] = weather_data
            
            # Modify the gemini prompt to include weather data
            if 'gemini_prompt' in insights:
                if isinstance(insights['gemini_prompt'], str):
                    insights['gemini_prompt'] += f"""
                    
    Weather conditions information:
    - Temperature: {weather_data['temperature']}°C
    - Humidity: {weather_data['humidity']}%
    - Wind Speed: {weather_data['wind_speed']} m/s
    - Conditions: {weather_data['description']}
    
    Please incorporate this weather data into your analysis and recommendations.
    """
                elif isinstance(insights['gemini_prompt'], dict):
                    insights['gemini_prompt']['weather_data'] = weather_data
        
        json_prompt = insights['gemini_prompt']
        
    except Exception as e:
        print(f"Error generating insights: {str(e)}")
        return create_fallback_output(sensor_data, current_crop, {}, weather_data)
    
    # Continue with the rest of the function as before
    # Create a structured prompt for Gemini
    db_schema_prompt = f"""
You are an agricultural AI assistant. Based on the soil analysis, weather data, location, current date, and CURRENTLY PLANTED CROP ({current_crop}) provided, generate a detailed farming recommendation in the following JSON format:

{{
  "soil": {{
    "npk": {{
      "nitrogen": {{
        "current": CURRENT_N_VALUE,
        "optimum": OPTIMUM_N_VALUE
      }},
      "phosphorus": {{
        "current": CURRENT_P_VALUE,
        "optimum": OPTIMUM_P_VALUE
      }},
      "potassium": {{
        "current": CURRENT_K_VALUE,
        "optimum": OPTIMUM_K_VALUE
      }}
    }},
    "soilMoisture": CURRENT_HUMIDITY_VALUE
  }},
  "imageInsights": [
    {{
      "label": "Soil Quality Assessment",
      "path": "./results/analysis_results.png",
      "value": CONFIDENCE_SCORE_1
    }},
    {{
      "label": "Nutrient Distribution Analysis",
      "path": "./results/analysis_results.png",
      "value": CONFIDENCE_SCORE_2
    }}
  ],
  "predictedYield": PREDICTED_YIELD_VALUE,
  "carbonFootprint": "CARBON_FOOTPRINT_ASSESSMENT",
  "suggestions": "DETAILED_FARMING_RECOMMENDATIONS_FOR_CURRENT_CROP",
  "insights": "DETAILED_SOIL_AND_WEATHER_ANALYSIS_CONSIDERING_CURRENT_CROP",
  "recommendedCrops": [
    {{
      "label": "CROP_NAME_1",
      "value": "REASON_FOR_RECOMMENDATION_AFTER_CURRENT_CROP",
      "when": "OPTIMAL_PLANTING_SEASON_BASED_ON_LOCATION_AND_CURRENT_DATE"
    }},
    {{
      "label": "CROP_NAME_2",
      "value": "REASON_FOR_RECOMMENDATION_AFTER_CURRENT_CROP",
      "when": "OPTIMAL_PLANTING_SEASON_BASED_ON_LOCATION_AND_CURRENT_DATE"
    }},
    {{
      "label": "CROP_NAME_3",
      "value": "REASON_FOR_RECOMMENDATION_AFTER_CURRENT_CROP",
      "when": "OPTIMAL_PLANTING_SEASON_BASED_ON_LOCATION_AND_CURRENT_DATE"
    }}
  ]
}}

Include specific, actionable recommendations based on the NPK values, humidity level, current weather conditions, location (Merced, California), current date (March 2025), and the fact that {current_crop} is currently planted. For each recommended crop, provide a reason for the recommendation, considering it would come after the current crop in rotation, and when it should be planted. Your response must be solely the JSON object with no other text.
"""
    
    # Weather text prompt
    weather_text = ""
    if weather_data:
        weather_text = f"""
Current Weather Conditions:
- Temperature: {weather_data['temperature']}°C
- Humidity: {weather_data['humidity']}%
- Precipitation: {weather_data['precipitation']} mm
- Wind Speed: {weather_data['wind_speed']} m/s
- Conditions: {weather_data['description']}

Location: Merced, California (Central Valley)
Current Date: March 2025 (Early Spring in Northern Hemisphere)
"""
    
    # Soil data text prompt
    soil_text = f"""
Soil Analysis:
- Nitrogen (N): {sensor_data.get('N', 'unknown')}
- Phosphorus (P): {sensor_data.get('P', 'unknown')}
- Potassium (K): {sensor_data.get('K', 'unknown')}
- Humidity: {sensor_data.get('humidity', 'unknown')}%
- Soil Type: {sensor_data.get('soil_type', 'unknown')}

Currently Planted Crop: {current_crop}

Please provide specific recommendations based on these NPK values, humidity level, and the current crop.
Consider the current season (March - early spring), location (Merced, California), and the fact that {current_crop} is currently planted when making recommendations.
Include advice about managing the current crop as well as recommendations for future crop rotations.
"""
    
    # Combine all prompts
    content_parts = [
        weather_text,
        soil_text,
        db_schema_prompt,
        json_prompt
    ]
    
    # Add image if available
    if image_path and Path(image_path).exists():
        try:
            encoded_image = encode_image(image_path)
            if encoded_image:
                print(f"Including soil analysis image: {image_path}")
                content_parts.append({
                    "mime_type": "image/jpeg",
                    "data": encoded_image
                })
            else:
                print(f"Failed to encode image: {image_path}")
        except Exception as e:
            print(f"Error encoding image: {str(e)}")
    
    # Initialize Gemini model
    try:
        model = genai.GenerativeModel(model_name)
        print(f"Successfully initialized Gemini model: {model_name}")
    except Exception as e:
        print(f"ERROR initializing Gemini model: {e}")
        return create_fallback_output(sensor_data, current_crop, insights, weather_data)
    
    # Configure the model to generate JSON responses
    generation_config = {
        "temperature": 0.2,
        "top_p": 0.8,
        "top_k": 40,
        "response_mime_type": "application/json",
        "max_output_tokens": 2048
    }
    
    # Call the Gemini API with multimodal input
    print("Calling Gemini API...")
    gemini_json_response = {}
    
    try:
        max_retries = 2
        retry_count = 0
        
        while retry_count < max_retries:
            try:
                response = model.generate_content(
                    content_parts,
                    generation_config=generation_config
                )
                
                response_text = response.text
                print(f"Received Gemini response (truncated): {response_text[:200]}...")
                
                try:
                    gemini_json_response = json.loads(response_text)
                    break
                    
                except json.JSONDecodeError:
                    print("Warning: Invalid JSON response from Gemini. Attempting to extract JSON...")
                    
                    import re
                    json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
                    if json_match:
                        try:
                            gemini_json_response = json.loads(json_match.group(0))
                            break
                        except json.JSONDecodeError:
                            print("Failed to extract JSON from match pattern")
                            
                    retry_count += 1
                    if retry_count < max_retries:
                        print(f"Retrying Gemini API call ({retry_count}/{max_retries})...")
                        time.sleep(2)
                    else:
                        return create_fallback_output(sensor_data, current_crop, insights, weather_data)
            
            except Exception as e:
                print(f"Error in Gemini API call: {e}")
                retry_count += 1
                if retry_count < max_retries:
                    print(f"Retrying Gemini API call ({retry_count}/{max_retries})...")
                    time.sleep(2)
                else:
                    return create_fallback_output(sensor_data, current_crop, insights, weather_data)
    
    except Exception as e:
        print(f"ERROR calling Gemini API: {e}")
        return create_fallback_output(sensor_data, current_crop, insights, weather_data)
    
    # Check if we have a valid response
    if not gemini_json_response or not isinstance(gemini_json_response, dict):
        print("WARNING: No valid JSON response received from Gemini API")
        return create_fallback_output(sensor_data, current_crop, insights, weather_data)
    
    # Add timestamp and other missing data
    if 'soil' not in gemini_json_response:
        gemini_json_response['soil'] = {
            'npk': {
                'nitrogen': {'current': sensor_data.get('N', 0), 'optimum': 100},
                'phosphorus': {'current': sensor_data.get('P', 0), 'optimum': 45},
                'potassium': {'current': sensor_data.get('K', 0), 'optimum': 45}
            },
            'soilMoisture': sensor_data.get('humidity', 50)
        }
    
    # Ensure all required fields are present
    required_fields = ['imageInsights', 'predictedYield', 'carbonFootprint', 'suggestions', 'insights', 'recommendedCrops']
    for field in required_fields:
        if field not in gemini_json_response:
            if field == 'imageInsights':
                gemini_json_response[field] = [
                    {'label': 'Soil Quality', 'path': './results/analysis_results.png', 'value': 0.85},
                    {'label': 'Nutrient Distribution', 'path': './results/analysis_results.png', 'value': 0.78}
                ]
            elif field == 'predictedYield':
                gemini_json_response[field] = insights.get('predicted_yield', 1000)
            elif field == 'carbonFootprint':
                gemini_json_response[field] = 'Medium'
            elif field == 'suggestions':
                gemini_json_response[field] = "Maintain soil pH between 6.0 and 7.0; Add organic matter to improve soil structure; Apply balanced fertilizers based on soil test results."
            elif field == 'insights':
                gemini_json_response[field] = f"Soil analysis shows N: {sensor_data.get('N')}, P: {sensor_data.get('P')}, K: {sensor_data.get('K')}. Weather conditions: {weather_data.get('description')} at {weather_data.get('temperature')}°C."
            elif field == 'recommendedCrops':
                gemini_json_response[field] = [
                    {
                        "label": "Cotton",
                        "value": "Well-suited for the soil conditions with current NPK values and moderate water requirements.",
                        "when": "Plant in late April to early May when soil temperatures are consistently above 60°F."
                    },
                    {
                        "label": "Rice",
                        "value": "Good match for current soil conditions and can utilize the available nutrients effectively.",
                        "when": "Plant in mid-April to early May when danger of frost has passed."
                    },
                    {
                        "label": "Tomatoes",
                        "value": "Commercial crop that thrives in the Central Valley climate and current soil conditions.",
                        "when": "Transplant after last frost date, typically mid-March to early April in Merced."
                    }
                ]
    
    # Check if recommendedCrops is in the wrong format (string instead of array)
    if isinstance(gemini_json_response.get('recommendedCrops'), str):
        print("Warning: recommendedCrops is a string, converting to array format...")
        gemini_json_response['recommendedCrops'] = [
            {
                "label": "Cotton",
                "value": "Well-suited for the soil conditions with current NPK values and moderate water requirements.",
                "when": "Plant in late April to early May when soil temperatures are consistently above 60°F."
            },
            {
                "label": "Rice",
                "value": "Good match for current soil conditions and can utilize the available nutrients effectively.",
                "when": "Plant in mid-April to early May when danger of frost has passed."
            },
            {
                "label": "Tomatoes",
                "value": "Commercial crop that thrives in the Central Valley climate and current soil conditions.",
                "when": "Transplant after last frost date, typically mid-March to early April in Merced."
            }
        ]
    
    # Add weather data
    if weather_data:
        gemini_json_response['weather'] = weather_data
    
    return gemini_json_response

def create_fallback_output(sensor_data, current_crop, insights, weather_data):
    """Create a fallback output when Gemini API fails."""
    
    # Adjust fallback recommendations based on current crop
    crop_specific_suggestions = f"Maintain adequate irrigation for the {current_crop}; Monitor for pests common to {current_crop} in early spring; Apply appropriate fertilizers based on current NPK values."
    crop_specific_insights = f"Current crop ({current_crop}) may be affected by the slightly {sensor_data.get('N', 0) < 100 and 'low' or 'high'} nitrogen levels. Weather conditions are favorable for continued growth."
    
    fallback_crops = [
        {
            "label": "Cotton",
            "value": f"Good rotation crop after {current_crop}, well-suited for the soil conditions with current NPK values.",
            "when": "Plant in late April to early May when soil temperatures are consistently above 60°F."
        },
        {
            "label": "Rice",
            "value": f"Follows well after {current_crop} in rotation and can utilize the remaining nutrients effectively.",
            "when": "Plant in mid-April to early May when danger of frost has passed."
        },
        {
            "label": "Tomatoes",
            "value": f"Commercial crop that thrives in the Central Valley climate and makes good use of residual fertility after {current_crop}.",
            "when": "Transplant after last frost date, typically mid-March to early April in Merced."
        }
    ]
        
    return {
        'soil': {
            'npk': {
                'nitrogen': {'current': sensor_data.get('N', 0), 'optimum': 100},
                'phosphorus': {'current': sensor_data.get('P', 0), 'optimum': 45},
                'potassium': {'current': sensor_data.get('K', 0), 'optimum': 45}
            },
            'soilMoisture': sensor_data.get('humidity', 50)
        },
        'imageInsights': [
            {'label': 'Soil Quality', 'path': './results/analysis_results.png', 'value': 0.85},
            {'label': 'Nutrient Distribution', 'path': './results/analysis_results.png', 'value': 0.78}
        ],
        'predictedYield': insights.get('predicted_yield', 1000),
        'carbonFootprint': 'Medium',
        'suggestions': crop_specific_suggestions,
        'insights': crop_specific_insights,
        'recommendedCrops': fallback_crops,
        'currentCrop': current_crop,
        'createdAt': pd.Timestamp.now().isoformat(),
        'updatedAt': pd.Timestamp.now().isoformat()
    }

def save_farm_data(data, filename="./results/farm_data.json"):
    """Save farm data to a JSON file."""
    try:
        # Create a clean copy of the data
        farm_data = data.copy()
        
        # Explicitly remove weather field if it exists
        if 'weather' in farm_data:
            del farm_data['weather']
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        # Save to file
        with open(filename, 'w') as f:
            json.dump(farm_data, f, indent=2)
            
        print(f"Farm data saved to {filename}")
        return True
    
    except Exception as e:
        print(f"Error saving JSON: {e}")
        return False

def main():
    """Main function to demonstrate the Gemini AI integration."""
    # Example sensor data with added humidity
    
    # Current crop planted in the field
    current_crop = "Almonds"
    
    # Example location coordinates for Merced, California
    lat = 37.325954
    lon = -120.499992
    
    # Path to the soil analysis image
    image_path = "./results/analysis_results.png"
    
    print("Generating farming insights with Gemini AI...")
    
    # Generate insights with simple format, including current crop information
    farm_data = generate_gemini_insights(current_crop, lat, lon, image_path)
    
    # Make sure weather is removed
    if 'weather' in farm_data:
        print("Removing weather field from output")
        del farm_data['weather']
    
    # Save the data in the specified format
    save_farm_data(farm_data)
    
    # Print the data for reference
    print("\n=== FARM DATA (JSON Format) ===")
    print(json.dumps(farm_data, indent=2))
    
    return farm_data

if __name__ == "__main__":
    farm_data = main()