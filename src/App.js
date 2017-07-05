import React, { Component } from 'react';
import logo from './style/logo.png';
import ghost from './style/Tinder-Ghost.png';
import heart from './style/heart.png';
import menu from './style/menu.png';
import './style/App.css';
import Dolls from './pages/dolls';
import Survey from './pages/survey';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App-intro">
          <Dolls />
          <Survey />

        </div>
        <div className="toolbar">
        <img src={menu} className="img-fluid menu" alt="Responsive image" />
        <img src={ghost} className="img-fluid ghost" alt="Responsive image" />
        <img src={heart} className="img-fluid heart" alt="Responsive image" />
        </div>
      </div>
    );
  }
}

export default App;
