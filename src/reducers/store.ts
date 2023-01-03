import { configureStore } from '@reduxjs/toolkit'
import cartItem  from './slice/cartSlice'
import mealsList from './slice/mealsSlice'
import authUser from './slice/authUserSlice'
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