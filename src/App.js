import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  componentDidMount() {
     return axios({
       baseURL: 'http://127.0.0.1:5000/choices',
       method: 'GET',
       headers: {
         'Content-Type': 'application/json; charset-UTF8'
       }
     })
     .then(({ data }) => {
       console.log(data)
       return data;
     })
     .catch(err => console.log("Fetch Error: ", err));
  }

  test() {
    console.log("test")
  }

  render() {
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
        <button onClick={() => this.test()}>Click me</button>
      </div>
    );
  }
}

export default App;
