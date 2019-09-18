import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
let port = "http://127.0.0.1:5000/"

// I used this to initialize my react app https://reactjs.org/docs/create-a-new-react-app.html
class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            listButtons: [],
            choicesList: [],
            playerChoice: "",
            computerChoice: "",
            result: "",
            scoreBoard: [],
            gameCount: 1
        }
    }

    //Use componentDidMount to get all the initial data from choices endpoint
  componentDidMount() {
    let gameButton = [];
    let choicesList = [];
    // I choose axios so this application would work in Internet Explorer.
    axios({
      baseURL: port + 'choices',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset-UTF8'
      }
    })
    .then(({ data }) => {
      //Append the choices to a choices list as well as create the buttons
      for (let i = 0; i < data.length; i++) {
        choicesList.push({"id": data[i]["id"], "name": data[i]["name"]})
        gameButton.push(<button className="button" id={i} onClick={() => this.play(data[i]["id"], data[i]["name"])}>{data[i]["name"]}</button>);
     }
     // Update the state for these choices and buttons
     this.setState({choicesList: choicesList})
     this.setState({listButtons:gameButton});
    })
    .catch(err => console.log("Fetch Error: ", err));
  }

  //Reset the score board by simply resetting the scoreboard array and game count
  resetScoreBoard() {
    this.setState({scoreBoard: []});
    this.setState({gameCount: 1});
  }

  //Play the game by hitting the play endpoint with the needed data
  play(numberInput, stringInput) {
    // I choose axios so this application would work in Internet Explorer.
    axios({
      baseURL: port + 'play',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset-UTF8'
      },
      data: {
        "player": numberInput
      }
    })
    .then(({ data }) => {
      let result = "You " + data.results;
      let scoreBoard = this.state.scoreBoard
      //Use unshift and pop to make a reversed array
      scoreBoard.unshift(<div className="record">Game {this.state.gameCount}: {result}</div>);
      if (scoreBoard.length > 10) {
        scoreBoard.pop();
      }
      //Update state for last game as well as scoreboard
      this.setState({playerChoice:stringInput});
      this.setState({computerChoice:this.state.choicesList[data.computer-1]["name"]});
      this.setState({result:result});
      this.setState({scoreBoard: scoreBoard});
      this.setState({gameCount: this.state.gameCount + 1})
    })
    .catch(err => console.log("Fetch Error: ", err));
  }

  render() {
    const {listButtons, playerChoice, computerChoice, result, scoreBoard} = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Rock Paper Scissors Lizard Spock!</h2>
        </div>
        <p className="App-intro">
          Choose Rock Paper Scissors Lizard or Spock!
        </p>
        <a href="http://www.samkass.com/theories/RPSSL.html">Game Rules</a>
        <div id="Buttons">{listButtons}</div>
        <h3 className="titleDisplay">You Choose</h3>
        <div id="You">{playerChoice}</div>
        <h3 className="titleDisplay">Computer Chooses</h3>
        <div id="Computer">{computerChoice}</div>
        <h3 className="titleDisplay">Result</h3>
        <div id="Result">{result}</div>
        <button className="button" onClick={() => this.resetScoreBoard()}>Reset Score Board</button>
        <h3 className="scoreBoard">Score Board</h3>
        <div id="ScoreBoard">{scoreBoard}</div>
      </div>
    );
  }
}

export default App;
