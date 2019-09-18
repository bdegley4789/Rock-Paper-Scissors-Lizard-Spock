import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
            listButtons: [],
            playerChoice: "",
            computerChoice: "",
            result: "",
        }
    }

  componentDidMount() {
    let gameButton = []
    axios({
      baseURL: 'http://127.0.0.1:5000/choices',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset-UTF8'
      }
    })
    .then(({ data }) => {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        gameButton.push(<button id={i} onClick={() => this.test(data[i]["id"], data[i]["name"])}>{data[i]["name"]}</button>);
     }
     console.log(gameButton);
     this.setState({listButtons:gameButton});
    })
    .catch(err => console.log("Fetch Error: ", err));
  }

  test(numberInput, stringInput) {
    console.log(numberInput);
    console.log(stringInput);
  }

  render() {
    const {listButtons} = this.state
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
      </div>
    );
  }
}

export default App;
