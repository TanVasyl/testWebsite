import { configureStore } from '@reduxjs/toolkit'
import cartItem  from './slice/cartList'
import mealsList from './slice/mealsList'

export const store = configureStore({
  reducer: {
    mealsList,
    cartItem
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch