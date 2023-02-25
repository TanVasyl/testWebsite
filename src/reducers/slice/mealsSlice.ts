import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {MealsState, loading,MealsItem, userLogin } from '../../types'
import { $host } from '../../http';


const initialState: MealsState = {
    loading: loading.pending,
    meals: []
}

export const fetchMealsItems = createAsyncThunk<MealsItem[]>('meals/fetchMealsItems', async () => {
        const { data } = await $host.get('http://localhost:5000/api/food')   
        console.log(data);
        
        return data.rows
})
export const mealsList = createSlice({
    name: 'meals',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchMealsItems.pending, (state) => {
            state.loading = loading.pending,
            state.meals = state.meals
        }),
        builder.addCase(fetchMealsItems.fulfilled, (state, action) => {   
            state.loading = loading.succeeded,            
            state.meals = action.payload
        }),
        builder.addCase(fetchMealsItems.rejected, (state) => {
            state.loading = loading.failed,
            state.meals = []
        })
      },
    })
export default mealsList.reducer


