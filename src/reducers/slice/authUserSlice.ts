import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {userLogin} from '../../types'




const localStateUser:userLogin = JSON.parse(localStorage.getItem('user'))

const initialState: userLogin  = {
    user: {
        id: null || localStateUser?.user.id,
        login:'' || localStateUser?.user.login
    },
    isAuth: false || localStateUser?.isAuth
} 

export const authUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        responseUser (state, action: PayloadAction<userLogin>) {
            state.isAuth = true
            state.user.login = action.payload.user.login,
            state.user.id = action.payload.user.id
            localStorage.setItem('user', JSON.stringify(state))
        }
    }
})

export  const { responseUser } = authUser.actions

export default authUser.reducer
