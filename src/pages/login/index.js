import React from 'react'
import { Row, Col, Card, Input, Form, Button,Checkbox,message,Icon } from 'antd'
import './index.less'
import Utils from '../../utils/utils'
import axios from '../../axios'
import cookie from 'react-cookies'
const FormItem = Form.Item
class FormLogin extends React.Component {
    handleLogin = () => {
        //获取表单值，为对象
        let userInfo = this.props.form.getFieldsValue()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                window.location.href = '/'
                axios.ajax({
                    url: '/login',
                    data: {
                        params: {
                            userName: 'fimo',
                            pwd: '12345aaa'
                        }
                    }
                }).then((res) => {
                    if (res.code == 0) {
                        cookie.save('userName', res.params.userName, { maxAge: new Date().setDate(new Date().getDate() + 15) })
                        message.success(`${userInfo.userName}恭喜你，完成表单验证，密码为：${userInfo.pwd}`)
                    }

                })

            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const span = {
            labelCol: { span: 6 },
            wrapperCol: { span: 6 }
        }
        return (<div><Card title="登陆" align='center' style={{ marginTop: 200,alignText:'center' }}>
            <Form style={{width:300,margin:'0 auto'}}>
                <FormItem>
                    {
                        getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空'
                                },
                                {
                                    min: 5, max: 12,
                                    message: '长度不在范围内，需要5-12'
                                },
                                {
                                    pattern: /^\w+$/g,
                                    message: '必须为字母或数字'
                                },
                                {
                                    pattern: new RegExp('^\\w+$', 'g'),
                                    message: '必须为字母或数字啊'
                                }
                            ]
                        })(
                            <Input prefix={<Icon type="user" />} type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('pwd', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空'
                                },
                                {
                                    min: 5, max: 12,
                                    message: '长度不在范围内，需要5-12'
                                },
                            ]
                        })(
                            <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )
                    }
                    <a href="#" style={{ float: 'right' }}>忘记密码</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                </FormItem>

            </Form>
        </Card>
        </div>)
    }
}

export default Form.create()(FormLogin);