import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
let port = "http://127.0.0.1:5000/"

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

  componentDidMount() {
    let gameButton = [];
    let choicesList = [];
    axios({
      baseURL: port + 'choices',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset-UTF8'
      }
    })
    .then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        choicesList.push({"id": data[i]["id"], "name": data[i]["name"]})
        gameButton.push(<button id={i} onClick={() => this.play(data[i]["id"], data[i]["name"])}>{data[i]["name"]}</button>);
     }
     this.setState({choicesList: choicesList})
     this.setState({listButtons:gameButton});
    })
    .catch(err => console.log("Fetch Error: ", err));
  }

  resetScoreBoard() {
    this.setState({scoreBoard: []});
    this.setState({gameCount: 1});
  }

  play(numberInput, stringInput) {
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
      scoreBoard.unshift(<div className="record">Game {this.state.gameCount}: {result}</div>);
      if (scoreBoard.length > 10) {
        scoreBoard.pop();
      }
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
        <button onClick={() => this.resetScoreBoard()}>Reset Score Board</button>
        <h3 className="scoreBoard">Score Board</h3>
        <div id="ScoreBoard">{scoreBoard}</div>
      </div>
    );
  }
}

export default App;
