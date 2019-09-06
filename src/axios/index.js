import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import utils from '../utils/utils'
export default class Axios{
    static requestList(_this,url,params,isMock){
        let data = {
            params:params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item,index)=>{
                    item.key = index
                    return item
                })
                _this.setState({
                    list,
                    pagination:utils.pagination(data,(current)=>{
                        _this.params.page = current
                        _this.requestList()
                    })
                })
            }
        })
    }
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                if(response.status == 'success'){
                    resolve(response)
                }else{
                    reject(response.message)
                }
            })
        })
    }
    static ajax(options){
        let basicUrl =''
        if(options.data.isMock){
            console.log('Mock数据')
            basicUrl = "http://www.easy-mock.com/mock/5d673a765e113f4e3991e6ec/fimoapi"
        }else{
            basicUrl = "http://www.easy-mock.com/mock/5d673a765e113f4e3991e6ec/fimoapi"
        }
        
        let loading
        if(options.data && options.data.isLoading == true){
            loading = document.getElementById('ajaxLoading')
            loading.style.display = 'block'
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:basicUrl,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(options.data && options.data.isLoading == true){
                    loading = document.getElementById('ajaxLoading')
                    loading.style.display = 'none'
                }
                let res = response.data
                if(response.status == '200'){
                    if(res.code == '0'){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(res)
                }
            })
        })
    }
}