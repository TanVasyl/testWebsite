import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MealsItem,CartItem } from '../../types';

export const fetchCartItems = createAsyncThunk<MealsItem>('cart/fetchCartItems', async () => {
    const { data } = await axios.post('http://localhost:5000/cart/', {
        token: sessionStorage.getItem('tokenSession')
    })     
    return data;
})

const initialState: CartItem = {
    cart: []
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.cart = []
        }),
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {   
            state.cart = state.cart.concat(action.payload)
        })
        builder.addCase(fetchCartItems.rejected, (state) => {
            state.cart = []
        })
      }
})

export default cartSlice.reducer