import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

@connect(state => {
	const home = state.get('home');
	console.log('home', home)
	return {
		isLogin: home.get('isLogin')
	}
})
class AuthLogin extends React.Component {
	render () {
		const { component: Component, isLogin,  ...rest} = this.props
		console.log('login', isLogin)
		return (
			<Route
				{...rest}
				render={props => isLogin ? <Component {...props} /> : <Redirect to="/login" />}
			/>
		)
	}
}

export default AuthLogin