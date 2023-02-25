import * as React from "react"
import AdminPage from "./page/Admin"
import Auth from "./page/Auth/Auth"
import Cart from "./page/Cart/cart"
import Custom from "./page/Custom/custom"
import FoodPage from "./page/FoodPage/FoodPage"
import Home from "./page/Home/home"
import { ADMIN_ROUTE, CART_ROUTE, CUSTOM_ROUTER, FOOD_ROUTER, HOME_ROUTE, LOGIN_ROUTE, REGISTATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage />
    },
    {
        path: CART_ROUTE,
        Component: <Cart />
    },
    {
        path: CUSTOM_ROUTER,
        Component: <Custom />
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <Home />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },  {
        path: REGISTATION_ROUTE,
        Component: <Auth />
    },
    {
        path: FOOD_ROUTER + '/:id',
        Component: <FoodPage />
    },
]