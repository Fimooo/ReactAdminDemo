import React from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import About from './About'
import Info from './Info'
import Us from './Us'
import Main from './Main'
import Home from './Home'
import Nomatch from './Nomatch'
export default class IRouter extends React.Component{

    render(){
        return (
            <Router>
                <Home>
                <Switch>
                {/* render方法必须有返回的组件。非执行内部 */}
                {/* 外层精准匹配后无法进入内层 */}
                    <Route path="/main" render={()=>
                        <Main>
                            <Route  path="/main/:mainId" component={Info}></Route>
                        </Main>
                    }></Route>
                    <Route  path="/about" component={About}></Route>
                    <Route  path="/us" component={Us}></Route>
                    <Route  component={Nomatch}></Route>   
                </Switch>             
                </Home>
            </Router>
        )
    }
}