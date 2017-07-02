import React, { Component } from 'react';
import logo from './style/logo.png';
import './style/App.css';
import Dolls from './pages/dolls';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Haunter</h2>
        </div>
        <div className="App-intro">
          Things will go here.

          <Dolls />

        </div>
      </div>
    );
  }
}

export default App;
