import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    cart: {
        id: number;
        title: string;
        url: string;
        price: number;
        count: number;
        total: number;
    }[]
  }
  
  const initialState: CartItem = {
    cart: []
}

export const cartItem = createSlice({
    name: 'cart',
    initialState,
    reducers: {
   
    addCart(state, action: PayloadAction<any>) {     
     state.cart = state.cart.filter((elem) => elem !== action.payload).concat(action.payload)
      
    },
    getCart(state, action: PayloadAction<number>)  {
        state.cart = state.cart.filter((elem) => elem.id !== action.payload)
      
    },
    increase(state, action: PayloadAction<number>) {  
        return {
            cart: state.cart.map((elem) => {
            if (elem.id === action.payload) {
                return {
                ...elem,
                count:+elem.count+1,
                total: elem.price* elem.count,
                }  
            }
                return elem
            })
        }
    },
    decrease(state, action:PayloadAction<number>){ 
        return {
        cart: state.cart.map((elem) => {
        if (elem.id === action.payload) {
            const newCount = elem.count - 1 >= 1 ? elem.count - 1 : 1
            return {
            ...elem,
            count: newCount,
            total: elem.price* newCount,
            }
        }
            return elem
        }   )}
        console.log();
        
    },}
    
})
export const {addCart, decrease, getCart, increase} = cartItem.actions

export default cartItem.reducer