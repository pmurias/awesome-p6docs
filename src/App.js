import React, { Component } from 'react';
import './App.css';

import Class from './Class';

class App extends Component {
  render() {
    let classes = [
      {
        name: 'Backtrace::Frame',
        methods: [
          {
            name: 'file',
            sig: 'Backtrace::Frame:D --> Str',
          },
          {
            name: 'line',
            sig: 'Backtrace::Frame:D --> Int',
          }
        ]
      }
    ];
    return (
      <div className="App">
        {classes.map(c => <Class methods={c.methods} name={c.name}/>)}
      </div>
    );
  }
}

export default App;
