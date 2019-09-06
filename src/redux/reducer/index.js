/**
 * Reducer 数据处理
 */
import { type } from '../action'
 const initialState = {
     cityId:'',
     menuName:'首页'
 }

//  要返回一个全新的状态（保留原有状态，进行更改）
// state和action均为redux自动传值
 export default (state=initialState,action)=>{
    switch(action.type){
        case type.SWITCH_MENU:
            console.log(action,'reducer')
            console.log(state,'reducer-state')
            console.log({
                ...state,
                menuName:action.menuName
            },'reducer-e6')

            return {
                ...state,
                menuName:action.menuName
            };
        default:
            break;
    }
 }

//  先action  自动reducer 关联用stroe