import React from 'react'
import { Row,Col,Card,Modal,Button, message } from 'antd'
// import './index.less'
export default class Modals extends React.Component{
    constructor(props){
        super(props)
    }

    showMessage = (type,postion) => {
        message[type]("你过了")
    }

    render(){
        return (<div>
            <Card title="全局提示框">
                <Button type="primary" onClick={()=>this.showMessage('success')}>success</Button>
                <Button type="primary" onClick={()=>this.showMessage('warning')}>warning</Button>
                <Button type="primary" onClick={()=>this.showMessage('info')}>info</Button>
                <Button type="primary" onClick={()=>this.showMessage('error')}>error</Button>
                <Button type="primary" onClick={()=>this.showMessage('loading')}>loading</Button>

            </Card>
            <Card title="通知提醒框">
                <Button onClick={()=>this.openNotification('success','topLeft')}>success</Button>
                <Button onClick={()=>this.openNotification('warning','topRight')}>warning</Button>
                <Button onClick={()=>this.openNotification('info','bottomLeft')}>info</Button>
                <Button onClick={()=>this.openNotification('error','bottomRight')}>error</Button>
            </Card>
        </div>)
    }
}