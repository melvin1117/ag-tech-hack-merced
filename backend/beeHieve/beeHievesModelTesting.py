import os
import numpy as np
import pandas as pd
import librosa
import librosa.display
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
from tensorflow.keras.models import load_model
import joblib
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import time
import warnings
warnings.filterwarnings('ignore')

print("Starting bee sound model testing...")

# Configuration
AUDIO_FOLDER = 'audioData'  # Folder containing audio files to test
MODEL_PATH = 'deep_bee_classifier.h5'  # Path to your trained DNN model
SCALER_PATH = 'feature_scaler.pkl'  # Path to your feature scaler
RESULTS_FOLDER = 'test_results'  # Folder to save results
SEGMENT_LENGTH = 3  # Length of each segment in seconds

# Create results folder
os.makedirs(RESULTS_FOLDER, exist_ok=True)

# First, let's examine the feature scaler to determine the expected number of features
def get_expected_features():
    """Get the expected number of features from the scaler"""
    if os.path.exists(SCALER_PATH):
        try:
            scaler = joblib.load(SCALER_PATH)
            # Get the expected feature count from the scaler's mean_ attribute
            n_features = scaler.mean_.shape[0]
            print(f"Model expects {n_features} features")
            return n_features
        except Exception as e:
            print(f"Error examining scaler: {e}")
            return None
    else:
        print(f"Scaler not found at {SCALER_PATH}")
        return None

# Function to extract features consistently with training
def extract_audio_features(audio, sr):
    """Extract audio features to match the trained model expectations"""
    try:
        expected_features = get_expected_features()
        
        # 1. Spectral Centroid
        spectral_centroids = librosa.feature.spectral_centroid(y=audio, sr=sr)[0]
        
        # 2. Spectral Rolloff
        spectral_rolloff = librosa.feature.spectral_rolloff(y=audio, sr=sr)[0]
        
        # 3. MFCCs
        mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
        
        # 4. Zero Crossing Rate
        zero_crossing_rate = librosa.feature.zero_crossing_rate(audio)[0]
        
        # 5. Spectral Contrast
        spectral_contrast = librosa.feature.spectral_contrast(y=audio, sr=sr)
        
        # 6. Chroma Features
        chroma = librosa.feature.chroma_stft(y=audio, sr=sr)
        
        # Compute summary statistics
        feature_vector = []
        
        # Add statistical features for each acoustic feature
        for feature, name in [
            (spectral_centroids, "spectral_centroid"),
            (spectral_rolloff, "spectral_rolloff"),
            (zero_crossing_rate, "zcr")
        ]:
            feature_vector.extend([
                np.mean(feature),
                np.std(feature),
                np.min(feature),
                np.max(feature)
            ])
        
        # Add MFCC features
        for i, mfcc in enumerate(mfccs):
            feature_vector.extend([
                np.mean(mfcc),
                np.std(mfcc)
            ])
        
        # Add spectral contrast
        for i, contrast in enumerate(spectral_contrast):
            feature_vector.extend([
                np.mean(contrast),
                np.std(contrast)
            ])
        
        # Add chroma features
        for i, chroma_band in enumerate(chroma):
            feature_vector.extend([
                np.mean(chroma_band),
                np.std(chroma_band)
            ])
        
        print(f"Extracted {len(feature_vector)} features")
        
        # Handle feature count mismatch
        if expected_features is not None and len(feature_vector) != expected_features:
            print(f"Feature count mismatch: extracted {len(feature_vector)}, expected {expected_features}")
            
            if len(feature_vector) < expected_features:
                # Pad with zeros if we have too few features
                padding = expected_features - len(feature_vector)
                print(f"Padding with {padding} zeros")
                feature_vector.extend([0] * padding)
            else:
                # Truncate if we have too many features
                print(f"Truncating {len(feature_vector) - expected_features} features")
                feature_vector = feature_vector[:expected_features]
        
        return feature_vector
        
    except Exception as e:
        print(f"Error extracting features: {e}")
        return None

# Function to segment audio and get predictions
def segment_and_predict(audio_path, model, scaler):
    """Segment audio and predict on each segment"""
    print(f"Processing {audio_path}...")
    
    try:
        # Load audio
        y, sr = librosa.load(audio_path, sr=None)
        duration = len(y) / sr
        print(f"Audio duration: {duration:.2f} seconds, Sample rate: {sr} Hz")
        
        # Create segments
        segments = []
        segment_results = []
        
        # Calculate number of samples per segment
        samples_per_segment = int(SEGMENT_LENGTH * sr)
        
        # Calculate number of segments
        num_segments = int(np.ceil(len(y) / samples_per_segment))
        print(f"Dividing into {num_segments} segments of {SEGMENT_LENGTH} seconds each")
        
        # Process each segment
        for i in range(num_segments):
            start_sample = i * samples_per_segment
            end_sample = min((i + 1) * samples_per_segment, len(y))
            
            if end_sample - start_sample < 0.5 * samples_per_segment:  # Skip very short segments
                continue
                
            segment = y[start_sample:end_sample]
            start_time = start_sample / sr
            end_time = end_sample / sr
            
            try:
                # Extract features
                feature_vector = extract_audio_features(segment, sr)
                
                if feature_vector is None:
                    print(f"Skipping segment {i+1} due to feature extraction error")
                    continue
                
                # Scale features
                scaled_features = scaler.transform(np.array(feature_vector).reshape(1, -1))
                
                # Make prediction
                prediction = model.predict(scaled_features, verbose=0)
                
                # Process prediction based on its shape
                if isinstance(prediction, list):
                    prediction = prediction[0]
                
                if len(prediction.shape) > 1 and prediction.shape[1] > 1:
                    # Multi-class output
                    class_idx = np.argmax(prediction[0])
                    probability = prediction[0][class_idx]
                    label = 'bee' if class_idx == 1 else 'nobee'
                else:
                    # Binary output
                    probability = prediction[0][0]
                    label = 'bee' if probability > 0.5 else 'nobee'
                    probability = probability if label == 'bee' else 1 - probability
                
                # Store results
                segment_results.append({
                    'segment': i + 1,
                    'start_time': start_time,
                    'end_time': end_time,
                    'duration': end_time - start_time,
                    'prediction': label,
                    'probability': float(probability)
                })
                
                if (i+1) % 10 == 0:
                    print(f"Processed {i+1}/{num_segments} segments")
                
            except Exception as e:
                print(f"Error processing segment {i+1}: {e}")
        
        print(f"Successfully processed {len(segment_results)}/{num_segments} segments")
        return segment_results, y, sr
        
    except Exception as e:
        print(f"Error processing audio file: {e}")
        return None, None, None

# Function to analyze results
def analyze_results(results, audio_path, y, sr):
    """Analyze prediction results and generate insights"""
    print(f"Analyzing results for {audio_path}...")
    
    # Basic statistics
    total_segments = len(results)
    bee_segments = sum(1 for r in results if r['prediction'] == 'bee')
    nobee_segments = total_segments - bee_segments
    
    bee_percentage = (bee_segments / total_segments) * 100 if total_segments > 0 else 0
    
    # Calculate average probability
    avg_bee_prob = np.mean([r['probability'] for r in results if r['prediction'] == 'bee']) if bee_segments > 0 else 0
    avg_nobee_prob = np.mean([r['probability'] for r in results if r['prediction'] == 'nobee']) if nobee_segments > 0 else 0
    
    # Identify high confidence segments
    high_conf_threshold = 0.9
    high_conf_bee = sum(1 for r in results if r['prediction'] == 'bee' and r['probability'] >= high_conf_threshold)
    high_conf_nobee = sum(1 for r in results if r['prediction'] == 'nobee' and r['probability'] >= high_conf_threshold)
    
    # Identify sequences of consistent predictions
    current_label = None
    current_sequence = 0
    max_sequence = 0
    max_sequence_label = None
    sequences = []
    
    for r in results:
        if current_label is None:
            current_label = r['prediction']
            current_sequence = 1
        elif r['prediction'] == current_label:
            current_sequence += 1
        else:
            sequences.append({
                'label': current_label,
                'length': current_sequence,
                'start': r['start_time'] - (current_sequence * (r['duration'])),
                'end': r['start_time']
            })
            
            if current_sequence > max_sequence:
                max_sequence = current_sequence
                max_sequence_label = current_label
                
            current_label = r['prediction']
            current_sequence = 1
    
    # Add the last sequence
    if current_label is not None:
        sequences.append({
            'label': current_label,
            'length': current_sequence,
            'start': results[-1]['end_time'] - (current_sequence * results[-1]['duration']),
            'end': results[-1]['end_time']
        })
        
        if current_sequence > max_sequence:
            max_sequence = current_sequence
            max_sequence_label = current_label
    
    # Create summary
    summary = {
        'filename': os.path.basename(audio_path),
        'total_duration': results[-1]['end_time'] if results else 0,
        'total_segments': total_segments,
        'bee_segments': bee_segments,
        'nobee_segments': nobee_segments,
        'bee_percentage': bee_percentage,
        'avg_bee_probability': avg_bee_prob,
        'avg_nobee_probability': avg_nobee_prob,
        'high_conf_bee': high_conf_bee,
        'high_conf_nobee': high_conf_nobee,
        'max_sequence_length': max_sequence,
        'max_sequence_label': max_sequence_label,
        'primary_classification': 'bee' if bee_percentage > 50 else 'nobee',
        'confidence': max(avg_bee_prob if bee_percentage > 50 else avg_nobee_prob, 0)
    }
    
    # Generate visualizations
    filename_base = os.path.splitext(os.path.basename(audio_path))[0]
    
    # Create waveform plot with predictions
    plt.figure(figsize=(15, 10))
    
    # Plot 1: Waveform
    plt.subplot(3, 1, 1)
    librosa.display.waveshow(y, sr=sr)
    plt.title(f"Waveform - {filename_base}")
    plt.xlabel("Time (s)")
    plt.ylabel("Amplitude")
    
    # Plot 2: Prediction timeline
    plt.subplot(3, 1, 2)
    for r in results:
        color = 'green' if r['prediction'] == 'bee' else 'red'
        alpha = min(1.0, r['probability'])
        plt.axvspan(r['start_time'], r['end_time'], alpha=alpha, color=color)
    
    plt.yticks([])
    plt.xlim(0, results[-1]['end_time'] if results else 0)
    plt.title("Predictions Timeline (Green = Bee, Red = NoBee)")
    plt.xlabel("Time (s)")
    
    # Plot 3: Probabilities
    plt.subplot(3, 1, 3)
    times = [(r['start_time'] + r['end_time']) / 2 for r in results]
    probs = [r['probability'] if r['prediction'] == 'bee' else 1 - r['probability'] for r in results]
    colors = ['green' if r['prediction'] == 'bee' else 'red' for r in results]
    
    plt.scatter(times, probs, c=colors, alpha=0.7)
    plt.plot(times, probs, 'b-', alpha=0.3)
    plt.ylim(0, 1)
    plt.xlim(0, results[-1]['end_time'] if results else 0)
    plt.title("Prediction Probabilities (1.0 = High Confidence)")
    plt.xlabel("Time (s)")
    plt.ylabel("Bee Probability")
    
    plt.tight_layout()
    plt.savefig(os.path.join(RESULTS_FOLDER, f"{filename_base}_analysis.png"))
    
    # Create a spectrogram with predictions
    plt.figure(figsize=(15, 8))
    
    # Plot spectrogram
    D = librosa.amplitude_to_db(np.abs(librosa.stft(y)), ref=np.max)
    plt.subplot(2, 1, 1)
    librosa.display.specshow(D, sr=sr, x_axis='time', y_axis='log')
    plt.colorbar(format='%+2.0f dB')
    plt.title(f"Spectrogram - {filename_base}")
    
    # Plot predictions below
    plt.subplot(2, 1, 2)
    for r in results:
        color = 'green' if r['prediction'] == 'bee' else 'red'
        alpha = min(1.0, r['probability'])
        plt.axvspan(r['start_time'], r['end_time'], alpha=alpha, color=color)
    
    plt.yticks([])
    plt.xlim(0, results[-1]['end_time'] if results else 0)
    plt.title("Predictions (Green = Bee, Red = NoBee)")
    plt.xlabel("Time (s)")
    
    plt.tight_layout()
    plt.savefig(os.path.join(RESULTS_FOLDER, f"{filename_base}_spectrogram.png"))
    
    # Save segment results to CSV
    results_df = pd.DataFrame(results)
    results_df.to_csv(os.path.join(RESULTS_FOLDER, f"{filename_base}_segments.csv"), index=False)
    
    return summary, sequences

# Function to generate textual insights
def generate_insights(summary, sequences):
    """Generate textual insights from analysis"""
    insights = []
    
    # Basic classification
    primary_class = summary['primary_classification']
    confidence = summary['confidence']
    confidence_level = "high" if confidence > 0.8 else "moderate" if confidence > 0.6 else "low"
    
    insights.append(f"Primary Classification: This audio is classified as '{primary_class}' with {confidence_level} confidence ({confidence:.1%}).")
    
    # Segment breakdown
    bee_percent = summary['bee_percentage']
    insights.append(f"Segment Analysis: {bee_percent:.1f}% of audio segments contain bee sounds ({summary['bee_segments']} out of {summary['total_segments']} segments).")
    
    # Consistency
    if summary['max_sequence_length'] > 3:
        insights.append(f"Consistency: Found a consistent sequence of {summary['max_sequence_length']} consecutive segments classified as '{summary['max_sequence_label']}'.")
    
    # Pattern analysis
    long_sequences = [s for s in sequences if s['length'] >= 3]
    if long_sequences:
        pattern_insight = "Pattern Analysis: "
        if len(long_sequences) == 1:
            pattern_insight += f"Detected one consistent pattern of '{long_sequences[0]['label']}' sounds."
        else:
            transitions = sum(1 for i in range(len(long_sequences) - 1) 
                            if long_sequences[i]['label'] != long_sequences[i+1]['label'])
            if transitions > 0:
                pattern_insight += f"Detected {len(long_sequences)} distinct sound patterns with {transitions} transitions between bee and non-bee sounds."
            else:
                pattern_insight += f"Detected {len(long_sequences)} distinct patterns of the same sound type."
        
        insights.append(pattern_insight)
    
    # Confidence analysis
    high_conf_total = summary['high_conf_bee'] + summary['high_conf_nobee']
    high_conf_percent = (high_conf_total / summary['total_segments']) * 100 if summary['total_segments'] > 0 else 0
    
    if high_conf_percent > 70:
        insights.append(f"Confidence: High confidence predictions in {high_conf_percent:.1f}% of segments, suggesting reliable classification.")
    elif high_conf_percent < 30:
        insights.append(f"Confidence: Only {high_conf_percent:.1f}% of segments have high confidence predictions, suggesting some ambiguity in the audio classification.")
    
    # Final summary
    if primary_class == 'bee' and confidence > 0.7:
        insights.append("Summary: This recording shows strong evidence of healthy bee activity.")
    elif primary_class == 'bee' and confidence > 0.5:
        insights.append("Summary: This recording shows some evidence of bee activity, but with some ambiguity.")
    elif primary_class == 'nobee' and confidence > 0.7:
        insights.append("Summary: This recording shows strong evidence of external sounds not related to bee activity.")
    else:
        insights.append("Summary: This recording has mixed signals and requires further investigation.")
    
    return insights

# Main execution
def main():
    """Main function to test the model"""
    print(f"Looking for audio files in {AUDIO_FOLDER}...")
    
    # Find audio files
    audio_files = []
    for file in os.listdir(AUDIO_FOLDER):
        if file.endswith(('.wav', '.mp3', '.WAV', '.MP3')):
            audio_files.append(os.path.join(AUDIO_FOLDER, file))
    
    print(f"Found {len(audio_files)} audio files")
    
    if not audio_files:
        print("No audio files found. Exiting.")
        return
    
    # Load models
    print(f"Loading models...")
    
    try:
        # Load DNN model
        if not os.path.exists(MODEL_PATH):
            print(f"Model not found at {MODEL_PATH}. Exiting.")
            return
            
        model = load_model(MODEL_PATH)
        print(f"Loaded model from {MODEL_PATH}")
        
        # Load scaler
        if not os.path.exists(SCALER_PATH):
            print(f"Scaler not found at {SCALER_PATH}. Exiting.")
            return
            
        scaler = joblib.load(SCALER_PATH)
        print(f"Loaded feature scaler from {SCALER_PATH}")
    
    except Exception as e:
        print(f"Error loading models: {e}")
        return
    
    # Process each audio file
    all_summaries = []
    
    for audio_path in audio_files:
        print(f"\nProcessing {audio_path}...")
        
        # Process audio
        start_time = time.time()
        results, audio, sr = segment_and_predict(audio_path, model, scaler)
        processing_time = time.time() - start_time
        
        if not results or len(results) == 0:
            print(f"No results for {audio_path}. Skipping analysis.")
            continue
        
        # Analyze results
        summary, sequences = analyze_results(results, audio_path, audio, sr)
        summary['processing_time'] = processing_time
        
        # Generate insights
        insights = generate_insights(summary, sequences)
        
        # Print insights
        print(f"\nInsights for {os.path.basename(audio_path)}:")
        for insight in insights:
            print(f"- {insight}")
        
        # Save insights to text file
        filename_base = os.path.splitext(os.path.basename(audio_path))[0]
        with open(os.path.join(RESULTS_FOLDER, f"{filename_base}_insights.txt"), 'w') as f:
            for insight in insights:
                f.write(f"{insight}\n")
        
        all_summaries.append(summary)
    
    # Create summary report for all files
    if all_summaries:
        summary_df = pd.DataFrame(all_summaries)
        summary_df.to_csv(os.path.join(RESULTS_FOLDER, "all_files_summary.csv"), index=False)
        
        # Create summary visualization
        plt.figure(figsize=(12, 6))
        
        # Plot bee percentage for each file
        plt.subplot(1, 2, 1)
        sns.barplot(x='filename', y='bee_percentage', data=summary_df)
        plt.title("Bee Sound Percentage by File")
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        
        # Plot confidence for each file
        plt.subplot(1, 2, 2)
        summary_df['confidence_display'] = summary_df.apply(
            lambda x: x['confidence'] if x['primary_classification'] == 'bee' else 1 - x['confidence'], 
            axis=1
        )
        sns.barplot(x='filename', y='confidence_display', hue='primary_classification', data=summary_df)
        plt.title("Classification Confidence by File")
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        
        plt.savefig(os.path.join(RESULTS_FOLDER, "all_files_summary.png"))
    
    print(f"\nTesting complete! Results saved to {RESULTS_FOLDER} folder.")

if __name__ == "__main__":
    main()