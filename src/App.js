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
      <div className="App" id="top">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="holder">
          <div className="App-intro">

            <Survey />
            <br /><br /><br /><br /><br />
            <div id="land"></div>
            <Dolls />

         </div>
        </div>
        <div className="toolbar">
        <img src={menu} className="img-fluid menu" alt="Responsive image" />
        <a href="#top"><img src={ghost} className="img-fluid ghost" alt="Responsive image" /></a>
        <img src={heart} className="img-fluid heart" alt="Responsive image" />
        </div>
      </div>

    );
  }
}

export default App;
