import React from 'react'
import './index.less'
import utils from '../../utils/utils'
import { Input, Select, Form, Button, Radio, Checkbox,DatePicker } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class BaseForm extends React.Component{
    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue()
        this.props.filterSubmit(fieldsValue)
    }
    handleReset = ()=>{
        this.props.form.resetFields();
    }
    initFormList = ()=>{
        const { getFieldDecorator } = this.props.form    //数据双向绑定
        const formList = this.props.formList
        const formListItem = []
        if(formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label
                let field = item.field
                let initialValue = item.initialValue || ''
                let placeholder = item.placeholder
                let width = item.width
                if (item.type == '时间查询'){
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    formListItem.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field+'end'}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formListItem.push(end_time)
                }else if(item.type == 'INPUT'){
                    const INPUT = <FormItem
                        label={label}
                        key={field}
                    >
                    {
                        getFieldDecorator([field],{
                            initialValue:initialValue
                        })(
                            <Input type="text"/>
                        )
                        
                    }
                    </FormItem>
                    formListItem.push(INPUT)
                }else if(item.type == 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{ width: width }}
                                    placeholder={placeholder}
                                >
                                    {utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formListItem.push(SELECT)
                }else if(item.type == 'DATE'){
                    const CHECKBOX = <FormItem
                        label={label}
                        key={field}
                    >
                    {
                        getFieldDecorator([field], {
                                //initialValue: moment('2018-08-08 12:12:12')
                            })(
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={placeholder}
                                />
                            )
                    }
                    </FormItem>
                    formListItem.push(CHECKBOX)
                }else if(item.type == 'CHECKBOX'){
                    const CHECKBOX = <FormItem
                        label={label}
                        key={field}
                    >
                    {
                        getFieldDecorator([field])(
                            <Checkbox>
                                {label}
                            </Checkbox>
                        )
                    }
                    </FormItem>
                    formListItem.push(CHECKBOX)
                }
            })
        }
        return formListItem
    }
    render(){
        return (<Form layout="inline">
            {this.initFormList()}
            <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </FormItem>
        </Form>)
    }
}

export default Form.create({})(BaseForm)