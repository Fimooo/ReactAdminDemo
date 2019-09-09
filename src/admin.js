import React from 'react'
import { Row, Col, Layout, Icon } from 'antd'
import Headers from './components/Header'
import Footers from './components/Footer'
import NavLeft from './components/NavLeft'
import Home from './pages/home/'
import './style/common.less'
const { Header, Content, Footer, Sider } = Layout;
export default class Admin extends React.Component {
    onCollapse = collapsed => {
        this.setState({
            collapsed
        });
    };
    state = {
        collapsed: false
    }
    render() {
        return (
            // <Row className="container">
            //     <Col span={4} className="nav-left">

            //     </Col>
            //     <Col span={20} className="main">
            //         <Header></Header>
            //         <Row className="content">
            //         {this.props.children}
            //            {/* <Home>
            //                 {this.props.children}
            //            </Home> */}
            //         </Row>
            //         <Footers></Footers>
            //     </Col>
            // </Row>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider 
                collapsible 
                collapsed={this.state.collapsed} 
                onCollapse={this.onCollapse}
                trigger={
                    <div>
                        <Icon 
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        style={{fontSize:28}}
                        ></Icon>
                    </div>
                }
                
                >
                    <div className="logo">
                        <img src="/assets/logo192.png" alt="" />
                        <span className={this.state.collapsed ? 'dn' : 'dlineb'}>Fimo的</span>
                    </div>
                    <NavLeft></NavLeft>
                </Sider>
                <Layout>
                    <Header>
                        <Headers></Headers>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        {this.props.children}
                        {/* <Home>
                            {this.props.children}
                       </Home> */}          </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <Footers></Footers>

                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

class Trigger extends React.Component{

    render(){
        return <div>
           <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
        </div>
    }
}