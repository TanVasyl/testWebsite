import * as React from 'react';
import { useState } from 'react';
import { Argument} from 'webpack';
import './menu.css'
import { Routes, Route, Link } from 'react-router-dom'
import RegistrationUser from '../Registration/registr'
import Main from '../Main/main'
import MealsList from '../meals-list/meals-list';
import CartList from '../Cart/cart';
import ingredients from '../../ingredients';
import { IMenuProps } from '../App';
import { ICustomProps } from '../App';



export default function Menu({items}:IMenuProps) {

    const [registrActiv,setRegistrActiv] = useState(false) 
    const [cart,setCart] = useState([])
    const [custom, setCustom ]  = useState([])
        
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
                <Route path='/main' element={ <Main custom={custom} setCustom={setCustom}/> }/>
                <Route path='/' element={ <MealsList cart={cart} setCart={setCart} /> }/>
                <Route path='/registr' element={ <RegistrationUser registr={registrActiv} setRegistr={setRegistrActiv} /> }/>
                <Route path='/cart' element={ <CartList cart={cart} setCart={setCart} /> } />
                <Route path='*' element={ <MealsList cart={cart} setCart={setCart}/> } />
            </Routes>
        </div>
    )
}
