import React from 'react'
import {
    Row,
    Col,
    Card,
    Input,
    Form,
    Button,
    Checkbox,
    message,
    Icon
} from 'antd'
import './index.less'
import Utils from '../../utils/utils'
import axios from '../../axios'
import cookie from 'react-cookies'
import {connect} from 'react-redux'
import {logIn} from './../../redux/action/index'
const FormItem = Form.Item
class FormLogin extends React.Component {
    handleLogin = () => {
        //获取表单值，为对象
        let userInfo = this
            .props
            .form
            .getFieldsValue()

        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {

                    this
                        .props
                        .loginPush('MLOSJIWSNAK1548D', '20190908001')
                    // axios.ajax({     url: '/login',     data: {         params: {
                    // userName: 'fimo',             pwd: '12345aaa',
                    // token:'MLOSJIWSNAK1548D',             userId:'20190908001'         }     }
                    // }).then((res) => {     if (res.code == 0) {
                    // dispatch(logIn(res.params.token,res.params.userId))
                    // cookie.save('userName', res.params.userName, { maxAge: new Date().setDate(new
                    // Date().getDate() + 15) })         window.location.href = '/'
                    // message.success(`${userInfo.userName}恭喜你，完成表单验证，密码为：${userInfo.pwd}`)     }
                    // })

                }
            })
    }
    render() {
        const {getFieldDecorator} = this.props.form
        const span = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 6
            }
        }
        return (
            <div>
                <Card
                    title="登陆"
                    align='center'
                    style={{
                    marginTop: 200,
                    alignText: 'center'
                }}>
                    <Form
                        style={{
                        width: 300,
                        margin: '0 auto'
                    }}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空'
                                    }, {
                                        min: 5,
                                        max: 12,
                                        message: '长度不在范围内，需要5-12'
                                    }, {
                                        pattern: /^\w+$/g,
                                        message: '必须为字母或数字'
                                    }, {
                                        pattern: new RegExp('^\\w+$', 'g'),
                                        message: '必须为字母或数字啊'
                                    }
                                ]
                            })(
                                <Input prefix={< Icon type = "user" />} type="text" placeholder="请输入用户名"/>
                            )
                        }
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('pwd', {
                                rules: [
                                    {
                                        required: true,
                                        message: '密码不能为空'
                                    }, {
                                        min: 5,
                                        max: 12,
                                        message: '长度不在范围内，需要5-12'
                                    }
                                ]
                            })(
                                <Input prefix={< Icon type = "lock" />} type="password" placeholder="请输入密码"/>
                            )
                        }
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )
                            }
                            <a
                                href="#"
                                style={{
                                float: 'right'
                            }}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                        </FormItem>

                    </Form>
                </Card>
            </div>
        )
    }
}
const Loginform = Form.create()(FormLogin)
class Login extends React.Component {
    state = {}
    handleLoginSubmit = (token, userId) => {
        console.log(token, userId)
        const {dispatch} = this.props
        //登陆信息存入redux，根据redux判断登陆（缺点：刷新store会被重置。需改进，故同时将登录状态放入sessionStorage）
        dispatch(logIn(token, userId))
        localStorage.setItem('token',token)
    }
    render() {
        return (
            <div>
                <Loginform loginPush={(token, userId) => this.handleLoginSubmit(token, userId)}></Loginform>
            </div>
        )
    }
}
export default connect()(Login)