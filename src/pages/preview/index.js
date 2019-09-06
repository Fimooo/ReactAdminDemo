import React from 'react';
import PDF from 'react-pdf-js';
import './index.less'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker,Pagination } from 'antd';
const pdfurl = require('./123.pdf') 


export default class Test extends React.Component {
    constructor (){
        super()
    }
    state={
        page:1,
        pages:null,
        isShow:false,
        isShow2:false
    }
    onDocumentComplete = (pages) => {
        if(this.state.count == 1){
            this.setState({
                pageShow:true
            })
        }
        this.setState({ page: 1, pages:pages,count:1 });
    }
    onChange = (page)=> {
        this.setState({
            page: page,
        });
      }

      handleShow = () => {
        this.setState({
            isShow:true
        })
      }
      handleShow2 = () => {
        this.setState({
            isShow2:true
        })
      }
    render(){
        return (
            <div>
            <Card title="PDF分页预览">
                 <PDF
                    style={{margin:'0 auto'}}
                    file={pdfurl}
                    // file='http://file2.ygwjg.com/4bd251bbca607ac18202b35934332c399dd72d4f.pdf'
                    onDocumentComplete={this.onDocumentComplete}
                    page={this.state.page}
                    />
                    {this.state.pageShow
                    ? <Pagination  
                    showTotal={()=>{
                        return `共${this.state.pages}页`
                    }}
                    onChange={this.onChange} 
                    pageSize={1}
                    total={this.state.pages} 
                    showQuickJumper={true}
                    current={this.state.page}/>
                    :null}
                </Card>
                <Card title="PDF按钮预览">
                    <Button onClick={this.handleShow}>直接预览PDF</Button>
                    <Button onClick={this.handleShow2}>弹框分页预览PDF</Button>
                </Card>
                <Card title="PDF-iframe直接预览">
                <iframe width='100%' height={1500} src="http://file2.ygwjg.com/4bd251bbca607ac18202b35934332c399dd72d4f.pdf"></iframe>

                </Card>
                <Modal
                    visible={this.state.isShow}
                    title="pdf"
                    onCancel={()=>{
                        this.setState({
                            isShow:false
                        })
                    }}
                    width={800}
                >
                <iframe width={750} height={600} src="http://file2.ygwjg.com/4bd251bbca607ac18202b35934332c399dd72d4f.pdf"></iframe>
                </Modal>
                <Modal
                    visible={this.state.isShow2}
                    title="pdf"
                    onCancel={()=>{
                        this.setState({
                            isShow2:false
                        })
                    }}
                    width={800}
                >
                <PDF
                    style={{margin:'0 auto'}}
                    file={pdfurl}
                    // file='http://file2.ygwjg.com/4bd251bbca607ac18202b35934332c399dd72d4f.pdf'
                    onDocumentComplete={this.onDocumentComplete}
                    page={this.state.page}
                    />
                    {this.state.pageShow
                    ? <Pagination  
                    showTotal={()=>{
                        return `共${this.state.pages}页`
                    }}
                    onChange={this.onChange} 
                    pageSize={1}
                    total={this.state.pages} 
                    showQuickJumper={true}
                    current={this.state.page}/>
                    :null}
                </Modal>
            </div>
        )
    }
}
