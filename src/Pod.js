
import React, { Component } from 'react';

class Pod extends Component {
  renderPod(contents, key) {
    if (typeof contents === 'string') {
      return contents;
    } else if (contents instanceof Array) {
      return <div key={key}>{contents.map((chunk,idx) => this.renderPod(chunk, idx))}</div>
    } else if (contents.code) {
      return <pre key={key}>{contents.code}</pre>
    } else if (contents.para) {
      return this.renderPod(contents.para, key);
    } else if (contents.type === 'C') {
      return <span key={key}>{contents.contents}</span>
    } else if (contents.type === 'L') {
      return <a key={key}>{contents.contents}</a>
    }
  }
  render() {
    return this.renderPod(this.props.contents, 0);
  }
}

export default Pod;
