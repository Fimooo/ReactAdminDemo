import React from 'react'
import { Row, Col, Icon, Dropdown, Menu } from 'antd'
import './index.less'
import Utils from '../../utils/utils'
import axios from '../../axios'
import { logOut } from './../../redux/action'
import { connect } from 'react-redux'
const list = {
    "code": 0,
    "data": {
        "result": [
            {
                "id": "1",
                "title": "待处理事项",
                "message": "大搜车 无数大搜车 无数大搜车 无数大搜车 无数大搜车 无数大据校验，正常mock功能有固定的前缀和后面自定义的uri ，没有对于传入参数的配置，只有返回值的配置注意:为了更好的使用上面缺失功能, 我基于源码给加上了测试地",
                "time": "2019-09-09"
            }, {
                "id": "2",
                "title": "待处理事项",
                "message": "而这个icon图标我是绝对定位到日期内容框中的，它的图层维度是高于日期内容框的，点击icon图标时是不会响应点击事件的。我的第一个反应是事件点击穿透，但是该怎么实现？感觉触碰到我一直忽视的知识盲区了。懵逼的我一顿操作猛如虎，开启面向谷歌编程大法…事实证明科学上网很重要，谷歌精准  百度精准，再次吐槽百度的广告…为了解决被icon图标遮盖住的内容框区域也能响应点击事件，可以使用",
                "time": "2019-09-09"
            }, {
                "id": "3",
                "title": "待处理事项",
                "message": "easy-mock 大搜车 无数据校验，正常mock功能，有固定的前缀和后面自定义的uri ，没有对于传入参数的配置，只有返回值的配注意:为了更好的使用上面缺失功能, 我基于源码给加上了测试地址: ",
                "time": "2019-09-09"
            }, {
                "id": "4",
                "title": "待处理事项",
                "message": "永远不会成为鼠标事件的 target。但是，当其后代元素的 pointer-events 属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶触发父 ",
                "time": "2019-09-09"
            }, {
                "id": "5",
                "title": "待处理事项",
                "message": "百度地图JavaScript API是一套由JavaScript语言编写的应用程序接口，可帮助您在网站中构建功能丰富、交互性强的地图应用，支持PC端和移动端基于浏览器的地图应用开发，且支持HTML5特性的地图开发。百度地图JavaScript API支持HTTP和HTTPS，免费对外开放，可直接使用。接口使用无次数限制。在使用前，您需先申请密钥（ak）才可使用。在您使用百度 ",
                "time": "2019-09-09"
            }, {
                "id": "6",
                "title": "待处理事项",
                "message": "百度地图JavaScript API是一套由JavaScript语言编写的应用程序接口，可帮助您在网站中构建功能丰富、交互性强的地图应用，支持PC端和移动端基于浏览器的地图应用开发，且支持HTML5特性的地图开发。百度地图JavaScript API支持HTTP和HTTPS，免费对外开放，可直接使用。接口使用无次数限制。在使用前，您需先申请密钥（ak）才可使用。在您使用百度",
                "time": "2019-09-09"
            }
        ]
    }
}
class Header extends React.Component {
    state = {
        dropmenu: {},
        menuList: []
    }
    componentWillMount() {
        this.setState({
            userName: 'Fimo'
        })
        setInterval(() => {
            let time = Utils.formateDate(new Date())
            this.setState({
                time
            })
        }, 1000)
        this.getWeatherAPIDate()
        this.getMenus()
    }
    getWeatherAPIDate() {
        let city = 'beijing'
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            if (res.status == 'success') {
                let data = res.results[0].weather_data[0]
                this.setState({
                    weatherPic: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }
    handleRemove = (id) => {
        console.log(id)
    }
    getMenus = () => {
        //获取API数据
        this.state.dropmenu = list
        //前端移除，需要把数据放入state，后台移除则不用
        if (this.state.dropmenu.code == 0) {
            this.state.dropmenu.data.result.map((item, index) => {
                this.state.menuList.push(
                    <Menu.Item key={item.id} style={{ overflow: 'hidden' }}>
                        <a href="#" onClick={() => this.handleRemove(item.id)} style={{ wudth: '100%', display: 'inline-block', float: 'right', poniterEvents: 'none' }}><Icon type="close"></Icon></a>
                        <h4>{item.title}</h4>
                        <a href="http://www.alipay.com/" style={{ display: 'inline-block' }}>
                            {item.message.length > 30 ? item.message.replace(item.message.slice(30), '...') : item.message}
                            <p>时间：{item.time}</p>
                        </a>
                    </Menu.Item>)
            })
        }
    }
    handleLogOut = ()=>{
        //清空localstorage的token
        localStorage.removeItem('token')
        //清空redux
        let { dispatch } = this.props
        dispatch(logOut())
    }
    render() {
        const menu = (
            <Menu className="header-drop">
                {this.state.menuList}
            </Menu>
        );
        const menuType = this.props.menuType
        return (<div className="header">
            <Row className="header-top">
                {
                    menuType
                        ?
                        <Col span={6} className="logo">
                            <img src="/logo192.png" alt="" />
                            <span>IMooc 通用管理系统</span>
                        </Col>
                        : ''
                }
                <Col span={menuType ? 18 : 24}>
                    <Dropdown overlay={menu} trigger={['hover', 'click']}>
                        <a className="ant-dropdown-link" href="#">
                            <Icon type="bell" style={{ fontSize: 20, marginRight: 20 }}></Icon>
                        </a>
                    </Dropdown>
                    <span>欢迎，{this.state.userName}</span>
                    <a href="#" onClick={this.handleLogOut}>退出</a>
                </Col>
            </Row>
            {
                menuType ? '' :
                    <Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            {console.log(this.props)}
                            {this.props.menuName || ''}
                        </Col>
                        <Col span={20} className="weather">
                            <span className="systime">{this.state.time}</span>
                            <span>
                                <img src={this.state.weatherPic} />
                                {this.state.weather}
                            </span>
                        </Col>
                    </Row>
            }
        </div>)
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    // return {
    //     menuName:state.menuName
    // }
    // 不行的原因可能是：数据点击的异步操作，未赋予初始值
    // 其实state.menuName在点击后是存在的
    return {
        menuName: state ? state.menuName : '首页'
    }
}
export default connect(mapStateToProps)(Header)

// connect(获取redux中数据的方法等)(绑定的组件)