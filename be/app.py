from random import randint
from flask import Flask
from flask_cors import CORS

import time

app = Flask(__name__)
CORS(app)

DATA = [
    {
        "name": "Plain Ol' Pineapple",
        "image": "pineapple-original.jpg",
        "price": 4
    },
    {
        "name": "Dried Pineapple",
        "image": "pineapple-dried.jpg",
        "price": 5
    },
    {
        "name": "Pineapple Gum",
        "image": "pineapple-gum.jpg",
        "price": 3
    },
    {
        "name": "Pineapple T-Shirt",
        "image": "pineapple-tshirt.jpg",
        "price": 12
    }
]
DELAY = 0.3


@ app.route("/items")
def hello_world():
    time.sleep(DELAY)
    return DATA


if __name__ == "__main__":
    app.run(debug=True, port=5000)
