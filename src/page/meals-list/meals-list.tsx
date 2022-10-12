import * as React from 'react';
import mealsList from './../../meals'
import './style.css'
import { useDispatch } from 'react-redux';
import { cartTypeAction } from '../../reducers/mealsReducer/mealsReducer';




export default function MealsList () {
    

    const dispatch = useDispatch()

    const add = (id:number ) => {
        dispatch({type: cartTypeAction.ADD_CART, payload: mealsList[id]})   
    }

    const product = mealsList.map((prod)=> {
        return (

            <div key={prod.id.toString()} className="list">

                <img className='list_img' src={prod.url} alt='Бургер'  />

                <div className='list_title'>{prod.title}</div>

                <div className='list_price'>Цена: {prod.price} р.</div>

                <button className='btn_list' onClick={() =>add(prod.id) }>Добавить</button>

            </div>
            
        )
    })

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