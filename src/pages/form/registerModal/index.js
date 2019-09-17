import React, { Component } from 'react'
import RegisterModal from './registaerForm'
import { Modal, Button, Card } from 'antd'
export default class Register extends Component {
    state = {
        show:false
    }
    handleSubmit = ()=>{
        console.log(this.registerRef.handleFilters())
    }
    handleClick = ()=>{
        this.setState({
            show:true
        })
    }
    render() {
        return (
            <div>
            <Card title="弹框-注册">
                <Button onClick={this.handleClick}>注册</Button>    
            </Card>
                <Modal
                    visible={this.state.show}
                    title="注册"
                    onCancel={()=>{
                        this.setState({
                            show:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    {/* this.xxxxxx=inst 为自定义名字 */}
                    {/* 可在父组件内获取表单所有元素，可使用表单内函数等 */}
                    <RegisterModal wrappedComponentRef={(inst) => this.registerRef = inst}></RegisterModal>
                </Modal>
                
            </div>
        )
    }
}
