
import React, { Component } from 'react';

import Method from './Method';

class Class extends Component {
  render() {
    return (
      <div>
        <h1>Class {this.props.name}</h1>
        <h2>Methods</h2>
        {this.props.methods.map(method => <Method name={method.name} sig={method.sig}/>)}
      </div>
    )
  }
}

export default Class;
