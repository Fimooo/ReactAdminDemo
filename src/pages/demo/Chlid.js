import React from 'react'

export default class Chlid extends React.Component{
    constructor(props){
        super(props)
    }

    state = {
        count : 0
    }

    componentWillMount(){
        console.log('componentWillMount')
    }

    componentDidMount(){
        console.log('componentDidMount')
    }

    // 接受属性参数
    componentWillReceiveProps(newprops){
        console.log('componentWillReceiveProps:'+newprops.name)
    }

    // 调了setstate之后就会使用的方法
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate')
        return true
    }

    componentWillUpdate(){
        console.log('componentWillUpdate')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    render(){
        return <div>
            <p>{this.props.name}</p>
        </div>
    }
}