import * as React from 'react';
import { useState,useEffect } from 'react';
import meals from './../../meals'
import './style.css'
import { IMealsProps } from '../App';

export default function MealsList ({cart, setCart}:IMealsProps) {
   
    useEffect(() => {
        localStorage.setItem('product', JSON.stringify(cart))

    },[cart])

    const product = React.useMemo(() => meals.map((prod)=> {
       
        const  addCart = (id:number) => {
            if (cart.find((e:any)=>e.id === id)) {
            setCart(cart)
            } else {
            setCart(cart.concat(prod))
            }
            
        }
    
        return (

            <div key={prod.id.toString()} className="list">

                <img className='list_img' src={prod.url} alt='Бургер'  />

                <div className='list_title'>{prod.title}</div>

                <div className='list_price'>Цена: {prod.price} р.</div>

                <button className='btn_list' onClick={() =>addCart(prod.id) }>Добавить</button>

            </div>
            
        )
    }), [cart] )

    return(
        <div className="meals_list">

            <div className="MealsHeader">
                <h1>Выбери свой Бургер</h1>
            </div>


            <div className="MealsList">
                {product}
            </div>
          
        </div>
    )
}