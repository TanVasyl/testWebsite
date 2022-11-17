import * as React from 'react';
import { useState, useEffect} from 'react';
import './style.css'
import { useTypeSelector } from '../../hooks/useSelector';
import { useDispatch } from 'react-redux';
import { getCart,decrease,increase } from '../../reducers/slice/cartList';


export default function CartList () {
    const [sell, setSell] = useState(false)
    const [customCart,setCastomCart] = useState(JSON.parse( localStorage.getItem('custom')) || [])
   
    const dispatch = useDispatch()
    const cart = useTypeSelector(state => state.cartItem.cart)

    const get = (id:number) => {
        dispatch(getCart(id))
    }
    const cartSell = () =>  {
        localStorage.clear()
        setSell(true)
        alert("Ваш заказ оформлен")
        setCastomCart([])
    }
    const increaseCount = (id:number) => {
        dispatch(increase(id))
    }
    const decreaseCount = (id:number) => {
        dispatch(decrease(id))
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
                        <button className='btn_minus' onClick={()=> decreaseCount(id)}>-</button>
                        {count}
                        <button className='btn_plus' onClick={()=> increaseCount(id)}>+</button>
                        шт.
                    </div>
                    <div className="footer">
                        <button className='btn_del' onClick={() => get(item.id)}>Убрать из корзины</button>
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
                <span>Общая стоимость товаров: {sell === false ? cart.reduce((prev, curr)=> prev+(curr.count*curr.price), 0): 0}  </span>
                <div className="btn__cart_add">
                    <button className='btn_add' onClick={cartSell} >Оформить заказ</button>
                </div>
            </div>
        </div>
    )
}

