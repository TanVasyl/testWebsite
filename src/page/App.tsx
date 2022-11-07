import * as React from 'react';
import { Argument} from 'webpack';
import './app.css'
import Menu from './Menu/menu'
import meals from '../meals'
import ingredients from '../ingredients';

export interface IMenuProps{
    items: any
  }
export interface IRegistrProps{
    registr: boolean,
    setRegistr: React.SetStateAction<any>
}
export interface IMealsProps{
    cart: typeof meals ,
    setCart?: React.SetStateAction<any>

}
export interface ICustomProps{
    custom: typeof ingredients ,
    setCustom?: React.SetStateAction<any>
}

export default function  App() {

    const items = [
        {value: 'Конструктор блюд', href:'/main', id: 0 },
        {value: 'Регистрация', href:'/registr', id: 1},
        {value: 'Основное меню', href:'/', id: 2},
        {value: 'Корзина', href:'/cart', id: 3},
    ]
    return(
        <div className='app'>
        
            <nav>
                <Menu items={items} />
            </nav>
        </div>
    )
}

