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
    return "Welcome to my App!"

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
    return options[random.randint(1,len(options)-1)]

def game(player_choice, computer_choice):
    if (player_choice == computer_choice):
        return 'tie'
    elif (player_choice == 1 and computer_choice == 3 or player_choice == 1 and computer_choice == 4):
        return 'win'
    elif (player_choice == 2 and computer_choice == 1 or player_choice == 2 and computer_choice == 5):
        return 'win'
    elif (player_choice == 3 and computer_choice == 2 or player_choice == 3 and computer_choice == 4):
        return 'win'
    elif (player_choice == 4 and computer_choice == 5 or player_choice == 4 and computer_choice == 2):
        return 'win'
    elif (player_choice == 5 and computer_choice == 3 or player_choice == 5 and computer_choice == 1):
        return 'win'
    else:
        return 'lose'


@app.route("/play", methods = ['POST'])
def play():
    player_choice = json.loads(request.data)["player"]
    computer_choice = random.randint(1,len(options)-1)
    return {
        "results": game(player_choice,computer_choice),
        "player": player_choice,
        "computer": computer_choice
    }

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
