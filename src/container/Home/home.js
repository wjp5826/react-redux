import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import www from './www.jpg';
import styles from './index.less';
import second from './second.less';
import Result from '../result/result';
import { cookie } from 'utilfunction';
import { Map } from 'immutable';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            data: Map({ 'name': '吴建平' }),
        }
    }
    render() {
        return (
            <BrowserRouter>
                <div className={styles.wrap}>
                    <hr />
                    <h1>{this.state.data.get('name')}</h1>
                    <button onClick={() => alert('hello')} ref={button => { this.btn = button }}>hello</button>
                    <div className={styles.wrap}>
                        hello
                </div>
                    <ul>
                        <li><Link to={`${this.props.match.url}/asd`}>link1</Link></li>
                        <li><Link to={`${this.props.match.url}/third`}>link2</Link></li>
                    </ul>
                    <Switch>
                        <Route path={`${this.props.match.url}/asd`} component={Second} />
                        <Route path={`${this.props.match.url}/third`} component={Third} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
const Second = () => {
    return <div>second</div>
}
const Third = () => {
    return <div>third</div>
}
function mapStateToProps(state) {
    console.log('state', state.get('name'))
    return {
        name: state.get('name'),
    }
}
export default connect(mapStateToProps)(Home);