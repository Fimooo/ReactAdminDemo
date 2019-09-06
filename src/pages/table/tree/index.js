import React from 'react'
import { Table, Card, Modal, Button, message } from 'antd'
import './index.less'
import axios from './../../../axios'
import utils from './../../../utils/utils'
export default class Header extends React.Component {
    state = {
        dataSource: [],

    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request()
    }
    onRowClick = (record, index) => {
        let selectKey = [index]
        console.log(record)
        Modal.info({
            title: '信息',
            content: `${record.id}叫${record.userName}喜欢${record.hobby}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectItem: record
        })
    }

    request = () => {
        let _this = this
        axios.ajax({
            url: '/table/treeList',
            data: {
                params: {
                    // page更改无需渲染dom，无需放入state
                    page: this.params.page
                },
                isLoading: true
            },
        }).then((res) => {
            if (res.code == '0') {
                // res.result.list.map((item, index) => {
                //     item.key = index
                // })
                this.setState({
                    dataSource2: res.result.item_list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: utils.pagination(res, (current) => {
                        _this.params.page = current
                        this.request()
                    })
                })
            }
        })
    }
    handleDelete = (record) => {
        console.log(record)
        Modal.confirm({
            title: '提示',
            content: `确定要删除${record.id}吗？`,
            onOk: () => {
                message.success('删除成功')
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title: "id",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "userName"
            },
            {
                title: "性别",
                dataIndex: "sex",
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    let config = {
                        '1': '完成',
                        '2': '未完成',
                        '3': '进行中',
                        '4': '已废弃'
                    }
                    return state == 1 ? '完成' : '未完成'
                }
            },
            {
                title: "爱好",
                dataIndex: "hobby",
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '看书',
                        '3': '旅游',
                        '4': '电影',
                        '5': '睡觉',
                        '6': '写作',
                        '7': '跳舞'
                    }
                    return config[abc]
                }
            },
            {
                title: "时间",
                dataIndex: "time"
            }, {
                title: "操作",
                render: (text, record) => {
                    // console.log(item)
                    // 不加{}是直接return，加了{}是执行
                    return <div>
                        <Button
                            size="small"
                            onClick={
                                () => {
                                    this.handleDelete(record)
                                }
                            }>删除
                        </Button>
                        <Button
                            size="small"
                            onClick={
                                () => {
                                    this.handleAdd(record)
                                }
                            }>新增
                        </Button>
                        <Button
                            size="small"
                            onClick={
                                () => {
                                    this.handleUp(record)
                                }
                            }>上移
                        </Button>
                        <Button
                            size="small"
                            onClick={
                                () => {
                                    this.handleDown(record)
                                }
                            }>下移
                        </Button>
                    </div>

                }
            }
        ]
        return (<div>

            <Card title="动态渲染表格-Mock">
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={true}
                    onRow={(record,index)=>{
                        return {
                            onClick:()=>{
                                this.onRowClick(record,index)
                            }
                        }
                    }}
                />
            </Card>
        </div>)
    }
}