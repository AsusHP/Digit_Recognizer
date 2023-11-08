import numpy as np
import cv2
import base64
from PIL import Image
import io

def predict(image_input, model):

    image_data_bytes = base64.b64decode(image_input)

    image_stream = io.BytesIO(image_data_bytes)

    image_pil = Image.open(image_stream)

    image_np = np.array(image_pil)

    image = cv2.resize(image_np, (28,28))[:, :, 3]

    resized_image = image / 255.0

    input_image = np.expand_dims(resized_image, axis=0)

    predicted_probabilities = model.predict(input_image)

    predicted_labels = np.argmax(predicted_probabilities, axis=1)

    return predicted_labels[0].astype(str), np.around(predicted_probabilities.max()*100,3).astype(str)