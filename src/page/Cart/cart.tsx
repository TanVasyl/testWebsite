import * as React from 'react';
import './style.css'
import CartItem from '../../Components/CartItem';
import CustomItem from '../../Components/CustomItem'
import { useState} from 'react';
import { useTypeSelector } from '../../hooks/useSelector';
import {fetchCartItems } from '../../reducers/slice/cartSlice';
import { useAppDispatch } from '../../reducers/store';

const Cart:React.FC = () =>  {
    // const [sell, setSell] = useState(false)
    // const [customCart,setCastomCart] = useState(JSON.parse( localStorage.getItem('custom')) || [])
    const dispatch = useAppDispatch()
    const cart = useTypeSelector(state => state.cartItem.cart)
        React.useEffect(() => {
            dispatch(fetchCartItems())
        }, [])

    // const cartSell = () =>  {
    //     localStorage.clear()
    //     setSell(true)
    //     alert(`Ваш заказ оформлен `)
    //     setCastomCart([])
    // }

    const totalPrice = cart.reduce((prev, curr)=> prev+(curr.count*curr.price), 0)
    if(!cart.length){
        return <h1>{`Пустая корзина`}</h1>
    }
    return(
    <div className="cart_list"  >
        <div className="cart_item">
            <CartItem />
        </div>
        <div className="test">
            {/* <CustomItem /> */}
        </div>
        <div className="cart_footer">
            <span>Общая стоимость товаров:
                {totalPrice}
                 {/* {sell === false ? totalPrice: 0} */}
            </span>
            {/* <div className="btn__cart_add">
                <button className='btn_add' onClick={cartSell} >Оформить заказ</button>
            </div> */}
        </div>
    </div>
    )
}

export default Cart