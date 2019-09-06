import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
export default class Home extends React.Component {

    render() {
        return (
            <div>
                这是动态router传的ID：
                {/* 动态参数通过match获取 */}
                {this.props.match.params.mainId}
            </div>
        )
    }
}