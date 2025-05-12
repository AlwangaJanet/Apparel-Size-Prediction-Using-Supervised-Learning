from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load the trained model and preprocessing components
model_path = os.path.join(os.path.dirname(__file__), 'model')
rf_model = joblib.load(os.path.join(model_path, 'rf_model.pkl'))
gender_encoder = joblib.load(os.path.join(model_path, 'gender_encoder.pkl'))
size_encoder = joblib.load(os.path.join(model_path, 'size_encoder.pkl'))
scaler = joblib.load(os.path.join(model_path, 'scaler.pkl'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the form
        height_cm = float(request.form['height_cm'])
        weight_kg = float(request.form['weight_kg'])
        age = float(request.form['age'])
        hips_cm = float(request.form['hips_cm'])
        gender = request.form['gender']
        
        # Encode gender
        gender_encoded = gender_encoder.transform([gender])[0]
        
        # Create the measurement_cm based on gender and provided measurement
        measurement_cm = float(request.form['measurement_cm'])
        
        # Create input feature array
        features = np.array([[height_cm, weight_kg, age, hips_cm, gender_encoded, measurement_cm]])
        
        # Scale the features
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction = rf_model.predict(features_scaled)[0]
        
        # Get the predicted size label
        predicted_size = size_encoder.inverse_transform([prediction])[0]
        
        return jsonify({'size': predicted_size})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)