import * as React from 'react';
import './style.css'
import { useDispatch, } from 'react-redux';
import { useTypeSelector } from '../../hooks/useSelector';
import { responseMeals } from '../../reducers/slice/mealsList';
import { addCart } from '../../reducers/slice/cartList';

export default function MealsList () {
    const dispatch = useDispatch()
    const mealsName = useTypeSelector((state) => state.mealsList.meals)

React.useEffect(() => {
    fetch('http://localhost:5000/' ,  {
        method:'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        dispatch(responseMeals(data))
    })
    .catch((error) => {
        console.log(error)
    })
},[])
const add = (id:number ) => {
    dispatch(addCart(mealsName[id]));
}
    return(
    <div className="meals_list">
        <div className="MealsHeader">
            <h1>Выбери свой Бургер</h1>
        </div>
        <div className="MealsList">
            {mealsName.map((prod) => {
                return (
                <div key={prod.id.toString()} className="list">
                    <img className='list_img' src={prod.url} alt='Бургер'  />
                    <div className='list_title'>{prod.title}</div>
                    <div className='list_price'>Цена: {prod.price} р.</div>
                    <button className='btn_list' onClick={() =>add(prod.id) }>Добавить</button>
                </div>
                )
            })}
        </div>
    </div>
    )
}