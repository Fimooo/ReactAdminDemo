import React from 'react'
import { Row,Col,Card,Button,Radio } from 'antd'
import './index.less'
export default class Buttons extends React.Component{
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
        return (<div>
            <Card title="基础按钮">
                <Button type="primary">Fimo</Button>
                <Button type="danger">Fimo</Button>
                <Button type="dashed">Fimo</Button>
                <Button disabled>Fimo</Button>
                <Button>Fimo</Button>
            </Card>
            <Card title="图形按钮">
                <Button icon="plus">创建</Button>
                <Button icon="edit">编辑</Button>
                <Button icon="delete">删除</Button>
                <Button icon="search" shape="circle"></Button>
                <Button icon="search" type="primary">搜索</Button>
                <Button icon="download" type="primary">下载</Button>
            </Card>
            <Card title="Loading按钮">
                <Button type="primary" loading={this.state.loading}>确定</Button>
                <Button loading={this.state.loading}>点击加载</Button>
                <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                <Button shape="circle" loading={this.state.loading}></Button>
                <Button type="primary" onClick={this.handleoff}>关闭</Button>
                <Button type="primary" onClick={this.handleon}>开启</Button>
            </Card>
            <Card title="按钮组">
                <Button.Group>
                    <Button icon="left" style={{marginRight:0}}>返回</Button>
                    <Button icon="right">前进</Button>
                </Button.Group>
            </Card> 
            <Card title="按钮尺寸">
            <Radio.Group value={this.state.size} onChange={this.handleChangeSize}>
                <Radio value="small">小</Radio>
                <Radio value="default">中</Radio>
                <Radio value="large">大</Radio>
            </Radio.Group>
                <Button type="primary" size={this.state.size}>Fimo</Button>
                <Button type="danger" size={this.state.size}>Fimo</Button>
                <Button type="dashed" size={this.state.size}>Fimo</Button>
                <Button disabled size={this.state.size}>Fimo</Button>
                <Button size={this.state.size}>Fimo</Button>
            </Card>
        </div>)
    }
}