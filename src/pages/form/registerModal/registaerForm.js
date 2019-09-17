import React from 'react'
import { Card, Form, Button, Input, Modal, message, Icon, Checkbox, Radio, Cascader, Select, Switch, DatePicker, TimePicker, Upload, InputNumber } from 'antd'
import './index.less'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea
const legalType = [
    {
      value: 'zhejiang',
      label: '法律法规',
      children: [
        {
          value: 'hangzhou11',
          label: '法律',
        },
        {
            value: 'hangzhou1',
            label: '行政法规',
          },
          {
            value: 'hangzhou2',
            label: '地方性法规',
          },
          {
            value: 'hangzhou3',
            label: '部门规章',
          },
          {
            value: 'hangzhou4',
            label: '规范性文件',
          }
      ],
    },
    {
      value: 'jiangsu',
      label: '标准',
      children: [
        {
          value: 'nanjing',
          label: '国家标准',
        },
        {
            value: 'nanjing1',
            label: '行业标准',
          },
          {
            value: 'nanjing2',
            label: '国际标准',
          },
          {
            value: 'nanjing3',
            label: '地方标准',
          }
      ],
    },
    {
        value: 'jiangsu2',
        label: '解读'
      }
  ];
class FormRegister extends React.Component {
    state = {
        userImg: '',
        previewVisible: false,
        previewImage: '',
    }
    handleFilters = ()=>{
        return this.props.form.getFieldsValue();
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
    handleCheckedChange = (value)=>{
        console.log(`selected ${value}`);
      }
    onCheckboxdChange = (e,type) => {
        console.log('checked = ', e.target.checked);
        console.log('type = ', type);
        let val = []
        switch (type) {
            case 'replace':
                val = 'isReplaceChecked'
                break;
            case 'allReplace':
                val = 'isAllReplaceChecked' 
                break;
            case 'replaced':
                val = 'isReplacedChecked' 
                break;
            case 'edit':
                val = 'isEditChecked' 
                break;
            case 'edited':
                val = 'isEditedChecked' 
                break;
            default:
                break;
        }
        this.setState({
            [val]:e.target.checked
        })
      }
    handleChange = ({ fileList }) => this.setState({ fileList });
    onLegalCascaderChange = (value,selectOptions) =>{
        console.log(value,'value')
        console.log(selectOptions,'selectOptions')
        if(selectOptions[0].label === '解读'){
            
        }else{
        }
      }
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
        const children = [];
          for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
          }
          let _this = this
          const uploadProps = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {},
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                _this.props.form.setFieldsValue({fileName:info.file.name})   //上传完成后自动填充文件名
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };
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
                    <Form.Item label="法律效力" {...formItemLayout}>
                        {getFieldDecorator('legal', {
                            //initialValue: [' ', ' ', ' '],
                            rules: [
                                { 
                                    type: 'array',
                                    required: true,
                                    message: '请选择法律效力' },
                            ],
                        })(<Cascader options={legalType} onChange={this.onLegalCascaderChange}/>)}
                    </Form.Item>
                    <FormItem label="代替修订" {...formItemLayout}>
                                <FormItem>
                                    <Checkbox
                                        checked={this.state.isAllReplaceChecked}
                                        onChange={(e)=>this.onCheckboxdChange(e,'allReplace')}
                                    ></Checkbox><span  className="ml10">代替</span>
                                    {
                                        getFieldDecorator('birthday11')(
                                            <Select disabled={!this.state.isAllReplaceChecked} className="w300 ml10" mode="tags"  placeholder="请选择" onChange={this.handleCheckedChange}>
                                                {children}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    <Checkbox
                                        checked={this.state.isReplaceChecked}
                                        onChange={(e)=>this.onCheckboxdChange(e,'replace')}
                                    ></Checkbox><span  className="ml5">部分代替</span>
                                    {
                                        getFieldDecorator('birthday12')(
                                            <Select disabled={!this.state.isReplaceChecked} className="w300 ml10" mode="tags"  placeholder="请选择" onChange={this.handleCheckedChange}>
                                                {children}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    <Checkbox
                                        checked={this.state.isReplacedChecked}
                                        onChange={(e)=>this.onCheckboxdChange(e,'replaced')}
                                    ></Checkbox><span  className="ml5">被</span>
                                    {
                                        getFieldDecorator('birthday13')(
                                            <Select disabled={!this.state.isReplacedChecked} className="w300 ml10" mode="tags"  placeholder="请选择" onChange={this.handleCheckedChange}>
                                                {children}
                                            </Select>
                                        )
                                    }<span  className="ml5">代替</span>
                                </FormItem>
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
                    <FormItem label="解读文件" {...formItemLayout}>
                    <Upload {...uploadProps}>
                        <Button>
                        <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
                    </FormItem>
                    <FormItem label="文件名" {...formItemLayout}>
                        {
                            getFieldDecorator('fileName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入文件名'
                                    }
                                ]
                            })(
                                <Input type="text" placeholder="请输入文件名" />
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
                </Form>
            </Card>
        </div>)
    }
}
export default Form.create()(FormRegister);