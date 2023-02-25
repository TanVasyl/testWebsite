import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {MealsState, loading,MealsItem, userLogin, TypeItem, TypeState } from '../../types'
import { $host } from '../../http';


const initialState:TypeState = {
        type: [],
        selectedType: 0
   }
// export const fetchTypeItems = createAsyncThunk<TypeItem[]>('type/fetchTypeItems', async () => {
//         const { data } = await $host.get('http://localhost:5000/api/type')   
//         return data
// })
export const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers:{
        fetTypeItems(state,action){
            state.type = action.payload
        },
        selected(state, action){
            state.selectedType = action.payload
            console.log(state.selectedType);
            
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchTypeItems.pending, (state) => {
    //         state.type = state.type
    //     }), 
    //     builder.addCase(fetchTypeItems.fulfilled, (state, action) => {  
    //         state.type = action.payload
    //     }),
    //     builder.addCase(fetchTypeItems.rejected, (state) => {
    //         state.type = []
    //     })
    //   },
    })
    export  const { selected, fetTypeItems } = typeSlice.actions
export default typeSlice.reducer