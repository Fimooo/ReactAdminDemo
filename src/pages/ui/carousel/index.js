import React from 'react'
import { Row,Col,Card,Modal,Carousel } from 'antd'
import './index.less'
export default class Modals extends React.Component{

    render(){
        return (<div>
        <Card title="切换">
            <Carousel autoplay={true} >
                <div><h3>AAAAAAAAA</h3></div>
                <div><h3>BBBBB</h3></div>
                <div><h3>CCCCCCCCC</h3></div>
                <div><h3>DDDDDDDDD</h3></div>
                <div><h3>EEEE</h3></div>
            </Carousel>
        </Card>
        <Card title="切换">
            <Carousel autoplay={true} className="slider-pic">
                <div><img src="/carousel-img/carousel-1.jpg" alt="" /></div>
                <div><img src="/carousel-img/carousel-2.jpg" alt="" /></div>
                <div><img src="/carousel-img/carousel-3.jpg" alt="" /></div>
            </Carousel>
        </Card>
        </div>)
    }
}