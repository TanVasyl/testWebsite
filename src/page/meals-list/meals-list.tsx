import * as React from 'react';
import './style.css'
import { useTypeSelector } from '../../hooks/useSelector';
import { fetchMealsItems } from '../../reducers/slice/mealsList';
import { useAppDispatch } from '../../reducers/store';
import axios from 'axios';
import { MealsItem } from '../../reducers/slice/mealsList';

const MealsList: React.FC =  () =>  {
    const dispatch = useAppDispatch()
    const mealsName = useTypeSelector((state) => state.mealsList.meals)
    React.useEffect(() => {
        dispatch(fetchMealsItems())
    },[])

const addButton = async (prod:MealsItem) => {
    const {id,count,price,title,url} = prod
    await axios.post('http://localhost:5000/cart',{
            token: sessionStorage.getItem('tokenSession'),
            meals: {
                id:id,
                count:count,
                price:price,
                title:title,
                url:url
            }
    })
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
                    <button className='btn_list' onClick={() =>addButton(prod) }>Добавить</button>
                </div>
                )
            })}
        </div>
    </div>
    )
}

export default MealsList ;