from flask import Flask, flash, redirect, render_template, request, session, abort
import random

app = Flask(__name__)

# I got the basic set up for this flask app here: https://pythonspot.com/flask-web-app-with-python/
@app.route("/")
def index():
    return "Flask App!"

@app.route("/random")
def random_number():
    return {
        "random_number": random.randint(1,101)
    }

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
