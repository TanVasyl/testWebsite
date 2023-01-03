import * as React from "react";
import axios from 'axios';
import { useTypeSelector } from '../hooks/useSelector';
import {fetchCartItems } from '../reducers/slice/cartSlice';
import { useAppDispatch } from '../reducers/store';
import { MealsItem } from '../types';



const CartItem: React.FC = () => {
    const dispatch = useAppDispatch()
    const cart = useTypeSelector(state => state.cartItem.cart)

    const delItem = async(items:MealsItem) => {
        await axios.post('http://localhost:5000/cart/items', {
            meals: items
        })
        dispatch(fetchCartItems())
    }
    const increaseCount = async (items:MealsItem) => {
        await axios.put('http://localhost:5000/cart/items/plus', {
            id: items.id
        })   
        dispatch(fetchCartItems())
    }
    const decreaseCount = async (items:MealsItem) => {
        await axios.put('http://localhost:5000/cart/items/minus', {
            id: items.id
        })   
        dispatch(fetchCartItems())
    } 
    const totalPrice = cart.reduce((prev, curr)=> prev+(curr.count*curr.price), 0)
    if(!cart.length){
        return <h1>{`Пустая корзина`}</h1>
    }
    return(
            <div className="cart_item">
            {cart.map((item) => {
                const {id,count,price,title,url} = item
                return (
                <div key={id} className="cart_content" >
                    <img className='cart_img' src={url} />
                    <div className="cart_title">
                        {title}
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