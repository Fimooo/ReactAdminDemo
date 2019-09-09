/**
 * 引入createstore
 */

 import { createStore, applyMiddleware } from 'redux'
 import reducer from './../reducer'
 import thunk from 'redux-thunk'
//  redux-thunk、redux-promise、redux-logger都是为了改进dispatch，使原本本该传出对象的dispatch，在改造后传出函数、primose等，来实现异步的操作
// redux-thunk、redux-promise、redux-logger，只需要放入applyMiddleware函数种即可，applyMiddleware是使用柯里化进行一系列处理并最终使中间件起作用的处理函数
 import { composeWithDevTools } from 'redux-devtools-extension'

const enhancers = process.env.NODE_ENV === "development" ? composeWithDevTools(
    applyMiddleware(thunk)
):applyMiddleware(thunk);
export default createStore(reducer, enhancers);