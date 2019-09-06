import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd';
import axios from '../../axios/index';
import utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component{

    state = {
        list:[],
        isShowOpenCity:false
    }
    params = {
        page:1
    }
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    handleFilter = (params)=>{
        this.params = params
        this.requestList()
    }
    handleDetail = ()=>{
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择一条订单'
            })
            return;
        }
        window.open('#/common/order/detail/2665','_blank')
        // window.location.href = '#/common/order/detail/2665'
    }
    componentDidMount(){
       this.requestList()
    }
    handleSubmit = ()=>{
        let cityInfo = this.cityForm.props.form.getFieldsValue()
        axios.ajax({
            url:'/city/open'
        }).then((res)=>{
            this.setState({
                isShowOpenCity:false
            })
            if(res.code=='0'){
                message.success(res.result)
                this.requestList()
            }
        })
    }

    // 默认请求我们的接口数据
    requestList = ()=>{
        let _this = this
        axios.requestList(this,'/order/list',this.params,true)
        // axios.ajax({
        //     url:'/order/list',
        //     data:{
        //         params:{
        //             page:this.params
        //         },
        //         isLoading:true
        //     }
        // }).then((res)=>{
        //     if(res.code==0){
        //         this.setState({
        //             list:res.result.item_list.map((item,index)=>{
        //                 item.key = index
        //                 return item
        //             }),
        //             pagination:utils.pagination(res,(current)=>{
        //                 _this.params.page = current
        //                 _this.requestList()
        //             })
        //         })
        //     }
        // })
    }

    // 开通城市
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
    onRowClick= (record,index)=>{
        let selectKey = [index]
        Modal.info({
            title:'信息',
            content:`选中${record.id}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            }, {
                title: '车俩编号',
                dataIndex: 'bike_sn'
            }, {
                title: '用户ID',
                dataIndex: 'user_id'
            }, {
                title: '用户名',
                dataIndex: 'user_name'
            }, {
                title: '手机',
                dataIndex: 'mobile'
            }, {
                title: '距离',
                dataIndex: 'total_time'
            }, {
                title: '时长',
                dataIndex: 'distance'
            }, {
                title: '开始时间',
                dataIndex: 'start_time',
                render: utils.formateDate
            },{
                title: '结束时间',
                dataIndex: 'end_time',
                render: utils.formateDate
            }, 
            {
                title: '状态',
                dataIndex: 'status',
                render(status) {
                    return status == 1 ? '自营' : '加盟';
                }
            },
            {
                title: '总计',
                dataIndex: 'total_fee'
            },{
                title: '最终支付',
                dataIndex: 'user_pay'
            },
        ]
        const rowSelection = {
            type:'radio',
            selectedRowKeys:this.state.selectedRowKeys
        }
        
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleEnd}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        rowSelection={rowSelection}
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record,index)=>{
                        return {
                            onClick:()=>{
                                this.onRowClick(record,index)
                            }
                        }
                    }}
                    />
                </div>
            </div>
        );
    }
}