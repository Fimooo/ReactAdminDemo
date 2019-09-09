import React from 'react'
import { Row,Col,Layout } from 'antd'
import Headers from './components/Header'
import Footers from './components/Footer'
import NavLeft from './components/NavLeft'
import Home from './pages/home/'
import './style/common.less'
const { Header, Content, Footer, Sider } = Layout;
export default class Admin extends React.Component{
    onCollapse = collapsed => {
        if(this.state.logoNameShow){
            this.setState({ 
                collapsed,
                logoNameShow:false
             });
        }else{
            this.setState({ 
                collapsed,
                logoNameShow:true
             });
        }
        
      };
      state={
        collapsed: false,
        logoNameShow:true
    }
    render(){
        return (
            <Row className="container">
                <Col span={4} className="nav-left">
                   <NavLeft></NavLeft>
                </Col>
                <Col span={20} className="main">
                    <Header></Header>
                    <Row className="content">
                    {this.props.children}
                    </Row>
                    <Footers></Footers>
                </Col>
            </Row>
        )
    }
}


//不伸缩菜单栏