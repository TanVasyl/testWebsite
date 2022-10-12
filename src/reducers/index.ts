import { combineReducers } from "redux"
import { createStore } from 'redux'
import { mealsReducer } from "./mealsReducer/mealsReducer"



export const rootReducer = combineReducers({
    meals:mealsReducer
})



export type RootState = ReturnType<typeof rootReducer>



export const store = createStore(rootReducer)