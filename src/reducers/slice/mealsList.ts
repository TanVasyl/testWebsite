import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MealsState {
    meals: {
        id: number;
        title: string;
        url: string;
        price: number;
        count: number;
        total: number;
    }[]
  }
  
  const initialState: MealsState = {
    meals: []
}

export const mealsList = createSlice({
    name: 'meals',
    initialState,
    reducers: {
    responseMeals(state, action: PayloadAction<any>) {
        state.meals = action.payload
    },}
    })

export  const { responseMeals } = mealsList.actions

export default mealsList.reducer
