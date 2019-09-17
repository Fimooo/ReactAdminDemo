import React from 'react'
import {
    Card,
    Icon,
    Tree
} from 'antd'
import './index.less'
import TreeEdit from './treeEdit'
const { TreeNode } = Tree
const treeData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];
export default class Login extends React.Component {
    state = {
        showIcon:true,
        selectedKeys:[]
    }
    handleTreeAdd = (item)=>{
      //树新增
      console.log(item,'add')
    }
    handleTreeDelete = (item)=>{
        //树删除
        console.log(item,'del')
    }

    handleTreeEdit = (item)=>{
        //树编辑
        console.log(item,'edit')
    }
    onSelect = (selectedKeys, info) => {
        this.setState({ selectedKeys });
      };
    renderTreeNode = data =>
        data.map(item=>{
            if(item.children){
                return (<TreeNode 
                title={item.title} 
                key={item.key}
                icon={({selectd})=>{
                            return (<div>
                            <a className="fr mr10 red"><Icon type="delete" /></a>
                            <a className="fr mr10 green"><Icon type="plus" /></a>
                            <a className="fr mr10"><Icon type="edit" /></a>
                            </div>)
                        }}
                >
                    {this.renderTreeNode(item.children)}
                </TreeNode>)
            }
            return (<TreeNode 
                        key={item.key} 
                        title={item.title} 
                        icon={({selectd})=>{
                            return (<div>
                            <a className="fr mr10 red"><Icon type="delete" /></a>
                            <a className="fr mr10 green"><Icon type="plus" /></a>
                            <a className="fr mr10"><Icon type="edit" /></a>
                            </div>)
                        }}
                    />)
        })
    render() {
        return (
            <div>
                <Card title="树结构-多功能">
                    <Tree 
                        showIcon={this.state.showIcon}
                        onSelect={this.onSelect}
                    >
                       {this.renderTreeNode(treeData)}
                    </Tree>
                </Card>
                <Card title="树结构-点击进入-多功能">
                    <TreeEdit treeData={treeData} handleTreeAdd={this.handleTreeAdd} handleTreeDelete={this.handleTreeDelete} handleTreeEdit={this.handleTreeEdit}></TreeEdit>
                </Card>
            </div>
        )
    }
}
