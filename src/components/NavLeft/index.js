import React from 'react'
import MenuConfig from './../../config/menuConfig'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './index.less'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class NavLeft extends React.Component {
    state={
        currentKey:'',
        collapsed: false,
    }
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig)
        let currentKey = [window.location.hash.replace(/#|\?.+$/g,'')]
        console.log(currentKey)
        this.setState({
            currentKey,
            menuTreeNode
        })
    }
    handleClick = ({item,key})=>{
        const { dispatch } = this.props
        //方法1：
        //  this.props.switchMenu(item.props.title)
        // 方法2：
        dispatch(switchMenu(item.props.title))
        // 类似于：
        // dispatch({
        //     type:'SWITCH_MENU',
        //     menuName:'首页'
        // })
        // dispatch会触发reducer，接受到状态后，返回新的状态
        this.setState({
            currentKey:[key]
        })
    }


// 菜单渲染
renderMenu = (data)=>{
    return data.map((item)=>{
        if (item.children) {
            let navName = <div>{item.icon?<Icon type={item.icon} />:null}<span>{item.title}</span></div>
            return (
                <SubMenu title={navName} key={item.key}>
                    {this.renderMenu(item.children)}
                </SubMenu>
            )
        }
        return <Menu.Item title={item.title} key={item.key}>
            <NavLink to={item.key}>{item.icon?<Icon type={item.icon} />:null}<span>{item.title}</span></NavLink>
        </Menu.Item>
    })
}
  render() {
    return (
         <div>
          <Menu
                // mode控制菜单的展示方式
                mode="inline"
                onClick={this.handleClick}
                theme="dark"
                selectedKeys={this.state.currentKey}
            >
                {this.state.menuTreeNode}
            </Menu></div>
    );
  }
}

export default connect()(NavLeft)


//伸缩左侧栏