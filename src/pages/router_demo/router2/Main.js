import  React from 'react'
import { Link } from 'react-router-dom'
export default class Home extends React.Component{

    render(){
        return(
            <div>
                main<br/>
                <Link to="/main/a">main to a</Link>
                <hr/>
                {this.props.children}
            </div>
        )
    }
}