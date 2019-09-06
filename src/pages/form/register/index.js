import React from 'react'
import { Card, Form, Button, Input, Modal, message, Icon, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, InputNumber } from 'antd'
import './index.less'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea
class FormRegister extends React.Component {
    state = {
        userImg: '',
        previewVisible: false,
        previewImage: '',
    }
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
            }else{
                console.log(err)
            }
        })

    }
    handleReset = () => {
        this.props.form.resetFields();
    }
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        const textrow = { minRows: 4, maxRows: 6 }
        return (<div>
            <Card title="注册表单" style={{ marginTop: 10 }}>
                <Form>
                    <FormItem label="用户名" {...formItemLayout}>
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
                    <FormItem label="密码" {...formItemLayout}>
                        {
                            getFieldDecorator('pwd', {

                                rules: [
                                    {
                                        required: true,
                                        message: "请输入密码"
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                            )
                        }
                    </FormItem>
                    <FormItem label="性别" {...formItemLayout}>
                        {
                            getFieldDecorator('sex', {
                                initialValue: '0'
                            })(
                                <RadioGroup>
                                    <Radio value="0">男</Radio>
                                    <Radio value="1">女</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem label="年龄" {...formItemLayout}>
                        {
                            getFieldDecorator('age', {
                                initialValue: 18
                            })(
                                <InputNumber />
                            )
                        }
                    </FormItem>
                    <FormItem label="当前状态" {...formItemLayout}>
                        {
                            getFieldDecorator('state', {
                                initialValue: '2'
                            })(
                                <Select>
                                    <Option value="0">状态不好</Option>
                                    <Option value="1">状态一般</Option>
                                    <Option value="2">状态略差</Option>
                                    <Option value="3">状态好</Option>
                                    <Option value="4">状态优秀</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="爱好" {...formItemLayout}>
                        {
                            getFieldDecorator('hobby', {
                                initialValue: ['2', '4']
                            })(
                                <Select mode="multiple">
                                    <Option value="0">游泳</Option>
                                    <Option value="1">跑步</Option>
                                    <Option value="2">爬山</Option>
                                    <Option value="3">骑马</Option>
                                    <Option value="4">旅游</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="是否已婚" {...formItemLayout}>
                        {
                            getFieldDecorator('married', {
                                initialValue: true,
                                valuePropName: 'checked'
                            })(
                                <Switch />
                            )
                        }
                    </FormItem>
                    <FormItem label="生日" {...formItemLayout}>
                        {
                            getFieldDecorator('birthday', {
                                initialValue: moment('2018-08-08 12:12:12')
                            })(
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="联系地址" {...formItemLayout}>
                        {
                            getFieldDecorator('address', {
                                initialValue: '浙江省杭州市江干区'
                            })(
                                <TextArea
                                    autosize={textrow}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem label="早起时间" {...formItemLayout}>
                        {
                            getFieldDecorator('time', {
                            })(
                                <TimePicker />
                            )
                        }
                    </FormItem>
                    <FormItem label="头像" {...formItemLayout}>
                        {
                            getFieldDecorator('userImg', {
                            })(
                                <Upload
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    listType="picture-card"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                >
                                    {this.state.userImg ? <img src={this.state.userImg}></img> : <Icon type="plus"></Icon>}
                                </Upload>

                            )
                        }

                    </FormItem>
                    <FormItem {...offsetLayout}>
                        {
                            getFieldDecorator('icCheck', {

                            })(
                               <Checkbox>我已经阅读过<a href="#">本平台协议</a></Checkbox>
                            )
                        }

                    </FormItem>
                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                    </Modal>
                    <FormItem {...offsetLayout}>
                        <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        <Button type="primary" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>)
    }
}
export default Form.create()(FormRegister);