import React from 'react'
import { Row,Col,Card,Modal } from 'antd'
// import './index.less'
export default class Modals extends React.Component{
    state = {
        visible:false
    }
    showModal = (item) => {
        this.setState({
            visible:true,
            currentImg:item
        })
    }
    render(){
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png'],

        ]
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card
                style={{marginBottom:10}}
                cover={<img src={'gallery/'+item} onClick={()=>this.showModal(item)} />}
            >
                <Card.Meta
                    title="Pic"
                    description="show"
                />
            </Card>
        ))
        return (<div>
            <Row gutter={10}>
                <Col md={5}>
                    {imgList[0]}
                </Col>
                <Col md={5}>
                    {imgList[1]}
                </Col>
                <Col md={5}>
                    {imgList[2]}
                </Col>
                <Col md={5}>
                    {imgList[3]}
                </Col>
                <Col md={4}>
                    {imgList[4]}
                </Col>
            </Row>
            <Modal
                visible={this.state.visible}
                width={300}
                title="查看图片"
                height={500}
                onCancel={()=>this.setState({visible:false})}
                footer={null}
            >
                <img src={'gallery/'+this.state.currentImg} alt="" style={{width:'100%'}}></img>
            </Modal>
        </div>)
    }
}