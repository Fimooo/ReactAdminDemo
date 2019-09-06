import React from 'react'
import { Row,Col,Card,Modal,Button } from 'antd'
// import './index.less'
export default class Modals extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        modal1:false,
        modal2:false,
        modal3:false,
        modal4:false,
    }

    hanldleModal = (type) => {
        this.setState({
            [type]:true
        })
    }

    hanldleConfirmModal = (type) => {
        Modal[type]({
            title:"确认",
            content:"你确定？",
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('cancle')
            }
        })
    }

    render(){
        return (<div>
            <Card title="基础模态框">
                <Button onClick={()=>this.hanldleModal('modal1')}>Open</Button>
                <Button onClick={()=>this.hanldleModal('modal2')}>自定义页脚</Button>
                <Button onClick={()=>this.hanldleModal('modal3')}>顶部20px弹框</Button>
                <Button onClick={()=>this.hanldleModal('modal4')}>水平垂直居中</Button>
            </Card>
            <Card title="信息框">
                <Button onClick={()=>this.hanldleConfirmModal('info')}>Open</Button>
                <Button onClick={()=>this.hanldleConfirmModal('warn')}>自定义页脚</Button>
                <Button onClick={()=>this.hanldleConfirmModal('success')}>顶部20px弹框</Button>
                <Button onClick={()=>this.hanldleConfirmModal('confirm')}>水平垂直居中</Button>
            </Card>
            <Modal
                title="React"
                visible={this.state.modal1}
                onCancel={()=>{this.setState({modal1:false})}}
            >
                这是一个弹框
            </Modal>
            <Modal
                title="React"
                visible={this.state.modal2}
                okText="好的"
                cancelText="算了"
                onCancel={()=>{this.setState({modal2:false})}}
            >
                这是一个弹框
            </Modal>
            <Modal
                title="React"
                visible={this.state.modal3}
                style={{top:20}}
                onCancel={()=>{this.setState({modal3:false})}}
            >
                这是一个弹框
            </Modal>
            <Modal
                title="React"
                visible={this.state.modal4}
                wrapClassName="vertical-center-modal"
                onCancel={()=>{this.setState({modal4:false})}}
            >
                这是一个弹框
            </Modal>
        </div>)
    }
}