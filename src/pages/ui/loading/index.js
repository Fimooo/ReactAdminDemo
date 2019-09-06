import React from 'react'
import { Card,Button,Icon,Spin,Alert } from 'antd'
import './index.less'
export default class Loadings extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        loading:true,
        size:'small'
    }
    handleoff = ()=>{
        this.setState({
            loading:false
        })
    }
    handleon = ()=>{
        this.setState({
            loading:true
        })
    }
    handleChangeSize = (e) => {
        this.setState({
            size:e.target.value
        })
    }
    render(){
        const icon = <Icon type="loading" style={{fontSize:24}}/>
        return (<div>
            <Card title="Spin用法">
                <Spin size="small"/>
                <Spin size="default"/>
                <Spin size="large"/>
                <Spin size="large" indicator={icon} spinning={true}/>
            </Card>
            <Card title="遮罩">
                <Alert
                    message="React"
                    description="欢迎遮罩"
                    type="info"
                ></Alert>
                <Alert
                    message="React"
                    description="欢迎遮罩"
                    type="warning"
                ></Alert>
                <Spin>
                    <Alert
                        message="React"
                        description="欢迎遮罩"
                        type="warning"
                    ></Alert>
                </Spin>
                <Spin tip="加载中...">
                    <Alert
                        message="React"
                        description="欢迎遮罩"
                        type="warning"
                    ></Alert>
                </Spin>
                <Spin tip="加载中..."  indicator={icon}>
                    <Alert
                        message="React"
                        description="欢迎遮罩"
                        type="warning"
                    ></Alert>
                </Spin>
            </Card>
        </div>)
    }
}