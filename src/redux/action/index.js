/**
 * Aciton 类型
 */
export const type = {
    SWITCH_MENU:'SWITCH_MENU'
    // key和value一样，只写SWITCH_MENU即可，SWITCH_MENU:'SWITCH_MENU'等同于SWITCH_MENU
}


export function switchMenu(menuName){
    console.log(menuName)
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}