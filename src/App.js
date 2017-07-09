import React, { Component } from 'react';
import './App.css';

import Type from './Type';

const frame = require('./Frame.json');
const baggy = require('./Baggy.json');
const types = [baggy];

class App extends Component {
  render() {
    return (
      <div className="App">
        {types.map((c,idx) => <Type key={idx} methods={c.methods} name={c.name} desc={c.desc} kind={c.kind}/>)}
      </div>
    );
  }
}

export default App;
