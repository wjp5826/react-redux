import React from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        component: null,
      }
    }
    componentDidMount() {
      const { default: component } = importComponent();
      this.setState({ component });
    }
    render(){
      const { component } = this.state;
      return component ? <component { ...this.props } /> : null; 
    }
  }
  return AsyncComponent;
}