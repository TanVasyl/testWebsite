import * as React from 'react';
import './style.css'
import CartItem from '../../Components/CartItem';
import CustomItem from '../../Components/CustomItem'
import { useState} from 'react';
import { useTypeSelector } from '../../hooks/useSelector';
import {fetchCartItems } from '../../reducers/slice/cartSlice';
import { useAppDispatch } from '../../reducers/store';
import { MealsItem } from '../../types';

const Cart:React.FC = () =>  {
    console.log('Render Cart');
    const dispatch = useAppDispatch()
    const cart = useTypeSelector(state => state.cartItem.cart)
    React.useEffect(() => {
        dispatch(fetchCartItems())
    }, [])
    const totalPrice = cart.reduce((prev, curr)=> prev+(curr.count*curr.price), 0)
    // const [sell, setSell] = useState(false)
    // const [customCart,setCastomCart] = useState(JSON.parse( localStorage.getItem('custom')) || [])
 
    // const cartSell = () =>  {
    //     localStorage.clear()
    //     setSell(true)
    //     alert(`Ваш заказ оформлен `)
    //     setCastomCart([])
    // }

    return(
    <div className="cart_list"  >
        <div className="cart_item">
            <CartItem cart={cart} />
        </div>
        <div className="test">
            {/* <CustomItem /> */}
        </div>
        <div className="cart_footer">
            <span>Общая стоимость товаров:
                {totalPrice}
          </span>
            {/* <div className="btn__cart_add">
                <button className='btn_add' onClick={cartSell} >Оформить заказ</button>
            </div> */}
        </div>
    </div>
    )
}
export default Cart