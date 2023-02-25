import * as React from "react";
import axios from 'axios';
import {fetchCartItems } from '../reducers/slice/cartSlice';
import { useAppDispatch } from '../reducers/store';
import { MealsItem } from '../types';
import { useTypeSelector } from "../hooks/useSelector";
import * as e from "express";

type CartProps = {
    cart:MealsItem[]
}

const CartItem: React.FC<CartProps> = ({cart}) => {
    console.log('Render CartItem');
    const dispatch = useAppDispatch()
    const food = useTypeSelector(state => state.mealsList.meals)
    const delItem = React.useCallback(async(items:MealsItem) => {
        await axios.delete('http://localhost:5000/api/cart', {
           headers:{
            id:items.id
           }
        })
        dispatch(fetchCartItems())
    },[])
    const increaseCount = React.useCallback(async (items:MealsItem) => {
        await axios.post('http://localhost:5000/api/cart/add',{
            token: localStorage.getItem('token'),
            meals: items
    })
        dispatch(fetchCartItems())
    },[])
    const decreaseCount = React.useCallback(async (items:MealsItem) => {
        await axios.put('http://localhost:5000/api/cart/dec', {
            id: items.id
        })   
        dispatch(fetchCartItems())
    },[])
    
    if(!cart.length){
        return <h1>{`Пустая корзина`}</h1>
    }
    return(
            <div className="cart_item">
            {cart.map((item) => {
                console.log(item);
                
                const {id,count,price,name,Image} = item
                return (
                <div key={id} className="cart_content" >
                    <img className='cart_img' src={process.env.REACT_APP_PORT + Image} />
                    <div className="cart_title">
                        {name}
                    </div>
                    <div className="cart_count">
                        Количество: 
                        <button className='btn_minus' onClick={()=> decreaseCount(item)}>-</button>
                        {count}
                        <button className='btn_plus' onClick={()=> increaseCount(item)}>+</button>
                        шт.
                    </div>
                    <div className="footer">
                        <button className='btn_del' onClick={() => delItem(item)}>Убрать из корзины</button>
                        <div className="cart_price">
                            Сумма: {price*count}
                        </div>
                    </div>
                </div>
                )
            })}
           </div>
    )
}
export default CartItem