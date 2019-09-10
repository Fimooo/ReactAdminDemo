import React from 'react'
import { Row, Col, Card, Input, Form, Button,Checkbox,message,Icon } from 'antd'
import './index.less'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component {
    getOption = ()=>{
        let option={
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            tooltip:{},
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        }
        return option
    }
    getOptionMulit = ()=>{
        let option={
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            tooltip:{},
            series: [{
                name:'苹果',
                data: [120, 200, 150, 80, 70, 510, 150],
                type: 'bar'
            },
            {
                name:'犁',
                data: [20, 100, 150, 80, 70, 10, 130],
                type: 'bar'
            },
            {
                name:'香蕉',
                data: [50, 150, 50, 90, 70, 110, 190],
                type: 'bar'
            }
        ]
        }
        return option
    }
    render() {
       
        return (<div>
            <Card title="柱形图表之一" >
                <ReactEcharts
                    option={this.getOption()}
                />
            </Card>
            <Card title="柱形图表之一" >
                <ReactEcharts
                    option={this.getOptionMulit()}
                />
            </Card>
        </div>)
    }
}

