import React, { Component } from 'react';
import './App.css';

import Type from './Type';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const frame = require('./Frame.json');
const baggy = require('./Baggy.json');
const types = {'Backtrace::Frame': frame, 'Baggy': baggy};

class DocsForType extends Component {
  render() {
    const type = types[this.props.match.params.name];
    return <Type methods={type.methods} name={type.name} desc={type.desc} kind={type.kind}/>
  }
}

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <div><Link to="/type/Baggy">Baggy</Link></div>
            <div><Link to="/type/Backtrace::Frame">Backtrace::Frame</Link></div>
            <Route path="/type/:name" component={DocsForType}></Route>
          </div>
      </Router>
    );
  }
}


export default App;
