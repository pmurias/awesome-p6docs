import {Link} from 'react-router-dom'
import React from 'react';
function TypeList({types}) {
  return <div>{Object.keys(types).map(name => <div key={name}><Link to={"/type/" + name}>{name}</Link></div>)}</div>
}

export default TypeList;
