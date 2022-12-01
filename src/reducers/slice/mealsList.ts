import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'



export enum loading { 
    'pending' , 
    'succeeded',  
    'failed'
}
export type MealsItem = {
    id: number;
    title: string;
    url: string;
    price: number;
    count: number;
}
export interface MealsState  {
    loading: loading,
    meals: MealsItem[]
  }
  
  const initialState: MealsState = {
    loading: loading.pending,
    meals: []
}

export const fetchMealsItems = createAsyncThunk<MealsItem>('meals/fetchMealsItems', async () => {
    const { data } = await axios.get('http://localhost:5000/')     
    sessionStorage.setItem('tokenSession', data.tokenSession)
    return data.meals
})

export const mealsList = createSlice({
    name: 'meals',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMealsItems.pending, (state, action) => {
            state.loading = loading.pending,
            state.meals = []
        }),
        builder.addCase(fetchMealsItems.fulfilled, (state, action) => {   
            state.loading = loading.succeeded,
            state.meals = state.meals.concat(action.payload)
        }),
        builder.addCase(fetchMealsItems.rejected, (state, action) => {
            state.loading = loading.failed,
            state.meals = []
        })
      },
    })
export default mealsList.reducer
