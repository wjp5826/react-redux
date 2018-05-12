import React from 'react';

class Result extends React.Component {
  render(){
    return (
      <div>
      {this.props.children}        
      </div>
    )
  }
}

export default Result;