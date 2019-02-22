import React, { Component } from 'react';

import './app.css';

import AchievementsList from './achievement-list.js';

class App extends Component {
  render() {
    return (
      <div>
            <h1 id="header">Phirestarter Achievements</h1>
            <AchievementsList />
        </div>
    );
  }
}

export default App;
