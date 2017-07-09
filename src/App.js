import React from 'react';
import './App.css';

import TypeList from './TypeList';
import DocsForType from './DocsForType';

import {BrowserRouter as Router, Route} from 'react-router-dom'

const typesData = require('./types.json');
const types = {};

for (let type of typesData.types) {
  types[type.name] = type;
}

function App(props) {
  return (
    <Router>
        <div>
          <Route exact path="/" render={props => <TypeList types={types}/>}/>
          <Route path="/type/:name" render={props => <DocsForType types={types} {...props}/>}/>
        </div>
    </Router>
  );
}


export default App;
