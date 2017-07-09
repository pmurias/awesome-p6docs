import React, { Component } from 'react';
import './App.css';

import Class from './Class';

const frame = require('./Frame.json');
const classes = [frame];

class App extends Component {
  render() {
    return (
      <div className="App">
        {classes.map((c,idx) => <Class key={idx} methods={c.methods} name={c.name} desc={c.desc}/>)}
      </div>
    );
  }
}

export default App;
