import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {userLogin} from '../../types'

const initialState: userLogin  = {
    user: {
        id: null ,
        login:'' 
    },
    _isAuth: false 
} 

export const authUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authentication (state, action) {
            state._isAuth = true
            state.user.login = action.payload.login,
            state.user.id = action.payload.id
        },
        logOutUser(state, action){
            state._isAuth = action.payload
            state.user = {
                id:null,
                login:''
            }
        }
    }
})

export  const { authentication,logOutUser } = authUser.actions

export default authUser.reducer
