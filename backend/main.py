from flask import Flask, flash, redirect, render_template, request, session, abort
import random
import json

app = Flask(__name__)
options = [
    {"id":1,"name":"rock"},
    {"id":2,"name":"paper"},
    {"id":3,"name":"scissor"},
    {"id":4,"name":"lizard"},
    {"id":5,"name":"spock"}
    ]

# I got the basic set up for this flask app here: https://pythonspot.com/flask-web-app-with-python/
@app.route("/")
def index():
    return "Flask App!"

@app.route("/random")
def random_number():
    return {
        "random_number": random.randint(1,100)
    }

@app.route("/choices")
def choices():
    return json.dumps(options)

@app.route("/choice")
def choice():
    return options[random.randint(0,len(options)-1)]

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
