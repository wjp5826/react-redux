/**
 * 登录界面
 */
import React from 'react';
import { connect } from 'react-redux';

import { login } from "../../actions/HomeAction";

@connect(null,dispatch => ({ dispatch }))
class Login extends React.Component {
  render(){
    console.log('result', this.props.match)
	  const { dispatch } = this.props;
    return (
      <div>
        <h4>你未登陆</h4>
        <button onClick={() => dispatch(login(true))}>登陆</button>
      </div>
    )
  }
}

export default Login;