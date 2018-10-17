import React, { Component } from 'react';
import './App.css';
import ColorPicker from './components/ColorPicker';

const format = require('string-format');
format.extend(String.prototype, {});

class App extends Component {
  render() {
    return (
      <div className="App">
        <ColorPicker />
      </div>
    );
  }
}

export default App;
