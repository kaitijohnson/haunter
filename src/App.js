import React, { Component } from 'react';
import logo from './style/logo.png';
import './style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Haunter</h2>
        </div>
        <p className="App-intro">
          Things will go here.
        </p>
      </div>
    );
  }
}

export default App;
