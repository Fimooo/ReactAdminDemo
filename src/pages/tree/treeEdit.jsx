/**
 * 内容：可增、删、改的树结构
 * 父组件需传入子组件的参数：
 * 1、treeData(构建树的数据)
 * 2、handleTreeDelete(item)、handleTreeAdd(item)、handleTreeEdit(item)
 *    在父组件内通过以上函数实现增、删、改个性化处理（item为当前所选中的树层级）
 * coder：小沈
 * time：2019-09-16
 */

import React, {Component} from 'react'
import {
    Icon,
    Tree,
    Popover
} from 'antd'
const {TreeNode} = Tree

export default class TreeEdit extends React.Component {
    handleDelete = (item)=>{
        // console.log(item,'del+')
        this.props.handleTreeDelete(item)
    }

    handleAdd = (item)=>{
        // console.log(item,'add+')
        this.props.handleTreeAdd(item)
    }

    handleEdit = (item)=>{
        // console.log(item,'edit+')
        this.props.handleTreeEdit(item)
    }
    state = {
        selectedKeys: []
    }
    onSelect = (selectedKeys, info) => {
        this.setState({selectedKeys});
    };
    renderTreeNode = data => data.map(item => {
        if (item.children) {
            return (
                <TreeNode
                    title={<Popover 
                                overlayClassName = "legalTreeProjectManagePop" 
                                placement = "rightTop" 
                                content = { <div className = "fr" > 
                                    <a className="fr mr10 red"><Icon type="delete" onClick={()=>this.handleDelete(item)} title="删除"/></a> 
                                    <a className = "fr mr10 green"><Icon type="plus" onClick={()=>this.handleAdd(item)} title="新增"/></a>
                                    <a className="fr mr10"><Icon type="edit" onClick={()=>this.handleEdit(item)} title="编辑"/> </a> 
                                </div>} 
                                trigger="click"
                            > 
                                {item.title} 
                            </Popover>
                            }
                    key={item.key}
                    >
                    {this.renderTreeNode(item.children)}
                </TreeNode>
            )
        }
        return (
            <TreeNode
                key={item.key}
                title={<Popover 
                    overlayClassName = "legalTreeProjectManagePop" 
                    placement = "rightTop" 
                    content = { <div className = "fr" > 
                        <a className="fr mr10 red"><Icon type="delete" onClick={()=>this.handleDelete(item)} title="删除"/></a> 
                        <a className = "fr mr10 green"><Icon type="plus" onClick={()=>this.handleAdd(item)} title="新增"/></a>
                        <a className="fr mr10"><Icon type="edit" onClick={()=>this.handleEdit(item)} title="编辑"/> </a> 
                    </div>} 
                    trigger="click"
                > 
                    {item.title} 
                </Popover>
                }
            >
            </TreeNode>
        )
    })
    render() {
        return (
            <div>
                <Tree className="legalTreeProjectManage" onSelect={this.onSelect}>
                    {this.renderTreeNode(this.props.treeData)}
                </Tree>
            </div>
        )
    }
}