import * as React from 'react';
import './style.css'
import { Link, Outlet } from 'react-router-dom'
import { useTypeSelector } from '../../hooks/useSelector';
import {HeaderTitle} from '../../types'

const Header: React.FC = () => {
    
    console.log('Render Header');
    
    const items:HeaderTitle[] = [
        {value: 'Конструктор блюд', href:'/custom', id: 0 },
        {value: 'Регистрация', href:'/registr', id: 1},
        {value: 'Основное меню', href:'/', id: 2},
        {value: 'Корзина', href:'/cart', id: 3},
    ]
    const {user} = useTypeSelector((state) => state.authUser)
    
    return (
        <div className= 'menu'>
            <div className="menu_content" >
                <ul >
                    {items.map((item) =>
                        <li key={item.id.toString()}>
                            <Link to={item.href}>{item.value}</Link>
                        </li>
                    )}
                </ul>
                {<div>
                <span style={{
                    'background': 'white',
                    'color':'red'
                }}>{user?.name}</span>
                </div>}
            </div>
            <Outlet />
        </div>
    )
}

export default Header;
