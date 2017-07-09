import Type from './Type';
import React from 'react';

function DocsForType({match, types}) {
  const type = types[match.params.name];
  return <Type methods={type.methods} name={type.name} desc={type.desc} kind={type.kind}/>
}

export default DocsForType;
