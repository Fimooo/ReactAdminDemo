import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import About from './About'
import Us from './Us'
export default class Home extends React.Component {

    render() {
        return (
            <div>
                {/* 导航部分 */}
                <ul>
                    <li>
                        <Link to="/Main">Main</Link>
                    </li>
                    <li>
                        <Link to="/About">About</Link>
                    </li>
                    <li>
                        <Link to="/Us">Us</Link>
                    </li>
                    <li>
                        <Link to="/404">404</Link>
                    </li>
                </ul>
                {/* 内容部分 */}
                {this.props.children}
            </div>
        )
    }
}