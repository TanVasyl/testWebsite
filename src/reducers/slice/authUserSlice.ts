import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {userLogin} from '../../types'

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
        responseUser (state, action: PayloadAction<userLogin>) {
            state.isAuth = true
            state.user.name = action.payload.user.name,
            state.user.id = action.payload.user.id
            localStorage.setItem('user', JSON.stringify(state))
        },
        localStateUser ( state, action: PayloadAction<userLogin>) {
            state.user = action.payload.user

        }   
    }
})

export  const { responseUser, localStateUser } = authUser.actions

export default authUser.reducer
