import React from 'react'
import { Select } from 'antd'
const Option = Select.Option
export default {
    formateDate(date){
        if(!date) return ''
        let time = new Date(date)

        return time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()+'  '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
    },
    pagination(data,callback){
        let page = {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal:()=>{
                return `共${data.result.total}条数据`
            },
            // 页脚跳转
            showQuickJumper:true
        }
        return page
    },
    getOptionList(data){
        if(!data){
            return []
        }
        let options = []
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options
    },
    /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
}