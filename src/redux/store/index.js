/**
 * 引入createstore
 */

 import { createStore } from 'redux'
 import reducer from './../reducer'
 import { composeWithDevTools } from 'redux-devtools-extension'

//  prevState：内置初始化状态

 export default ( )=>createStore(reducer)