import React from 'react'
import { Card,Form, Button,Input, message,Icon,Checkbox } from 'antd'
import './index.less'
const FormItem = Form.Item
class FormLogin extends React.Component{
    handleSubmit = () => {
        //获取表单值，为对象
        let userInfo = this.props.form.getFieldsValue()
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.userName}恭喜你，完成表单验证，密码为：${userInfo.pwd}`)
            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form
        return (<div>
        <Card title="登陆行内表单">
            <Form layout="inline">
                <FormItem>
                    <Input type="text" placeholder="请输入用户名" />
                </FormItem>
                <FormItem>
                    <Input type="password" placeholder="请输入密码" />
                </FormItem>
                <FormItem>
                    <Button type="primary">登陆</Button>
                </FormItem>
            </Form>
        </Card>
        <Card title="登陆水平表单" style={{marginTop:10}}>
            <Form>
                <FormItem>
                    {
                        getFieldDecorator('userName',{
                            rules:[
                                {
                                    required:true,
                                    message:'用户名不能为空'
                                },
                                {
                                    min:5,max:12,
                                    message:'长度不在范围内，需要5-12'
                                },
                                {
                                    pattern:/^\w+$/g,
                                    message:'必须为字母或数字'
                                },
                                {
                                    pattern:new RegExp('^\\w+$','g'),
                                    message:'必须为字母或数字啊'
                                }
                            ]
                        })(
                            <Input prefix={<Icon type="user"/>} type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem>
                {
                        getFieldDecorator('pwd',{
                            rules:[]
                        })(
                            <Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码" />
                        )
                    }
                </FormItem>
                <FormItem>
                {
                        getFieldDecorator('remember',{
                            valuePropName:'checked',
                            initialValue:true
                        })(
                           <Checkbox>记住密码</Checkbox>
                        )
                    }
                    <a href="#" style={{float:'right'}}>忘记密码</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.handleSubmit}>登陆</Button>
                </FormItem>

            </Form>
        </Card>
        </div>)
    }
}
export default Form.create()(FormLogin);