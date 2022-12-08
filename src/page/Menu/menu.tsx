import * as React from 'react';
import './menu.css'
import { Routes, Route, Link } from 'react-router-dom'
import RegistrationUser from '../Registration/registr'
import Main from '../Main/custom'
import MealsList from '../meals-list/meals-list';
import CartList from '../Cart/cart';
import { IMenuProps } from '../App';
import { useTypeSelector } from '../../hooks/useSelector';

export default function Menu({items}:IMenuProps) {
    const {user, isAuth} = useTypeSelector((state) => state.authUser)
    return (
        <div className= 'menu'>
            <div className="menu_content" >
                <ul >
                    {items.map((item:any) =>
                        <li key={item.id.toString()}>
                            <Link to={item.href}>{item.value}</Link>
                        </li>
                    )}
                </ul>
                {<div>
                <span style={{
                    'background': 'white',
                    'color':'red'
                }}>{user.name}</span>
                </div>}
            </div>
            <Routes>
                <Route path='/main' element={ <Main/> }/>
                <Route path='/' element={ <MealsList/> }/>
                <Route path='/registr' element={ <RegistrationUser/> }/>
                <Route path='/cart'  element={ <CartList/> } />
                <Route path='*' element={ <MealsList /> } />
            </Routes>

           
        </div>
    )
}
