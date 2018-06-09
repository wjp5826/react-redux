import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import styles from './index.less';
import { cookie } from 'utilfunction';
import { Map } from 'immutable';
import { saveName } from '../../actions/HomeAction';

@connect(state => {
    const home = state.get('home');
    return {
        name: home.get('name'),
    }
}, dispatch => ({ dispatch }))
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            data: Map({ 'name': '张三' }),
        }
    }
    render() {
        const { dispatch } = this.props;
        return (
            <div className={styles.wrap}>
                <h1>{this.state.data.get('name')}</h1>
                <button onClick={() => dispatch(saveName('李四'))} ref={button => { this.btn = button }}>hello</button>
                <div className={styles.wrap}>
                    hello
                    </div>
                <ul>
                    <li><Link to={`/home/one`}>link1</Link></li>
                    <li><Link to={`/second`}>to res</Link></li>
                    <li><Link to={`${this.props.match.url}/third`}>link2</Link></li>
                </ul>
                <Route path={`/home/one`} component={Second} />
                <Route path={`${this.props.match.url}/third`} component={Third} />
            </div>
        )
    }
}
const Second = () => {
    return <div>second</div>
}
const Third = () => {
    return <div>third</div>
}

export default Home;