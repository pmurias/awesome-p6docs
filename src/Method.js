import React, { Component } from 'react';
class Method extends Component {
  render() {
    return (
      <div>method {this.props.name}({this.props.sig})</div>
    )
  }
}

export default Method;
