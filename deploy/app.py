#Import Library
from flask import Flask, request, jsonify, render_template, send_from_directory
import os
from tensorflow import keras
from keras.models import load_model

#Import functions and model
from functions import predict

model = load_model('model_mnist.h5')

app = Flask('meu app', template_folder='templates')

@app.route('/')
def index():
    return render_template('webpage.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)

@app.route('/process_drawing', methods=['POST'])
def process_drawing():

    data = request.json
    image_data = data.get("imageData")

    if image_data:

        value_1, value_2 = predict(image_data, model)

        response = {
            "value_1": value_1,
            "value_2": value_2
        }

        return jsonify(response)
    
    return jsonify({"response": "Erro: Dados de imagem não recebidos."})

if __name__ == '__main__':
    app.run()
