import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import About from './About'
import Us from './Us'
import Main from './Main'
import Home from './Home'
export default class IRouter extends React.Component{

    render(){
        return (
            <Router>
                <Home>
                {/* render方法必须有返回的组件。非执行内部 */}
                {/* 外层精准匹配后无法进入内层 */}
                    <Route path="/main" render={()=>
                        <Main>
                            <Route  path="/main/a" component={About}></Route>
                        </Main>
                    }></Route>
                    <Route  path="/about" component={About}></Route>
                    <Route  path="/us" component={Us}></Route>                
                </Home>
            </Router>
        )
    }
}