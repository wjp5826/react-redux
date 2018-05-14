import React from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        Component: null,
      }
    }
    componentDidMount() {
       importComponent().then(module => {
        // const { default: component } = res;
         this.setState({ Component: module.default });
       });
    }
    render(){
      const { Component } = this.state;
      return Component ? <Component { ...this.props } /> : null;
    }
  }
  return AsyncComponent;
}