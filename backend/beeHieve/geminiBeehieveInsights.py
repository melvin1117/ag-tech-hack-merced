import os
import json
import requests
import pandas as pd
import time
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

# Get Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment variables")
else:
    print(f"Gemini API Key found: {GEMINI_API_KEY[:5]}...")

def generate_bee_insights(analysis_data, model_name="gemini-1.5-pro"):
    """Generate bee hive health insights using Gemini API."""
    print("\n=== STARTING GEMINI INSIGHTS GENERATION FOR BEE AUDIO ===")
    
    # Check API key availability
    if not GEMINI_API_KEY:
        print("ERROR: Cannot proceed with Gemini insights - API key not available")
        return generate_local_insights(analysis_data)
    
    # Create a structured prompt for Gemini
    bee_audio_prompt = f"""
You are a bee health expert analyzing audio recordings from beehives. 

I have results from a machine learning model that classified segments of a beehive audio recording into 'bee' sounds (normal beehive activity) and 'nobee' sounds (external noises or abnormal sounds).

Here is the analysis data:
- bee_percentage: {analysis_data['bee_percentage']:.2f}% of audio segments were classified as bee sounds
- avg_bee_probability: {analysis_data['avg_bee_probability']:.4f} (confidence score for bee classifications)
- avg_nobee_probability: {analysis_data['avg_nobee_probability']:.4f} (confidence score for nobee classifications)
- high_conf_bee: {analysis_data['high_conf_bee']} segments had high confidence bee classifications
- high_conf_nobee: {analysis_data['high_conf_nobee']} segments had high confidence nobee classifications
- max_sequence_length: {analysis_data['max_sequence_length']} (longest continuous sequence of same classification)
- max_sequence_label: {analysis_data['max_sequence_label']} (label of the longest sequence)
- total_segments: {analysis_data['total_segments']} (total number of audio segments analyzed)
- total_duration: {analysis_data['total_duration']:.2f} seconds (total duration of the audio recording)
- filename: {analysis_data['filename']} (name of the audio file)
- primary_classification: {analysis_data['primary_classification']} (overall classification of the audio)
- confidence: {analysis_data['confidence']:.4f} (overall confidence in the classification)

Based on this data, provide the following:

1. A structured JSON response that includes:
   - "hiveHealth": An assessment of the likely health of this beehive (Excellent, Good, Fair, Poor, or Concerning)
   - "activityLevel": An assessment of bee activity level (Very High, High, Moderate, Low, or Very Low)
   - "insights": Array of 3 specific insights about the hive based on the audio analysis
   - "recommendations": Array of 2-3 recommendations for the beekeeper

Your response must be solely the JSON object with no other text.
"""
    
    # Call the Gemini API
    url = f"https://generativelanguage.googleapis.com/v1/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
    headers = {
        "Content-Type": "application/json"
    }
    
    data = {
        "contents": [{
            "parts": [{
                "text": bee_audio_prompt
            }]
        }],
        "generationConfig": {
            "temperature": 0.2,
            "topP": 0.8,
            "topK": 40,
            "maxOutputTokens": 1024,
            "responseMimeType": "application/json"
        }
    }
    
    print("Calling Gemini API...")
    gemini_json_response = {}
    
    try:
        max_retries = 3
        retry_count = 0
        
        while retry_count < max_retries:
            try:
                response = requests.post(url, headers=headers, json=data)
                response.raise_for_status()
                
                response_json = response.json()
                
                # Extract text content from the Gemini response
                response_text = response_json["candidates"][0]["content"]["parts"][0]["text"]
                print(f"Received Gemini response (truncated): {response_text[:200]}...")
                
                try:
                    # Parse the JSON response
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
                        time.sleep(1)
                    else:
                        return generate_local_insights(analysis_data)
            
            except Exception as e:
                print(f"Error in Gemini API call: {e}")
                retry_count += 1
                if retry_count < max_retries:
                    print(f"Retrying Gemini API call ({retry_count}/{max_retries})...")
                    time.sleep(1)
                else:
                    return generate_local_insights(analysis_data)
    
    except Exception as e:
        print(f"ERROR calling Gemini API: {e}")
        return generate_local_insights(analysis_data)
    
    # Check if we have a valid response
    if not gemini_json_response or not isinstance(gemini_json_response, dict):
        print("WARNING: No valid JSON response received from Gemini API")
        return generate_local_insights(analysis_data)
    
    # Ensure all required fields are present
    required_fields = ['hiveHealth', 'activityLevel', 'insights', 'recommendations']
    for field in required_fields:
        if field not in gemini_json_response:
            if field == 'hiveHealth':
                gemini_json_response[field] = determine_hive_health(analysis_data)
            elif field == 'activityLevel':
                gemini_json_response[field] = determine_activity_level(analysis_data)
            elif field == 'insights':
                gemini_json_response[field] = generate_default_insights(analysis_data)
            elif field == 'recommendations':
                gemini_json_response[field] = generate_default_recommendations(analysis_data)
    
    # Add timestamp and original analysis data
    gemini_json_response['timestamp'] = pd.Timestamp.now().isoformat()
    gemini_json_response['analysisData'] = {
        'beePercentage': analysis_data['bee_percentage'],
        'avgBeeConfidence': analysis_data['avg_bee_probability'],
        'totalDuration': analysis_data['total_duration'],
        'totalSegments': analysis_data['total_segments'],
        'maxSequenceLength': analysis_data['max_sequence_length'],
        'maxSequenceLabel': analysis_data['max_sequence_label']
    }
    
    return gemini_json_response

def generate_local_insights(analysis_data):
    """Generate insights locally when Gemini API fails."""
    print("Generating insights locally...")
    
    hive_health = determine_hive_health(analysis_data)
    activity_level = determine_activity_level(analysis_data)
    insights = generate_default_insights(analysis_data)
    recommendations = generate_default_recommendations(analysis_data)
    
    return {
        'hiveHealth': hive_health,
        'activityLevel': activity_level,
        'insights': insights,
        'recommendations': recommendations,
        'timestamp': pd.Timestamp.now().isoformat(),
        'analysisData': {
            'beePercentage': analysis_data['bee_percentage'],
            'avgBeeConfidence': analysis_data['avg_bee_probability'],
            'totalDuration': analysis_data['total_duration'],
            'totalSegments': analysis_data['total_segments'],
            'maxSequenceLength': analysis_data['max_sequence_length'],
            'maxSequenceLabel': analysis_data['max_sequence_label']
        },
        'note': "Generated using local fallback due to Gemini API unavailability"
    }

def determine_hive_health(analysis_data):
    """Determine hive health based on analysis data."""
    bee_percentage = analysis_data['bee_percentage']
    confidence = analysis_data['confidence']
    
    if bee_percentage > 95 and confidence > 0.85:
        return "Excellent"
    elif bee_percentage > 85 and confidence > 0.75:
        return "Good"
    elif bee_percentage > 75 and confidence > 0.65:
        return "Fair"
    elif bee_percentage > 60 and confidence > 0.5:
        return "Poor"
    else:
        return "Concerning"

def determine_activity_level(analysis_data):
    """Determine bee activity level based on analysis data."""
    bee_percentage = analysis_data['bee_percentage']
    high_conf_bee = analysis_data['high_conf_bee']
    total_segments = analysis_data['total_segments']
    
    high_conf_percentage = (high_conf_bee / total_segments) * 100 if total_segments > 0 else 0
    
    if bee_percentage > 95 and high_conf_percentage > 70:
        return "Very High"
    elif bee_percentage > 85 and high_conf_percentage > 50:
        return "High"
    elif bee_percentage > 75 and high_conf_percentage > 30:
        return "Moderate"
    elif bee_percentage > 60 and high_conf_percentage > 20:
        return "Low"
    else:
        return "Very Low"

def generate_default_insights(analysis_data):
    """Generate default insights based on analysis data."""
    bee_percentage = analysis_data['bee_percentage']
    max_sequence_length = analysis_data['max_sequence_length']
    max_sequence_label = analysis_data['max_sequence_label']
    confidence = analysis_data['confidence']
    
    insights = []
    
    # Insight 1: Bee percentage
    if bee_percentage > 95:
        insights.append("The extremely high percentage of bee sounds ({}%) indicates a thriving, healthy colony with minimal external disturbances.".format(
            round(bee_percentage, 1)))
    elif bee_percentage > 85:
        insights.append("The high percentage of bee sounds ({}%) suggests a generally healthy colony with normal activity levels.".format(
            round(bee_percentage, 1)))
    elif bee_percentage > 75:
        insights.append("The moderate percentage of bee sounds ({}%) indicates a functioning colony, though there may be some environmental stressors present.".format(
            round(bee_percentage, 1)))
    else:
        insights.append("The lower percentage of bee sounds ({}%) could indicate either a less active colony or significant external disturbances that warrant investigation.".format(
            round(bee_percentage, 1)))
    
    # Insight 2: Sequence patterns
    if max_sequence_length > 50 and max_sequence_label == 'bee':
        insights.append("The long continuous sequence of bee sounds ({} segments) suggests consistent colony activity without interruptions, a sign of a well-established, undisturbed hive.".format(
            max_sequence_length))
    elif max_sequence_length > 20 and max_sequence_label == 'bee':
        insights.append("The presence of continuous bee sound sequences ({} segments) indicates stable colony activity with occasional variations.".format(
            max_sequence_length))
    elif max_sequence_label == 'nobee' and max_sequence_length > 5:
        insights.append("The presence of extended non-bee sound sequences ({} segments) suggests potential disturbances that may be affecting normal colony behavior.".format(
            max_sequence_length))
    
    # Insight 3: Confidence
    if confidence > 0.85:
        insights.append("The high confidence in sound classifications ({:.1f}%) suggests regular, rhythmic buzzing patterns typical of a healthy colony engaged in normal activities.".format(
            confidence * 100))
    elif confidence > 0.7:
        insights.append("The moderate confidence in sound classifications ({:.1f}%) indicates typical colony sounds, though there may be some variation in activity levels.".format(
            confidence * 100))
    else:
        insights.append("The lower confidence in classifications ({:.1f}%) suggests more ambiguous audio patterns that could indicate stress or unusual activity within the colony.".format(
            confidence * 100))
    
    return insights[:3]  # Limit to 3 insights

def generate_default_recommendations(analysis_data):
    """Generate default recommendations based on analysis data."""
    bee_percentage = analysis_data['bee_percentage']
    confidence = analysis_data['confidence']
    nobee_segments = analysis_data['nobee_segments']
    
    recommendations = []
    
    # Recommendation 1: Always perform visual inspection
    recommendations.append("Perform a visual inspection of the hive to confirm the audio analysis findings, checking for queen activity, brood patterns, and overall colony strength.")
    
    # Recommendation 2: Based on bee percentage
    if bee_percentage > 95:
        recommendations.append("Given the excellent audio profile, continue current management practices and consider expanding the colony or adding honey supers if in active season.")
    elif bee_percentage > 85:
        recommendations.append("Maintain regular monitoring schedule and ensure adequate resources (food, water) are available to support the healthy colony activity observed.")
    elif bee_percentage > 75:
        recommendations.append("Increase monitoring frequency to identify potential stressors, and verify adequate food stores and healthy brood patterns.")
    else:
        recommendations.append("Conduct a thorough hive inspection to identify potential issues such as disease, pests, or environmental stressors that may be affecting colony activity.")
    
    # Recommendation 3: Based on non-bee sounds
    if nobee_segments > 20:
        recommendations.append("Investigate the source of external sounds or disturbances; consider relocating the hive to a more sheltered location if environmental noise is impacting the colony.")
    elif confidence < 0.7:
        recommendations.append("Consider placing the audio recording device in a different position within the hive to improve monitoring accuracy and reduce ambiguous recordings.")
    else:
        recommendations.append("Document the current hive conditions for baseline comparison in future monitoring, noting the strong acoustic indicators of colony health.")
    
    return recommendations

def main():
    """Main function for demonstration."""
    # Sample analysis data - replace with your actual data
    analysis_data = {
        'filename': 'Hive3_20_07_2017_QueenBee_H3_audio___06_20_00.wav',
        'total_duration': 591.0,
        'total_segments': 197,
        'bee_segments': 191,
        'nobee_segments': 6,
        'bee_percentage': 96.95431472081218,
        'avg_bee_probability': 0.8885838801324055,
        'avg_nobee_probability': 0.7008906727035841,
        'high_conf_bee': 107,
        'high_conf_nobee': 1,
        'max_sequence_length': 105,
        'max_sequence_label': 'bee',
        'primary_classification': 'bee',
        'confidence': 0.8885838801324055,
        'processing_time': 18.965106964111328
    }
    
    # Generate insights
    insights = generate_bee_insights(analysis_data)
    
    # Print the insights
    print("\n=== BEE AUDIO ANALYSIS INSIGHTS ===")
    print(json.dumps(insights, indent=2))
    
    # Save insights to file
    os.makedirs("results", exist_ok=True)
    filename_base = os.path.splitext(analysis_data['filename'])[0]
    output_path = os.path.join("results", f"{filename_base}_gemini_insights.json")
    
    with open(output_path, 'w') as f:
        json.dump(insights, f, indent=2)
    
    print(f"Insights saved to {output_path}")
    
    return insights

if __name__ == "__main__":
    main()