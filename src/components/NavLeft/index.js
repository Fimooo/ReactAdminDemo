import React from 'react'
import MenuConfig from './../../config/menuConfig'
import './index.less'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import rootReducer from '../../redux/reducer'
import { createStore } from 'redux'
const store = createStore(rootReducer)
const { SubMenu } = Menu;
class NavLeft extends React.Component {
    state={
        currentKey:''
    }
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig)
        let currentKey = window.location.hash.replace(/#|\?.+$/g,'')
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
            currentKey:key
        })
    }
    // 菜单渲染
    renderMenu = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render() {
        return (<div>
            <div className="logo">
                <img src="/assets/logo192.png" alt="" />
                <h1>Fimo的</h1>
            </div>
            <Menu
                onClick={this.handleClick}
                theme="dark"
                selectedKeys={this.state.currentKey}
            >
                {this.state.menuTreeNode}
            </Menu>
        </div>)
    }
}

// 对应方法1：
// export default connect(null,{switchMenu})(NavLeft)
// 对应方法2：
export default connect()(NavLeft)