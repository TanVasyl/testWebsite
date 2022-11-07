import meals from '../../meals'

export enum cartTypeAction {
    ADD_CART = "ADD_CART",
    GET_CART = "GET_CART",
    Increase = "INCREASE",
    Decrease = "Decrease"
}

interface getCartAction {
    type: cartTypeAction.GET_CART,
    payload?:number
}
interface addCartAction {
    type: cartTypeAction.ADD_CART,
    payload?:any
}
interface IncreaseAction {
    type: cartTypeAction.Increase,
    payload?:number
}
interface DecreaseAction {
    type: cartTypeAction.Decrease,
    payload?:number
}

type cartAction = getCartAction | addCartAction | IncreaseAction | DecreaseAction

interface cartMeals {
    meals: typeof meals
}

const defaultMealsState:cartMeals = {
    meals: [],
}

export const mealsReducer = (state = defaultMealsState, action:cartAction ):cartMeals => {
   
    switch (action.type) {
        case cartTypeAction.ADD_CART: 
            return { 
                meals:  state.meals.filter((elem) => elem !== action.payload).concat(action.payload)    
            }
        case cartTypeAction.GET_CART: 
            return {
                meals: state.meals.filter((elem) => elem.id !== action.payload)
            }
        case cartTypeAction.Increase:
            return {
                meals: state.meals.map((elem:any) => {
                if (elem.id === action.payload) {
                    return {
                        ...elem,
                        count:elem.count+1,
                        total: elem.price* elem.count,
                    }  
                }
                    return elem
                })
            }
        case cartTypeAction.Decrease: 
            return{
                meals: state.meals.map((elem:any) => {
                if (elem.id === action.payload) {
                    const newCount = elem.count - 1 >= 1 ? elem.count - 1 : 1
                    return {
                        ...elem,
                        count: newCount,
                        total: elem.price* newCount,
                    }
                }
                return elem
            })}
        default: 
            return state
    }

}