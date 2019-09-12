/**
 * Aciton 类型
 */
export const type = {
    SWITCH_MENU:'SWITCH_MENU',
    LOG_IN:'LOG_IN',
    LOG_OUT:'LOG_OUT'
    // key和value一样，只写SWITCH_MENU即可，SWITCH_MENU:'SWITCH_MENU'等同于SWITCH_MENU
}


export function switchMenu(menuName){
    console.log(menuName)
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}

export function logIn(token,userId){
    console.log(token,userId)
    return {
        type:type.LOG_IN,
        token,
        userId
    }
}

export function logOut(){
    return {
        type:type.LOG_OUT
    }
}