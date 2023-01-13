import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {MealsState, loading,MealsItem, userLogin } from '../../types'
import axios from 'axios'


const initialState: MealsState = {
    loading: loading.pending,
    meals: []
}

export const fetchMealsItems = createAsyncThunk<MealsItem[],userLogin>('meals/fetchMealsItems', async (idUser) => {
        const { data } = await axios.get('http://localhost:5000/', {
            headers:{
                id:idUser.user.id ,
                token: localStorage.getItem('tokenSession')
            }
        })   
        console.log(data);
        
        localStorage.setItem('tokenSession', data.data.accessToken)
        return data.meals
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


