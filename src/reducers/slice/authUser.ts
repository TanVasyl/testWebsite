import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userLogin {
    user: {
        id: number,
        name:string
    },
    isAuth: boolean
}
const initialState: userLogin  = {
    user: {
        id: null,
        name:''
    },
    isAuth: false
} 

export const authUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        responseUser (state, action: PayloadAction<any>) {
            state.user = action.payload,
            state.isAuth = true
            localStorage.setItem('user', JSON.stringify(state))
        },
        localStateUser ( state, action: PayloadAction<any>) {
            state = action.payload   
        }   
    }
})

export  const { responseUser, localStateUser } = authUser.actions

export default authUser.reducer
