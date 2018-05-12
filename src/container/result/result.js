import React from 'react';

class Result extends React.Component {
  render(){
    console.log('result', this.props.match)
    return (
      <div>result</div>
    )
  }
}

export default Result;