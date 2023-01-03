import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {MealsState, loading,MealsItem } from '../../types'
import axios from 'axios'

const initialState: MealsState = {
    loading: loading.pending,
    meals: []
}
export const fetchMealsItems = createAsyncThunk<MealsItem>('meals/fetchMealsItems', async () => {
    const { data } = await axios.get('http://localhost:5000/')     
    sessionStorage.setItem('tokenSession', data.token)
    return data.meals
})
export const mealsList = createSlice({
    name: 'meals',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchMealsItems.pending, (state) => {
            state.loading = loading.pending,
            state.meals = []
        }),
        builder.addCase(fetchMealsItems.fulfilled, (state, action) => {   
            state.loading = loading.succeeded,
            state.meals = state.meals.concat(action.payload)
        }),
        builder.addCase(fetchMealsItems.rejected, (state) => {
            state.loading = loading.failed,
            state.meals = []
        })
      },
    })
export default mealsList.reducer
