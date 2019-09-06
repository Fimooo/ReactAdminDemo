import  React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import About from './About'
import Us from './Us'
export default class Home extends React.Component{

    render(){
        return(
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/About">About</Link>
                        </li>
                        <li>
                            <Link to="/Us">Us</Link>
                        </li>
                    </ul>
                </div>
                <hr/>
                {/* 方式一：一一匹配 */}
                <Route exact={true} path="/" component={About}></Route>
                <Route path="/Us" component={Us}></Route>
                {/* 方式二：Switch匹配到则停止 */}
                <Switch>
                    <Route exact={true} path="/" component={About}></Route>
                    <Route path="/Us" component={Us}></Route>
                </Switch>
            </HashRouter>
        )
    }
}