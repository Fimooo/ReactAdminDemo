import React from 'react'
import { Row,Col } from 'antd'
import './index.less'
import Utils from '../../utils/utils'
import axios from '../../axios'
import { connect } from 'react-redux'
import rootReducer from '../../redux/reducer'
import { createStore } from 'redux'
const store = createStore(rootReducer)
class Header extends React.Component{
    state={}
    componentWillMount(){
        this.setState({
            userName:'Fimo'
        })
        setInterval(()=>{
            let time = Utils.formateDate(new Date())
            this.setState({
                time
            })
        },1000)
        this.getWeatherAPIDate()
    }
    getWeatherAPIDate(){
        let city = 'beijing'
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status == 'success'){
                let data = res.results[0].weather_data[0]
                this.setState({
                    weatherPic:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }
    render(){
        const menuType = this.props.menuType
        return (<div  className="header">
        <Row className="header-top">
        {
            menuType
            ?
                <Col span={6} className="logo">
                    <img src="/logo192.png" alt="" />
                    <span>IMooc 通用管理系统</span>
                </Col>
            :''
        }
                <Col span={menuType?18:24}>
                    <span>欢迎，{this.state.userName}</span>
                    <a href="#">退出</a>
                </Col>
            </Row>
            {
                menuType?'':
                <Row className="breadcrumb">
                <Col span={4} className="breadcrumb-title">
                {/* {console.log(this.props)} */}
                {this.props.menuName||''}
                    {store.getState()}
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
const mapStateToProps = (state)=>{
    console.log(state)
    // return {
    //     menuName:state.menuName
    // }
    // 不行的原因可能是：数据点击的异步操作，未赋予初始值
    // 其实state.menuName在点击后是存在的
    return {
        menuName:state?state.menuName:'首页'
    }
}
export default connect(mapStateToProps)(Header)

// connect(获取redux中数据的方法等)(绑定的组件)