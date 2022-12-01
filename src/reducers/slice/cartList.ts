import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MealsItem } from './mealsList';



export const fetchCartItems = createAsyncThunk<MealsItem>('meals/fetchCartItems', async () => {
    const { data } = await axios.post('http://localhost:5000/cart/items', {
        token: sessionStorage.getItem('tokenSession')
    })     
    return data
})
export interface CartItem {
    cart: MealsItem[]
  }
const initialState: CartItem = {
    cart: []
}
export const cartItem = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart(state, action: PayloadAction<MealsItem>) {     
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
                }})
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
            })}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state, action) => {
            state.cart = []
        }),
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {   
           
            state.cart =state.cart.filter((elem) => elem !== action.payload).concat(action.payload)
        })
        builder.addCase(fetchCartItems.rejected, (state, action) => {
            state.cart = []
        })
      },
    
})
export const {addCart, decrease, getCart, increase} = cartItem.actions

export default cartItem.reducer