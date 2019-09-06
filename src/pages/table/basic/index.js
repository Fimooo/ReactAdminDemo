import React from 'react'
import { Table,Card, Modal, Button, message } from 'antd'
import './index.less'
import axios from './../../../axios'
import utils from './../../../utils/utils'
export default class Header extends React.Component{
    state = {
        dataSource:[],
        
    }
    params = {
        page:1
    }
    componentDidMount(){
        const data = [
            {
                id:0,
                userName:"scl",
                sex:"1",
                state:"状态不好",
                time:"2019-08-08",
                hobby:"游泳"
            },
            {
                id:1,
                userName:"scl",
                sex:"1",
                state:"状态不好",
                time:"2019-08-08",
                hobby:"游泳"
            },
            {
                id:2,
                userName:"scl",
                sex:"1",
                state:"状态不好",
                time:"2019-08-08",
                hobby:"游泳"
            },
            {
                id:3,
                userName:"scl",
                sex:"1",
                state:"状态不好",
                time:"2019-08-08",
                hobby:"游泳"
            },
            {
                id:4,
                userName:"scl",
                sex:"1",
                state:"状态不好",
                time:"2019-08-08",
                hobby:"游泳"
            },
            {
                id:5,
                userName:"scl",
                sex:"1",
                state:"状态不好",
                time:"2019-08-08",
                hobby:"游泳"
            }
        ]
        data.map((item,index)=>{item.key=index})
        this.setState({
            dataSource:data
        })
        this.request()
    }
    onRowClick= (record,index)=>{
        let selectKey = [index]
        Modal.info({
            title:'信息',
            content:`${record.id}叫${record.userName}喜欢${record.hobby}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectItem:record
        })
    }

    request = () => {
        let _this = this
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    // page更改无需渲染dom，无需放入state
                    page:this.params.page
                },
                isLoading:true
            },
        }).then((res)=>{
            if(res.code=='0'){
                res.result.list.map((item,index)=>{
                    item.key = index
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:utils.pagination(res,(current)=>{
                        _this.params.page = current
                        this.request()
                    })
                })
            }
        })
    }
    handleDelete = ()=>{
        let rows = this.state.selectedRows
        let ids = []
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'提示',
            content:`确定要删除${ids.join(',')}吗？`,
            onOk:()=>{
                message.success('删除成功')
                this.request();
            }
        })
    }
    render(){
        const columns = [
            {
                title:"id",
                dataIndex:"id"
            },
            {
                title:"用户名",
                dataIndex:"userName"
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title:"状态",
                dataIndex:"state",
                render(state){
                    let config = {
                        '1':'完成',
                        '2':'未完成',
                        '3':'进行中',
                        '4':'已废弃'
                    }
                    return state == 1 ? '完成' : '未完成'
                }
            },
            {
                title:"爱好",
                dataIndex:"hobby",
                render(abc){
                    let config = {
                        '1':'游泳',
                        '2':'看书',
                        '3':'旅游',
                        '4':'电影',
                        '5':'睡觉',
                        '6':'写作',
                        '7':'跳舞'
                    }
                    return config[abc]
                }
            },
            {
                title:"时间",
                dataIndex:"time"
            }
        ]
        const rowSelection = {
            type:'radio',
            selectedRowKeys:this.state.selectedRowKeys
        }
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys:this.state.selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                let ids = []
                selectedRows.map((item)=>{
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedIds:ids,
                    selectedRows
                })
            }
        }
        return (<div>
            <Card title="基础表格">
                <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                />
            </Card>
            <Card title="动态渲染表格-Mock">
                <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={true}
                />
            </Card>
            <Card title="Mock-单选">
                <Table 
                    bordered
                    onRow={(record,index)=>{
                        return {
                            onClick:()=>{
                                this.onRowClick(record,index)
                            }
                        }
                    }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={true}
                />
            </Card>
            <Card title="Mock-多选">
                <Button style={{marginBottom:10}} type="primary" onClick={this.handleDelete}>删除</Button>
                <Table 
                    bordered
                    onRow={(record,index)=>{
                        return {
                            onClick:()=>{
                                this.onRowClick(record,index)
                            }
                        }
                    }}
                    rowSelection={rowCheckSelection}
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={true}
                />
            </Card>
            <Card title="Mock-分页">
                <Button style={{marginBottom:10}} type="primary" onClick={this.handleDelete}>删除</Button>
                <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={this.state.pagination}
                />
            </Card>
        </div>)
    }
}