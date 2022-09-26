import * as React from 'react';
import { useState, useEffect} from 'react';
import './style.css'
import { IMealsProps } from '../App';


export default function CartList ({cart, setCart}:IMealsProps ) {

    const [sell, setSell] = useState(false)


    const cartItem = cart.map((item:any) => {
        const {id, count, title ,price, url , total} = item

        if (sell === false) {

        return (
            <div key={id} className="cart_content" >

                <img className='cart_img' src={url} />

                <div className="cart_title">
                    {title}
                </div>

                <div className="cart_count">
                    Количество: 
                    <button className='btn_minus' onClick={()=> decrease(id)}>-</button>
                    {count}
                    <button className='btn_plus' onClick={()=> increase(id)}>+</button>
                    шт.
                </div>

                <div className="cart_price">
                    Сумма: {price*count}
                </div>

            </div>
         
        )}
        else {
            <div className="cart_content" >
           
            </div>
         

        }
    })

    const cartAdd = () =>  {
        localStorage.clear()
        setSell(true)
        alert("Ваш заказ оформлен")
    }

    const increase = (id:number) => {
        setCart(() => {
            return cart.map((elem:any) => {
                if (elem.id === id) {
                    return {
                        ...elem,
                        count:elem.count+1,
                        total: elem.price* elem.count,
                    }
                    
                }
                return elem
            })
        })
    }
    const decrease = (id:number) => {
        setCart(() => {
            return cart.map((elem:any) => {
                if (elem.id === id) {

                    const newCount = elem.count - 1 >= 1 ? elem.count - 1 : 1

                    return {
                        ...elem,
                        count: newCount,
                        total: elem.price* newCount,
                    }
                }
                return elem
            })
        })
    } 

    return(
        <div className="cart_list"  >

           <div className="cart_item">
             {
               cartItem
             }
           </div>
          
           <div className="cart_footer">
                <span>Общая стоимость товаров: {sell === false ? cart.reduce((prev, curr)=> prev+(curr.count*curr.price), 0): 0} </span>
                <div className="btn__cart_add">
                    <button className='btn_add' onClick={cartAdd} >Оформить заказ</button>
                </div>
            </div>

        </div>
    )
}

