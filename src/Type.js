
import React, { Component } from 'react';

import Method from './Method';
import Pod from './Pod';

class Type extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.kind[0].toUpperCase() + this.props.kind.substr(1)} {this.props.name}</h1>
        <Pod contents={this.props.desc}/>
        <h2>Methods</h2>
        {this.props.methods.map((method, idx) => <Method key={idx} name={method.name} desc={method.desc} sig={method.sig}/>)}
      </div>
    )
  }
}


export default Type;
