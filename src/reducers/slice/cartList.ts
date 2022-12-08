import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MealsItem } from './mealsList';

export const fetchCartItems = createAsyncThunk<MealsItem>('cart/fetchCartItems', async () => {
    const { data } = await axios.post('http://localhost:5000/cart/', {
        token: sessionStorage.getItem('tokenSession')
    })     
    return data;
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state, action) => {
            state.cart = []
        }),
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {   
            state.cart = state.cart.concat(action.payload)
        })
        builder.addCase(fetchCartItems.rejected, (state, action) => {
            state.cart = []
        })
      }
    
})

export default cartItem.reducer