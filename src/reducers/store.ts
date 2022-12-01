import { configureStore } from '@reduxjs/toolkit'
import cartItem  from './slice/cartList'
import mealsList from './slice/mealsList'
import authUser from './slice/authUser'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    mealsList,
    cartItem,
    authUser,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch