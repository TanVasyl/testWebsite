import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MealsItem,CartItem } from '../../types';

export const fetchCartItems = createAsyncThunk<MealsItem[]>('cart/fetchCartItems', async () => {
    const { data } = await axios.post('http://localhost:5000/cart/', {
        token: localStorage.getItem('tokenSession')
    })     
    return data?.items;
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
        builder.addCase(fetchCartItems.pending, (state, action) => {   
            state.cart = state.cart
        }),
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {   
            console.log(action.payload);
            state.cart = action.payload || []
        }),
        builder.addCase(fetchCartItems.rejected, (state) => {
            state.cart = []
        })
      }
})

export default cartSlice.reducer