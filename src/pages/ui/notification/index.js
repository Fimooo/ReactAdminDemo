import React from 'react'
import { Row,Col,Card,Modal,Button, notification } from 'antd'
// import './index.less'
export default class Modals extends React.Component{
    constructor(props){
        super(props)
    }

    openNotification = (type,postion) => {
        notification[type]({
            message:"发工资了",
            description:"迟到2天",
            placement:postion
        })
    }

    render(){
        return (<div>
            <Card title="通知提醒框">
                <Button onClick={()=>this.openNotification('success')}>success</Button>
                <Button onClick={()=>this.openNotification('warning')}>warning</Button>
                <Button onClick={()=>this.openNotification('info')}>info</Button>
                <Button onClick={()=>this.openNotification('error')}>error</Button>
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