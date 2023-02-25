import * as React from "react";
import { Routes, Route} from 'react-router-dom'
import Home from "../page/Home/home";
import { authRoutes, publicRoutes } from "../routes";
import { useTypeSelector } from '../hooks/useSelector';
import { useAppDispatch } from '../reducers/store';
import Header from "./Header/header";
import { useEffect } from "react";
import { check } from "../http/userApi";
import { authentication } from "../reducers/slice/authUserSlice";

const AppRouter: React.FC = () => {
    const dispatch = useAppDispatch()
    const {user,_isAuth} = useTypeSelector(state => state.authUser)
    useEffect(() => {
        check().then(data => {
           dispatch(authentication(data))
        })
    }, [])
    return (
        <Routes >
            <Route path='/' element={<Header/>}>
            {_isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path = {path} element = {Component}/>
            )}
             {publicRoutes.map(({path, Component}) => 
                <Route key={path} path = {path} element = {Component}/>
            )}
            <Route path='*' element={<Home />}/>
            </Route>
        </Routes>
    )
}
export default AppRouter;