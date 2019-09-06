import React from 'react'
import { Card,Button, Tabs, message,Icon } from 'antd'
// import './index.less'
const TabPane = Tabs.TabPane
export default class Modals extends React.Component{
    newTabIndex = 0
    constructor(props){
        super(props)
    }
    handleCallback=(key)=>{
        message.success("come on"+key+"！")
    }
    componentWillMount(){
        const panes = [
            {
                title:"Tab1",
                content:"Tab Content",
                key:'1'
            },
            {
                title:"Tab2",
                content:"Tab Content",
                key:'2'
            },
            {
                title:"Tab3",
                content:"Tab Content",
                key:'3'
            }
        ]
        this.setState({
            panes,
            activeKey:panes[0].key
        })
    }
    onChange=(activeKey)=>{
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    
    render(){
        return (<div>
            <Card title="Tab页签">
                <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                    <TabPane tab="Tab 1" key="1">A</TabPane>
                    <TabPane tab="Tab 2" key="2">B</TabPane>
                    <TabPane tab="Tab 3" key="3" disabled>C</TabPane>
                    <TabPane tab="Tab 4" key="4">D</TabPane>
                </Tabs>
            </Card>
            <Card title="Tab带图表页签">
                <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                    <TabPane tab={<span><Icon type="plus" />A</span>} key="1">A</TabPane>
                    <TabPane tab={<span><Icon type="edit" />B</span>} key="2">B</TabPane>
                    <TabPane tab={<span><Icon type="delete" />C</span>} key="3">C</TabPane>
                    <TabPane tab={<span><Icon type="search" />D</span>} key="4">D</TabPane>
                </Tabs>
            </Card>
            <Card title="动态Tab">
                <Tabs 
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    add={this.add}
                >
                    {
                        this.state.panes.map((pane)=>{
                            return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
                        })
                    }
                </Tabs>
            </Card>
        </div>)
    }
}