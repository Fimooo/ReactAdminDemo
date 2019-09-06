import  React from 'react'
import { Link } from 'react-router-dom'
export default class Home extends React.Component{

    render(){
        return(
            <div>
                main<br/>
                <Link to="/main/test-id">main to test-id</Link>
                <br/>
                <Link to="/main/7788">main to number</Link>

                <hr/>
                {this.props.children}
            </div>
        )
    }
}