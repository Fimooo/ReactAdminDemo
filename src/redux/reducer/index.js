/**
 * Reducer 数据处理
 */
import { type } from '../action'
 const initialState = {
     cityId:'',
     menuName:'首页',
    userId:'',
    token:''   
 }

//  要返回一个全新的状态（保留原有状态，进行更改）
// state和action均为redux自动传值
 export default (state=initialState,action)=>{
    switch(action.type){
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName:action.menuName
            };
            case type.LOG_IN:
                console.log(action,'reducer')
                console.log(state,'reducer-state')
                console.log({
                    ...state,
                    userId:action.userId,
                    token:action.token,
                },'reducer-e6')
                return {
                    ...state,
                    userId:action.userId,
                    token:action.token,
                };
                case type.LOG_OUT:
                return {
                    state:undefined
                };
        default:
            break;
    }
 }

//  先action  自动reducer 关联用stroe