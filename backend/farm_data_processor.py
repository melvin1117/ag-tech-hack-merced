import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, classification_report
from sklearn.impute import SimpleImputer
import joblib
import json
import requests
from datetime import datetime
import os
from dotenv import load_dotenv

class FarmDataProcessor:
    """
    A class to process farm sensor data, generate insights, and prepare data
    for the Gemini AI API.
    """
    
    def __init__(self):
        """Initialize the data processor with required components."""
        # NPK are the only sensor readings we get directly
        self.numerical_features = ['N', 'P', 'K', 'temperature', 'humidity', 'rainfall']
        self.categorical_features = ['soil_type']
        self.crop_yield_model = None
        self.crop_recommendation_model = None
        self.preprocessor = None
        
        # Load environment variables for API keys
        load_dotenv()
        self.accuweather_api_key = os.getenv("ACCUWEATHER_API_KEY")
        
        # Define optimal ranges for different nutrients
        self.soil_health_thresholds = {
            'N': {'low': 50, 'optimal': 100, 'high': 200},
            'P': {'low': 25, 'optimal': 50, 'high': 100},
            'K': {'low': 25, 'optimal': 50, 'high': 100}
        }
        
        # Derived metrics and their importance
        self.derived_metrics = {
            'NPK_balance': 'Overall nutrient balance',
            'moisture_index': 'Soil moisture considering rainfall and humidity',
            'growth_potential': 'Combined metric of favorable growing conditions'
        }
        
        # Reference ranges for N, P, K for different crops
        # These values are approximate and should be fine-tuned based on specific varieties and regions
        self.crop_nutrient_ranges = {
            'rice': {
                'N': {'min': 80, 'max': 120, 'ideal': 100},
                'P': {'min': 30, 'max': 60, 'ideal': 45},
                'K': {'min': 30, 'max': 60, 'ideal': 45}
            },
            'wheat': {
                'N': {'min': 70, 'max': 110, 'ideal': 90},
                'P': {'min': 30, 'max': 50, 'ideal': 40},
                'K': {'min': 25, 'max': 55, 'ideal': 40}
            },
            'maize': {
                'N': {'min': 80, 'max': 120, 'ideal': 100},
                'P': {'min': 30, 'max': 50, 'ideal': 40},
                'K': {'min': 30, 'max': 60, 'ideal': 45}
            },
            'chickpea': {
                'N': {'min': 40, 'max': 80, 'ideal': 60},
                'P': {'min': 30, 'max': 60, 'ideal': 45},
                'K': {'min': 20, 'max': 50, 'ideal': 35}
            },
            'cotton': {
                'N': {'min': 90, 'max': 150, 'ideal': 120},
                'P': {'min': 40, 'max': 70, 'ideal': 55},
                'K': {'min': 40, 'max': 80, 'ideal': 60}
            },
            'paddy': {
                'N': {'min': 80, 'max': 120, 'ideal': 100},
                'P': {'min': 30, 'max': 60, 'ideal': 45},
                'K': {'min': 30, 'max': 60, 'ideal': 45}
            },
            'barley': {
                'N': {'min': 60, 'max': 100, 'ideal': 80},
                'P': {'min': 25, 'max': 45, 'ideal': 35},
                'K': {'min': 25, 'max': 50, 'ideal': 35}
            },
            'millet': {
                'N': {'min': 50, 'max': 90, 'ideal': 70},
                'P': {'min': 20, 'max': 40, 'ideal': 30},
                'K': {'min': 20, 'max': 40, 'ideal': 30}
            },
            'lentil': {
                'N': {'min': 40, 'max': 80, 'ideal': 60},
                'P': {'min': 30, 'max': 50, 'ideal': 40},
                'K': {'min': 20, 'max': 40, 'ideal': 30}
            },
            'coffee': {
                'N': {'min': 90, 'max': 150, 'ideal': 120},
                'P': {'min': 30, 'max': 60, 'ideal': 45},
                'K': {'min': 40, 'max': 80, 'ideal': 60}
            },
            'sugarcane': {
                'N': {'min': 100, 'max': 160, 'ideal': 130},
                'P': {'min': 40, 'max': 80, 'ideal': 60},
                'K': {'min': 50, 'max': 100, 'ideal': 75}
            },
            'tomato': {
                'N': {'min': 60, 'max': 120, 'ideal': 90},
                'P': {'min': 40, 'max': 80, 'ideal': 60},
                'K': {'min': 50, 'max': 100, 'ideal': 75}
            },
            'potato': {
                'N': {'min': 80, 'max': 140, 'ideal': 110},
                'P': {'min': 50, 'max': 80, 'ideal': 65},
                'K': {'min': 60, 'max': 120, 'ideal': 90}
            }
        }
    
    def create_preprocessor(self):
        """Create a preprocessing pipeline for sensor data."""
        numerical_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ])
        
        categorical_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='most_frequent')),
            ('onehot', OneHotEncoder(handle_unknown='ignore'))
        ])
        
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numerical_transformer, self.numerical_features),
                ('cat', categorical_transformer, self.categorical_features)
            ])
        
        return self.preprocessor
    
    def fit_preprocessor(self, X):
        """Fit the preprocessor on training data."""
        if self.preprocessor is None:
            self.create_preprocessor()
        
        self.preprocessor.fit(X)
        return self
    
    def preprocess_data(self, X):
        """Apply preprocessing to input data."""
        if self.preprocessor is None:
            raise ValueError("Preprocessor not fitted. Call fit_preprocessor first.")
        
        return self.preprocessor.transform(X)
    
    def get_weather_data(self, location_key):
        """
        Get weather data from AccuWeather API for a specific location
        
        Args:
            location_key (str): AccuWeather location key
            
        Returns:
            dict: Weather data containing temperature, humidity, and rainfall
        """
        if not self.accuweather_api_key:
            raise ValueError("AccuWeather API key not found. Set ACCUWEATHER_API_KEY environment variable.")
        
        try:
            # Get current conditions
            current_url = f"http://dataservice.accuweather.com/currentconditions/v1/{location_key}?apikey={self.accuweather_api_key}&details=true"
            current_response = requests.get(current_url)
            current_data = current_response.json()[0]
            
            # Get 1-day forecast for rainfall
            forecast_url = f"http://dataservice.accuweather.com/forecasts/v1/daily/1day/{location_key}?apikey={self.accuweather_api_key}&details=true&metric=true"
            forecast_response = requests.get(forecast_url)
            forecast_data = forecast_response.json()
            
            # Extract relevant data
            temperature = current_data['Temperature']['Metric']['Value']
            relative_humidity = current_data['RelativeHumidity']
            
            # Get rainfall from forecast
            rainfall = forecast_data['DailyForecasts'][0]['Day']['RainValue']
            
            return {
                'temperature': temperature,
                'humidity': relative_humidity,
                'rainfall': rainfall
            }
            
        except Exception as e:
            # Log error and return default values if API call fails
            print(f"Error fetching weather data: {e}")
            return {
                'temperature': 25.0,  # Default value in Celsius
                'humidity': 70.0,     # Default value as percentage
                'rainfall': 5.0       # Default value in mm
            }
    
    def get_location_key(self, lat, lon):
        """
        Get AccuWeather location key from latitude and longitude
        
        Args:
            lat (float): Latitude
            lon (float): Longitude
            
        Returns:
            str: AccuWeather location key
        """
        if not self.accuweather_api_key:
            raise ValueError("AccuWeather API key not found. Set ACCUWEATHER_API_KEY environment variable.")
        
        try:
            geoposition_url = f"http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey={self.accuweather_api_key}&q={lat},{lon}"
            response = requests.get(geoposition_url)
            data = response.json()
            return data['Key']
        except Exception as e:
            # Log error and return a default location key (New York City)
            print(f"Error fetching location key: {e}")
            return "349727"  # Default location key
            
    def enrich_with_weather_data(self, data, lat=None, lon=None):
        """
        Enrich sensor data with weather data from AccuWeather
        
        Args:
            data (dict or pd.DataFrame): Sensor data
            lat (float, optional): Latitude
            lon (float, optional): Longitude
            
        Returns:
            dict or pd.DataFrame: Enriched data
        """
        # Convert dict to DataFrame if needed
        if isinstance(data, dict):
            data_df = pd.DataFrame([data])
        else:
            data_df = data.copy()
        
        # Get weather data
        if lat is not None and lon is not None:
            location_key = self.get_location_key(lat, lon)
            weather_data = self.get_weather_data(location_key)
            
            # Update dataframe with weather data
            data_df['temperature'] = weather_data['temperature']
            data_df['humidity'] = weather_data['humidity']
            data_df['rainfall'] = weather_data['rainfall']
        
        # Return in original format
        if isinstance(data, dict):
            return data_df.iloc[0].to_dict()
        else:
            return data_df
            
    def engineer_features(self, df):
        """Create derived features from sensor data."""
        # Copy to avoid modifying the original dataframe
        df_derived = df.copy()
        
        # NPK Balance (ratio of N to P and K)
        df_derived['NPK_balance'] = df['N'] / (df['P'] + df['K'] + 1)  # Add 1 to avoid division by zero
        
        # Moisture index
        df_derived['moisture_index'] = (df['rainfall'] * 0.7 + df['humidity'] * 0.3) / 100
        
        # Growth potential (combined favorable conditions) - without pH
        df_derived['growth_potential'] = (
            (df['N'] / self.soil_health_thresholds['N']['optimal']) * 0.33 +
            (df['P'] / self.soil_health_thresholds['P']['optimal']) * 0.33 +
            (df['K'] / self.soil_health_thresholds['K']['optimal']) * 0.34
        ).clip(0, 1)  # Clip to range [0,1]
        
        return df_derived
    
    def train_crop_yield_model(self, X, y):
        """Train a regression model to predict crop yield based on sensor data."""
        X_derived = self.engineer_features(X)
        X_preprocessed = self.preprocess_data(X_derived)
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X_preprocessed, y, test_size=0.2, random_state=42)
        
        # Train a Random Forest regression model
        self.crop_yield_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.crop_yield_model.fit(X_train, y_train)
        
        # Evaluate the model
        y_pred = self.crop_yield_model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        
        print(f"Crop Yield Model - RMSE: {rmse:.2f}")
        
        return self
    
    def train_crop_recommendation_model(self, X, y):
        """Train a classification model to recommend crops based on sensor data."""
        X_derived = self.engineer_features(X)
        X_preprocessed = self.preprocess_data(X_derived)
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X_preprocessed, y, test_size=0.2, random_state=42)
        
        # Train a Random Forest classification model
        self.crop_recommendation_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.crop_recommendation_model.fit(X_train, y_train)
        
        # Evaluate the model
        y_pred = self.crop_recommendation_model.predict(X_test)
        
        print("Crop Recommendation Model - Classification Report:")
        print(classification_report(y_test, y_pred))
        
        return self
    
    def analyze_soil_health(self, sensor_data):
        """Analyze soil health based on sensor data."""
        # Convert single row to dataframe if needed
        if not isinstance(sensor_data, pd.DataFrame):
            sensor_data = pd.DataFrame([sensor_data])
        
        soil_health = {}
        
        # Analyze NPK levels
        for nutrient in ['N', 'P', 'K']:
            value = sensor_data[nutrient].values[0]
            thresholds = self.soil_health_thresholds[nutrient]
            
            if value < thresholds['low']:
                status = 'Deficient'
                action = f'Increase {nutrient} fertilization'
            elif value < thresholds['optimal']:
                status = 'Below optimal'
                action = f'Moderate {nutrient} fertilization needed'
            elif value < thresholds['high']:
                status = 'Optimal'
                action = 'Maintain current fertilization'
            else:
                status = 'Excessive'
                action = f'Reduce {nutrient} fertilization'
            
            soil_health[nutrient] = {
                'value': float(value),
                'status': status,
                'action': action
            }
        
        # Derive additional metrics
        engineered_data = self.engineer_features(sensor_data)
        
        soil_health['derived_metrics'] = {
            'NPK_balance': {
                'value': float(engineered_data['NPK_balance'].values[0]),
                'interpretation': 'Ratio of nitrogen to phosphorus and potassium',
                'status': 'Balanced' if 0.8 <= engineered_data['NPK_balance'].values[0] <= 1.2 else 'Imbalanced'
            },
            'moisture_index': {
                'value': float(engineered_data['moisture_index'].values[0]),
                'interpretation': 'Combined measure of soil moisture from rainfall and humidity',
                'status': self._interpret_moisture_index(engineered_data['moisture_index'].values[0])
            },
            'growth_potential': {
                'value': float(engineered_data['growth_potential'].values[0]),
                'interpretation': 'Overall growing condition score (0-1)',
                'status': self._interpret_growth_potential(engineered_data['growth_potential'].values[0])
            }
        }
        
        return soil_health
    
    def _interpret_moisture_index(self, value):
        """Interpret the moisture index value."""
        if value < 0.3:
            return "Dry - Irrigation needed"
        elif value < 0.6:
            return "Moderate - Monitor moisture"
        elif value < 0.8:
            return "Good - Optimal moisture"
        else:
            return "Wet - Potential drainage issues"
    
    def _interpret_growth_potential(self, value):
        """Interpret the growth potential score."""
        if value < 0.3:
            return "Poor - Major improvements needed"
        elif value < 0.6:
            return "Fair - Some improvements needed"
        elif value < 0.8:
            return "Good - Minor adjustments may help"
        else:
            return "Excellent - Optimal growing conditions"
    
    def predict_crop_yield(self, sensor_data):
        """Predict crop yield based on sensor data."""
        if self.crop_yield_model is None:
            raise ValueError("Crop yield model not trained. Call train_crop_yield_model first.")
        
        # Convert to dataframe if needed
        if not isinstance(sensor_data, pd.DataFrame):
            sensor_data = pd.DataFrame([sensor_data])
        
        # Engineer features
        X_derived = self.engineer_features(sensor_data)
        
        # Preprocess
        X_preprocessed = self.preprocess_data(X_derived)
        
        # Predict
        yield_prediction = self.crop_yield_model.predict(X_preprocessed)
        
        return float(yield_prediction[0])
    
    def recommend_crops(self, sensor_data):
        """Recommend suitable crops based on sensor data."""
        if self.crop_recommendation_model is None:
            raise ValueError("Crop recommendation model not trained. Call train_crop_recommendation_model first.")
        
        # Convert to dataframe if needed
        if not isinstance(sensor_data, pd.DataFrame):
            sensor_data = pd.DataFrame([sensor_data])
        
        # Engineer features
        X_derived = self.engineer_features(sensor_data)
        
        # Preprocess
        X_preprocessed = self.preprocess_data(X_derived)
        
        # Get probability scores for each crop
        crop_probabilities = self.crop_recommendation_model.predict_proba(X_preprocessed)[0]
        
        # Get crop names and sort by probability
        crop_names = self.crop_recommendation_model.classes_
        crop_scores = [(crop, float(prob)) for crop, prob in zip(crop_names, crop_probabilities)]
        crop_scores.sort(key=lambda x: x[1], reverse=True)
        
        # Return top recommended crops
        return [
            {"crop": crop, "suitability_score": score}
            for crop, score in crop_scores[:5]  # Top 5 recommendations
        ]
    
    def generate_insights(self, sensor_data, lat=None, lon=None):
        """
        Generate insights from sensor data to be sent to Gemini AI.
        
        Args:
            sensor_data (dict or pd.DataFrame): NPK sensor data
            lat (float, optional): Latitude for weather data
            lon (float, optional): Longitude for weather data
            
        Returns:
            dict: Generated insights
        """
        # Enrich with weather data if coordinates provided
        if lat is not None and lon is not None:
            sensor_data = self.enrich_with_weather_data(sensor_data, lat, lon)
        
        # Convert to dataframe if needed
        if not isinstance(sensor_data, pd.DataFrame):
            sensor_data = pd.DataFrame([sensor_data])
        
        # Add default weather data if not already present
        if 'temperature' not in sensor_data.columns:
            sensor_data['temperature'] = 25.0  # Default temperature in Celsius
        
        if 'humidity' not in sensor_data.columns:
            sensor_data['humidity'] = 70.0  # Default humidity percentage
        
        if 'rainfall' not in sensor_data.columns:
            sensor_data['rainfall'] = 5.0  # Default rainfall in mm
        
        # Continue with the rest of the method...
        insights = {}
        
        # Basic sensor data
        insights['raw_sensor_data'] = {
            'N': float(sensor_data['N'].values[0]),
            'P': float(sensor_data['P'].values[0]),
            'K': float(sensor_data['K'].values[0]),
            'temperature': float(sensor_data['temperature'].values[0]),
            'humidity': float(sensor_data['humidity'].values[0]),
            'rainfall': float(sensor_data['rainfall'].values[0]),
            'soil_type': sensor_data['soil_type'].values[0]
        }
            
        # Soil health analysis
        insights['soil_health'] = self.analyze_soil_health(sensor_data)
        
        # Crop recommendations (if model is trained)
        if self.crop_recommendation_model is not None:
            insights['crop_recommendations'] = self.recommend_crops(sensor_data)
        
        # Yield prediction (if model is trained)
        if self.crop_yield_model is not None:
            insights['predicted_yield'] = self.predict_crop_yield(sensor_data)
        
        # Format data for Gemini AI API
        gemini_prompt = self._format_for_gemini(insights)
        insights['gemini_prompt'] = gemini_prompt
        
        return insights
    
    def get_nutrient_ranges_for_crop(self, crop_name):
        """
        Get the ideal NPK ranges for a specific crop.
        
        Args:
            crop_name (str): Name of the crop
            
        Returns:
            dict: Dictionary containing NPK ranges for the crop
        """
        crop_name = crop_name.lower()
        if crop_name in self.crop_nutrient_ranges:
            return self.crop_nutrient_ranges[crop_name]
        else:
            # Return a generic range if crop is not in our database
            return {
                'N': {'min': 70, 'max': 120, 'ideal': 90},
                'P': {'min': 30, 'max': 60, 'ideal': 45},
                'K': {'min': 30, 'max': 60, 'ideal': 45}
            }
    
    def _format_for_gemini(self, insights):
        """Format insights as JSON for the Gemini AI API."""
        # Add raw sensor data
        raw_data = insights['raw_sensor_data']
        
        # Add soil health analysis
        soil_health = insights['soil_health']
        
        # Build the query for Gemini API
        gemini_query = {
            "sensor_data": raw_data,
            "soil_health": {
                "nutrients": {
                    "N": soil_health['N'],
                    "P": soil_health['P'],
                    "K": soil_health['K']
                },
                "derived_metrics": soil_health['derived_metrics']
            }
        }
        
        # Add crop recommendations if available
        if 'crop_recommendations' in insights:
            crop_recs = []
            for rec in insights['crop_recommendations']:
                crop_name = rec['crop']
                nutrient_ranges = self.get_nutrient_ranges_for_crop(crop_name)
                
                # Prepare comparison data for frontend visualization
                comparison_data = {}
                for nutrient in ['N', 'P', 'K']:
                    actual_value = raw_data[nutrient]
                    ideal_value = nutrient_ranges[nutrient]['ideal']
                    min_value = nutrient_ranges[nutrient]['min']
                    max_value = nutrient_ranges[nutrient]['max']
                    
                    # Calculate deficit or excess
                    if actual_value < min_value:
                        status = "deficit"
                        difference = min_value - actual_value
                    elif actual_value > max_value:
                        status = "excess"
                        difference = actual_value - max_value
                    else:
                        status = "optimal"
                        difference = 0
                    
                    comparison_data[nutrient] = {
                        "actual": actual_value,
                        "ideal": ideal_value,
                        "min": min_value,
                        "max": max_value,
                        "status": status,
                        "difference": difference
                    }
                
                crop_recs.append({
                    "crop": crop_name,
                    "suitability_score": rec['suitability_score'],
                    "nutrient_comparison": comparison_data
                })
            
            gemini_query["crop_recommendations"] = crop_recs
        
        # Add yield prediction if available
        if 'predicted_yield' in insights:
            gemini_query["predicted_yield"] = insights['predicted_yield']
        
        # Add instructions for Gemini
        gemini_query["instructions"] = {
            "required_outputs": [
                "soil_management_recommendations",
                "fertilizer_suggestions",
                "crop_rotation_advice",
                "irrigation_recommendations",
                "potential_issues",
                "sustainable_practices"
            ],
            "output_format": "JSON"
        }
        
        return json.dumps(gemini_query, indent=2)
    
    def save_models(self, filepath_prefix):
        """Save trained models and preprocessor to disk."""
        if self.preprocessor is not None:
            joblib.dump(self.preprocessor, f"{filepath_prefix}_preprocessor.pkl")
        
        if self.crop_yield_model is not None:
            joblib.dump(self.crop_yield_model, f"{filepath_prefix}_yield_model.pkl")
        
        if self.crop_recommendation_model is not None:
            joblib.dump(self.crop_recommendation_model, f"{filepath_prefix}_recommendation_model.pkl")
    
    def load_models(self, filepath_prefix):
        """Load trained models and preprocessor from disk."""
        try:
            self.preprocessor = joblib.load(f"{filepath_prefix}_preprocessor.pkl")
            self.crop_yield_model = joblib.load(f"{filepath_prefix}_yield_model.pkl")
            self.crop_recommendation_model = joblib.load(f"{filepath_prefix}_recommendation_model.pkl")
            return True
        except (FileNotFoundError, IOError) as e:
            print(f"Error loading models: {e}")
            return False


# Usage example
def load_example_data():
    """Load example data for demonstration."""
    # This is a small example dataset with fabricated values
    # In a real application, you would load actual sensor data from your database
    data = {
        'N': [90, 85, 60, 120, 155, 40, 100, 80, 140, 75],
        'P': [42, 58, 30, 75, 80, 25, 45, 35, 60, 50],
        'K': [43, 41, 38, 55, 75, 30, 50, 40, 65, 45],
        'pH': [6.5, 7.1, 5.9, 6.2, 7.5, 5.5, 6.8, 6.0, 7.2, 6.4],
        'temperature': [20.5, 24.8, 22.3, 19.5, 26.2, 18.7, 23.5, 21.0, 25.5, 22.8],
        'humidity': [82, 65, 75, 60, 58, 85, 70, 80, 55, 72],
        'rainfall': [202, 180, 155, 110, 90, 210, 140, 170, 95, 150],
        'soil_type': ['Clay', 'Loamy', 'Sandy', 'Loamy', 'Clay', 'Sandy', 'Clay Loam', 'Sandy Loam', 'Loamy', 'Sandy Loam'],
        'crop': ['rice', 'wheat', 'maize', 'chickpea', 'cotton', 'paddy', 'barley', 'millet', 'lentil', 'coffee'],
        'yield': [45.2, 38.7, 35.0, 28.5, 40.3, 30.1, 32.8, 25.4, 27.9, 33.6]
    }
    
    return pd.DataFrame(data)


def main():
    """Main function to demonstrate the FarmDataProcessor."""
    # Load example data
    df = load_example_data()
    
    # Create and fit the processor
    processor = FarmDataProcessor()
    processor.create_preprocessor()
    processor.fit_preprocessor(df)
    
    # Train models
    processor.train_crop_yield_model(df, df['yield'])
    processor.train_crop_recommendation_model(df, df['crop'])
    
    # Generate insights for a sample data point
    sample_data = df.iloc[0].to_dict()
    
    # Remove pH since we're not using it anymore
    if 'pH' in sample_data:
        del sample_data['pH']
    
    # Example coordinates for weather data (these are for New York City)
    lat = 40.7128
    lon = -74.0060
    
    # Generate insights
    insights = processor.generate_insights(sample_data, lat, lon)
    
    # Print the Gemini query JSON
    print("\nJSON Query for Gemini AI API:")
    print(insights['gemini_prompt'])
    
    # Save the models
    processor.save_models("models/farm_data")
    
    return processor, insights


if __name__ == "__main__":
    processor, insights = main()