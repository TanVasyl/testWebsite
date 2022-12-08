import * as React from 'react';
import axios from 'axios';
import { useState} from 'react';
import './style.css'
import { useTypeSelector } from '../../hooks/useSelector';
import {fetchCartItems } from '../../reducers/slice/cartList';
import { useAppDispatch } from '../../reducers/store';
import { MealsItem } from '../../reducers/slice/mealsList';

export default function CartList () {
    const [sell, setSell] = useState(false)
    const [customCart,setCastomCart] = useState(JSON.parse( localStorage.getItem('custom')) || [])
    const dispatch = useAppDispatch()
    const cart = useTypeSelector(state => state.cartItem.cart)
        React.useEffect(() => {
            dispatch(fetchCartItems())
        }, [])

    const delItem = async(items:MealsItem) => {
        await axios.post('http://localhost:5000/cart/items', {
            meals: items
        })
        dispatch(fetchCartItems())
    }
    const cartSell = () =>  {
        localStorage.clear()
        setSell(true)
        alert(`Ваш заказ оформлен `)
        setCastomCart([])
    }
    const increaseCount = async (items:MealsItem) => {
        await axios.put('http://localhost:5000/cart/items/cp', {
            id: items.id
        })   
        dispatch(fetchCartItems())
    }
    const decreaseCount = async (items:MealsItem) => {
        await axios.put('http://localhost:5000/cart/items/cm', {
            id: items.id
        })   
        dispatch(fetchCartItems())
    } 
    const totalPrice = cart.reduce((prev, curr)=> prev+(curr.count*curr.price), 0)
    if(!cart.length){
        return <h1>{`Пустая корзина`}</h1>
    }
    return(
        <div className="cart_list"  >
            <div className="cart_item">
            {cart.map((item) => {
                const {id,count,price,title,url} = item
                if (sell === false) {
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
                )}
                else {
                <div className="cart_content" ></div>
            }})}
           </div>
           <div className="test">
            {customCart.map((item:any) => {
            const {meat,chees, sauses,tomato,cucumber,onion} = item
            return (
                <div  className="content">
                    <div className="meat">{meat}</div>
                    <div className="sauses">{sauses}</div>
                    <div className="chees">{chees}</div>
                    <div className="tomato">{tomato}</div>
                    <div className="cucumber">{cucumber}</div>
                    <div className="onion">{(onion === true) ? 'Добавить лук' : 'Без лука'}</div>
                </div>
            )
            })}
           </div>
           <div className="cart_footer">
                <span>Общая стоимость товаров: {sell === false ? totalPrice: 0}  </span>
                <div className="btn__cart_add">
                    <button className='btn_add' onClick={cartSell} >Оформить заказ</button>
                </div>
            </div>
        </div>
    )
}

