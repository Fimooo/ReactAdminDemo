import React from 'react'
import { Table,Card, Modal, Button, message,Badge } from 'antd'
import './index.less'
import axios from './../../../axios'
import utils from './../../../utils/utils'
export default class Header extends React.Component{
    state = {
        dataSource:[]
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.request()
    }
    handleChange = (pagination,filters,sorter)=>{
        this.setState({
            sortOrder:sorter.order
        })
    }
    handleDelete = ( item ) => {
        let id = item.id
        Modal.confirm({
            title:"确定要删除吗？",
            content:`确定要删除${id}吗？`,
            onOk:()=>{
                message.success('删除成功')
                this.request()
            }
        })
    }
    request = () => {
        let _this = this
        axios.ajax({
            url:'/table/sort',
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
    render(){
        const columns = [
            {
                title:"id",
                dataIndex:"id",
                width:80
            },
            {
                title:"用户名",
                dataIndex:"userName",
                width:80
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex == 1 ? '男' : '女'
                },
                width:80
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
                },
                width:80
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
                },
                width:80
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            }
        ]
        const columns2 = [
            {
                title:"id",
                dataIndex:"id",
                width:80,
                fixed:'left'
            },
            {
                title:"用户名",
                dataIndex:"userName",
                width:80,
                fixed:'left'
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex == 1 ? '男' : '女'
                },
                width:80
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
                },
                width:80
            },
            
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },{
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
                },
                width:80,
                fixed:'right'
            }
        ]
        columns2.map((item,index)=>{
            item.key = index
        })
        const columns3 = [
            {
                title:"id",
                dataIndex:"id",
                width:80
            },
            {
                title:"用户名",
                dataIndex:"userName",
                width:80
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex == 1 ? '男' : '女'
                },
                width:80
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
                },
                width:80
            },
            {
                title:'年龄',
                dataIndex:'age',
                width:80,
                sorter:(a,b)=>{
                    return a.age - b.age
                },
                sortOrder:this.state.sortOrder
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
                },
                width:80
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            }
        ]
        const columns4 = [
            {
                title:"id",
                dataIndex:"id",
                width:80
            },
            {
                title:"用户名",
                dataIndex:"userName",
                width:80
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex == 1 ? '男' : '女'
                },
                width:80
            },
            {
                title:"状态",
                dataIndex:"state",
                render(state){
                    let config = {
                        '1':<Badge status="success" text="完成" />,
                        '2':<Badge status="success" text="未完成" />,
                        '3':<Badge status="success" text="进行中" />,
                        '4':<Badge status="success" text="已废弃" />
                    }
                    return state == 1 ? '完成' : '未完成'
                },
                width:80
            },
            {
                title:'年龄',
                dataIndex:'age',
                width:80,
                sorter:(a,b)=>{
                    return a.age - b.age
                },
                sortOrder:this.state.sortOrder
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
                },
                width:80
            },
            {
                title:"时间",
                dataIndex:"time",
                width:120
            },
            {
                title:"操作",
                render:(text,record)=>{
                    // console.log(item)
                    // 不加{}是直接return，加了{}是执行
                    return <Button 
                    size="small" 
                    onClick={
                        ()=>{
                            this.handleDelete(record)
                        }
                    }>删除</Button>
                }
            }
        ]
        return (<div>
        {/* 设定表格列宽可使表格在有滚动条时对齐 */}
            <Card title="头部固定">
                <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={false}
                    scroll={{y:240}}
                />
            </Card>
            <Card title="两侧固定">
                <Table 
                    bordered
                    columns={columns2}
                    dataSource={this.state.dataSource2}
                    pagination={true}
                    scroll={{x:3600}}
                />
            </Card>
            <Card title="表格排序">
                <Table 
                    bordered
                    columns={columns3}
                    dataSource={this.state.dataSource2}
                    pagination={true}
                    onChange={this.handleChange}
                />
            </Card>
            <Card title="表格图标">
                <Table 
                    bordered
                    columns={columns4}
                    dataSource={this.state.dataSource2}
                    pagination={true}
                />
            </Card>
        </div>)
    }
}