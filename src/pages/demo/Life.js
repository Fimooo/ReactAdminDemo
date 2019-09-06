import React from 'react'
import Chlid from './Chlid'
import './index.less'
export default class life extends React.Component{
    constructor(props){
        super(props)
    }

    state = {
        count:0
    }

    handleAdd=()=>{
        this.setState({
            count:this.state.count + 1
        })
    }

    handleClick(){
        this.setState({
            count:this.state.count + 1
        })
    }
    
    render(){
        let style = {
            padding:50
        }
        return <div style={style}>
            <p className="ft20">React生命周期</p>
            <button onClick={this.handleAdd}>点击</button>
            {/* 使用this.handleAdd需要使用es6的箭头函数定义（this指针问题） */}
            <button onClick={this.handleClick.bind(this)}>点击</button>
            <p>{this.state.count}</p>  
            <p>子组件，子组件生命周期</p>  
            <Chlid name={this.state.count}></Chlid>
        </div>
    }
} 