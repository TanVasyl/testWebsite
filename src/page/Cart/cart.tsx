import * as React from 'react';
import { useState, useEffect} from 'react';
import './style.css'
import { useTypeSelector } from '../../hooks/useSelector';
import { useDispatch } from 'react-redux';
import { cartTypeAction } from '../../reducers/mealsReducer/mealsReducer';


export default function CartList () {
    const [sell, setSell] = useState(false)
    const [customCart,setCastomCart] = useState(JSON.parse( localStorage.getItem('custom')) || [])
   
    const dispatch = useDispatch()
    const {meals} = useTypeSelector(state => state.meals)
    const get = (id:number) => {
        dispatch({type: cartTypeAction.GET_CART, payload: id})
    }
    const customItem = customCart.map((item:any) => {
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


    })
    const cartSell = () =>  {
        localStorage.clear()
        setSell(true)
        alert("Ваш заказ оформлен")
        setCastomCart([])
    }
    const increase = (id:number) => {
        dispatch({type:cartTypeAction.Increase, payload: id})
    }
    const decrease = (id:number) => {
        dispatch({type:cartTypeAction.Decrease, payload: id})
    } 

    const cartMeals = meals.map((item) => {
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
                        <button className='btn_minus' onClick={()=> decrease(id)}>-</button>
                        {count}
                        <button className='btn_plus' onClick={()=> increase(id)}>+</button>
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
                <div className="cart_content" >
                </div>
            }
    })
    return(
        <div className="cart_list"  >
           <div className="cart_item">
             { cartMeals}
           </div>
           <div className="test">
             {customItem}
           </div>
           <div className="cart_footer">
                <span>Общая стоимость товаров: {sell === false ? meals.reduce((prev, curr)=> prev+(curr.count*curr.price), 0): 0}  </span>
                <div className="btn__cart_add">
                    <button className='btn_add' onClick={cartSell} >Оформить заказ</button>
                </div>
            </div>
        </div>
    )
}

