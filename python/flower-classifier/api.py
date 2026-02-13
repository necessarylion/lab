from flask import Flask, request, jsonify
from transformers import pipeline
from PIL import Image
import io

app = Flask(__name__)

# Load model once at startup
print("Loading model...")
classifier = pipeline("image-classification", model="dima806/flowers_image_detection")
print("Model loaded!")

@app.route('/classify', methods=['POST'])
def classify_flower():
    # Get image from request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    image = Image.open(io.BytesIO(file.read()))
    
    # Classify
    results = classifier(image)
    
    # Return top 3 predictions
    return jsonify({
        'predictions': results
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)