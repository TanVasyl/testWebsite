import * as React from 'react';
import './style.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useTypeSelector } from '../../hooks/useSelector';
import {HeaderTitle} from '../../types'
import { LOGIN_ROUTE, REGISTATION_ROUTE } from '../../utils/consts';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../reducers/slice/authUserSlice';

const Header: React.FC = React.memo(() => {
    console.log('Render Header');
    const dispatch = useDispatch()
    const {user, _isAuth} = useTypeSelector((state) => state.authUser)
    const logOut = () => {
        dispatch(logOutUser(false))
    }
    const navigate = useNavigate()
    const items:HeaderTitle[] = [
        {value: 'Конструктор блюд', href:'/api/custom', id: 0 },
        {value: 'Основное меню', href:'/', id: 1},
        {value: 'Корзина', href:'/api/cart', id: 2},
        {value: `${_isAuth ? "Выйти" : "Авторизоваться"}`, href:`${_isAuth ? LOGIN_ROUTE : REGISTATION_ROUTE}`, id: 3},
        {value: `${_isAuth ? "Админ" : ""}`, href:'/api/admin', id: 4},
    ]
    return (
        <div className= 'menu'>
            <div className="menu_content" >
            <Link to={'/api/custom'}>Конструктор блюд</Link>
            <Link to={'/'}>Основное меню</Link>
            <Link to={'/api/cart'}>Корзина</Link>
            <Link 
                to={_isAuth ? LOGIN_ROUTE : REGISTATION_ROUTE}
                onClick={_isAuth ?() => logOut() : () => navigate(REGISTATION_ROUTE)}
            >
                {_isAuth ? "Выйти" : "Авторизоваться"}
            </Link>
            <Link to={'/api/admin'}>{_isAuth ? "Админ" : ""}</Link>
            </div>
            <div>{user.login}</div>
            <Outlet />
        </div>
    )
})
export default Header;
