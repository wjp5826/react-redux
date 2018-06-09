/**
 * 应用的最上层组件
 */
import React from 'react';

class Result extends React.Component {
  render() {
    return (
      <div>
        <h1>this is app component 1</h1>
        {this.props.children}
      </div>
    )
  }
}

export default Result;