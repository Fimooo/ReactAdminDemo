import React from 'react';
import { Card, Button, Table,Input,Radio, Form, Select, Modal, Tree, Transfer, message, DatePicker } from 'antd';
import axios from '../../axios/index';
import utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm'
import ETable from '../../components/ETable/index'
import Moment from 'moment'
import menuConfig from '../../config/menuConfig'
const RadioGroup = Radio.Group
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode

export default class User extends React.Component {
    state= {
        isVisible:false,
        isPermVisible:false,
        isUserVisible:false
    }
    componentWillMount(){
        axios.requestList(this,'/role/list',{},true)
    }
    //创建角色
    handleRole=()=>{
        this.setState({
            isVisible:true
        })
    }
    //角色提交
    handleSubmit=()=>{
        let data = this.userForm.props.form.getFieldsValue()
        axios.ajax({
            url:'/role/create',
            
            data:{
                isMock:true,
                params:data,
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isVisible:false
                })
                axios.requestList(this,'/role/list',{},true)
            }
        })
    }
    //权限设置
    handlePermission=()=>{
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                text:'请选择一条数据'
            })
            return;
        }
        this.setState({
            isPermVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }
    handlePermEditSubmit = ()=>{
        let data = this.permForm.props.form.getFieldsValue()
        data.role_id = this.state.selectedItem.id
        data.menu = this.state.menuInfo
        axios.ajax({
            url:'/permisson/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isPermVisible:false
                })
                axios.requestList(this,'/role/list',{},true)
            }
        })
    }
    //用户授权
    handleUserAuth = ()=>{
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                text:'请选择一条数据'
            })
            return;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
        this.getRoleUserList(item.id)
    }
    getRoleUserList = (id)=>{
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id
                }
            }
        }).then((res)=>{
            if(res.code==0){
                this.getAuthUserList(res.result)
            }
        })
    }
    //筛选目标用户
    getAuthUserList = (dataSource)=>{
        const mockData = []
        const targetKeys = []
        if(dataSource && dataSource.length>0){
            for(let i=0; i < dataSource.length; i++){
                const data={
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status,
                }
                if(data.status==1){
                    targetKeys.push(data.key)
                }
                mockData.push(data)

            }
        }
        this.setState({
            targetKeys,mockData
        })
    }

    handleUSerSubmit=()=>{
        let data = {}
        data.user_ids = this.state.targetKeys
        data.role_id = this.state.selectedItem.id
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code==0){
                this.setState({
                    isUserVisible:false
                })
                axios.requestList(this,'/role/list',{},true)
            }
        })
    }

    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                render: utils.formatTime
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: utils.formatTime
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>           
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst }/>
                </Modal>

                <Modal
                    title="设置权限"
                    visible={this.state.isPermVisible}
                    onOk={this.handlePermEditSubmit}
                    width={600}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isPermVisible:false
                        })
                    }}
                >
                    <Permission 
                        detailInfo={this.state.detailInfo} 
                        menuInfo={this.state.menuInfo}
                        wrappedComponentRef={(inst) => this.permForm = inst }
                        patchMenuInfo={(checkedKeys)=>{
                            this.setState({
                                menuInfo:checkedKeys
                            })
                        }}
                    />
                </Modal>

                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    onOk={this.handleUSerSubmit}
                    width={800}
                    onCancel={()=>{
                        this.chooseForm.props.form.resetFields();
                        this.setState({
                            isUserVisible:false
                        })
                    }}
                >
                    <ChooseFrom
                        detailInfo={this.state.detailInfo} 
                        mockData={this.state.mockData}
                        targetKeys={this.state.targetKeys}
                        wrappedComponentRef={(inst) => this.chooseForm = inst }
                        patchChange={(targetKeys)=>{
                            this.setState({
                                targetKeys:targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                        })(
                            <Input type="text" placeholder="请输入姓名"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                        })(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={2}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
              
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);

class Permission extends React.Component{
    renderTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }else{
                return  <TreeNode title={item.title} key={item.key} />
            }
        })
    }
    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys)
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const detail_info = this.props.detailInfo
        const menuInfo = this.props.menuInfo

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                        })(
                            <Input type="text" disabled placeholder={detail_info.role_name} />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                            inititalValue : '1'
                        })(
                        <Select>
                            <Option value='1'>开启</Option>
                            <Option value='0'>关闭</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    // 单向数据流，故如果子组件内有更改，则需将数据传回父组件，再由父组件传给子组件进行数据、渲染更改
                    onCheck={(checkedKeys)=>{
                        this.onCheck(checkedKeys)
                    }}
                    // 获取父组件传回来的权限列表,初始化
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}
Permission = Form.create({})(Permission);

class ChooseFrom extends React.Component{
    renderTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }else{
                return  <TreeNode title={item.title} key={item.key} />
            }
        })
    }
    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys)
    }
    handleChange=(targetKeys)=>{
        this.props.patchChange(targetKeys)
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const detail_info = this.props.detailInfo

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                            <Input type="text" disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                <Transfer
                listStyle={{width:200,height:400}}
                    dataSource={this.props.mockData}
                    titles={['待选用户','已选用户']}
                    showSearch
                    filterOption={this.filterOption}
                    targetKeys={this.props.targetKeys}
                    render={item=>item.title}
                    onChange={this.handleChange}
                /></FormItem>
            </Form>
        );
    }
}
ChooseFrom = Form.create({})(ChooseFrom);