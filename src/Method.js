import React, { Component } from 'react';
import Pod from './Pod';
class Method extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: true};
  }

  toggleVisibility = () => {
    console.log('toggling visibility');
    this.setState((prevState, props) => ({visible: !prevState.visible}));
  }

  componentDidMount() {
    this.keydownListener = document.addEventListener('keydown', event =>  {
      if (event.key === '+') {
        this.setState({visible: true});
      } else if (event.key === '-') {
        this.setState({visible: false});
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownListener);
  }

  render() {
    return (
      <div style={{marginBottom: 10+'px'}}>
        <div><a style={{cursor:'pointer'}} onClick={this.toggleVisibility}>[{this.state.visible ? '-' : '+'}]</a> method {this.props.name}({this.props.sig})</div>
        {
          this.state.visible
          && <div style={{paddingLeft: 20+'px'}}>
               <Pod contents={this.props.desc}/>
             </div>
        }
      </div>
    )
  }
}

export default Method;
