import * as React from 'react';
import { useState } from 'react';
import { Argument} from 'webpack';
import './menu.css'
import { Routes, Route, Link } from 'react-router-dom'
import RegistrationUser from '../Registration/registr'
import Main from '../Main/custom'
import MealsList from '../meals-list/meals-list';
import CartList from '../Cart/cart';
import { IMenuProps } from '../App';

export default function Menu({items}:IMenuProps) {

    const [registrActiv,setRegistrActiv] = useState(false) 
        
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
            </div>
            <Routes>
                <Route path='/main' element={ <Main/> }/>
                <Route path='/' element={ <MealsList/> }/>
                <Route path='/registr' element={ <RegistrationUser registr={registrActiv} setRegistr={setRegistrActiv} /> }/>
                <Route path='/cart' element={ <CartList/> } />
                <Route path='*' element={ <MealsList /> } />
            </Routes>
        </div>
    )
}
