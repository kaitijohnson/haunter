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
        </div>
        <div className="App-intro">

          <Dolls />

        </div>
      </div>
    );
  }
}

export default App;
