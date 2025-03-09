import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, roc_curve, auc

import tensorflow as tf
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization, Input
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.optimizers import Adam

# Set random seeds for reproducibility
np.random.seed(42)
tf.random.set_seed(42)

# Load the pre-extracted features
print("Loading data...")
data = pd.read_csv('bee_sound_features.csv')

# Separate features from metadata
# Assuming the last 4 columns are 'label', 'file', 'start', 'end'
feature_columns = data.columns[:-4]
X = data[feature_columns].values
y = data['label'].values

# Check if there are any NaN values and handle them
if np.isnan(X).any():
    print("Warning: NaN values found in features. Replacing with zeros.")
    X = np.nan_to_fill(X, 0)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"Training data shape: {X_train_scaled.shape}")
print(f"Testing data shape: {X_test_scaled.shape}")
print(f"Class distribution in training set: {np.bincount(y_train)}")
print(f"Class distribution in testing set: {np.bincount(y_test)}")

# Define a deep neural network model
def create_dnn_model(input_dim):
    model = Sequential([
        Dense(256, activation='relu', input_dim=input_dim),
        BatchNormalization(),
        Dropout(0.3),
        
        Dense(128, activation='relu'),
        BatchNormalization(),
        Dropout(0.3),
        
        Dense(64, activation='relu'),
        BatchNormalization(),
        Dropout(0.3),
        
        Dense(32, activation='relu'),
        BatchNormalization(),
        Dropout(0.2),
        
        Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model

# Create model
model = create_dnn_model(X_train_scaled.shape[1])
model.summary()

# Set up callbacks for training
callbacks = [
    EarlyStopping(
        monitor='val_loss',
        patience=10,
        restore_best_weights=True,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=5,
        min_lr=0.00001,
        verbose=1
    ),
    ModelCheckpoint(
        'best_bee_classifier.h5',
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    )
]

# Train the model
print("Training model...")
history = model.fit(
    X_train_scaled, y_train,
    epochs=100,
    batch_size=32,
    validation_split=0.2,
    callbacks=callbacks,
    verbose=1
)

# Evaluate on test set
y_pred_prob = model.predict(X_test_scaled)
y_pred = (y_pred_prob > 0.5).astype(int).flatten()

# Calculate metrics
accuracy = accuracy_score(y_test, y_pred)
print(f"\nTest Accuracy: {accuracy:.4f}")

# Print classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['nobee', 'bee']))

# Plot confusion matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=['nobee', 'bee'], 
            yticklabels=['nobee', 'bee'])
plt.xlabel('Predicted')
plt.ylabel('True')
plt.title('Confusion Matrix')
plt.tight_layout()
plt.savefig('dl_confusion_matrix.png')

# Plot ROC curve
fpr, tpr, _ = roc_curve(y_test, y_pred_prob)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (area = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic')
plt.legend(loc="lower right")
plt.savefig('roc_curve.png')

# Plot training history
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend(['Train', 'Validation'], loc='lower right')

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend(['Train', 'Validation'], loc='upper right')

plt.tight_layout()
plt.savefig('training_history.png')

# Save the model
model.save('deep_bee_classifier.h5')
print("Model saved as 'deep_bee_classifier.h5'")

# Save the scaler for future predictions
import joblib
joblib.dump(scaler, 'feature_scaler.pkl')
print("Scaler saved as 'feature_scaler.pkl'")

# Calculate feature importance using a custom approach for Keras models
# We'll use a simple approach based on weights of the first layer

# Create a function to get feature importance from the first layer weights
def get_feature_importance_from_weights(model, feature_names):
    # Get weights from the first Dense layer
    weights = model.layers[0].get_weights()[0]
    
    # Take the absolute values of weights and sum them for each feature
    importance = np.abs(weights).sum(axis=1)
    
    # Normalize to get relative importance
    importance = importance / importance.sum()
    
    # Create a DataFrame
    feature_importance = pd.DataFrame({
        'Feature': feature_names,
        'Importance': importance
    }).sort_values('Importance', ascending=False)
    
    return feature_importance

# Get feature importance
feature_importance = get_feature_importance_from_weights(model, feature_columns)

print("\nTop 10 Most Important Features:")
print(feature_importance.head(10))

# Plot feature importance
plt.figure(figsize=(10, 8))
sns.barplot(x='Importance', y='Feature', data=feature_importance.head(20))
plt.title('Feature Importance (Top 20)')
plt.tight_layout()
plt.savefig('feature_importance_dl.png')

# Function for making predictions on new audio
def predict_bee_sound(feature_vector, model, scaler):
    """
    Predict if a sound is a bee sound or not
    
    Parameters:
    feature_vector (array): Extracted features from audio
    model: Trained Keras model
    scaler: Fitted StandardScaler
    
    Returns:
    tuple: (prediction label, probability)
    """
    # Reshape for a single sample
    feature_vector = np.array(feature_vector).reshape(1, -1)
    
    # Scale features
    scaled_features = scaler.transform(feature_vector)
    
    # Predict
    probability = model.predict(scaled_features)[0][0]
    prediction = 'bee' if probability > 0.5 else 'nobee'
    
    return prediction, probability

print("\nDone!")