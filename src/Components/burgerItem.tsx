import * as React from "react"; 
import axios from 'axios';
import { useTypeSelector } from '../hooks/useSelector';
import { useAppDispatch } from '../reducers/store';
import { fetchMealsItems } from '../reducers/slice/mealsSlice';
import { MealsItem } from '..//types';
import { useNavigate } from "react-router-dom";
import { FOOD_ROUTER } from "../utils/consts";

const BurgerItem: React.FC = React.memo(() => {
    console.log('Render BurgerItem');
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    React.useEffect(() => {
        dispatch(fetchMealsItems())
    },[])
    const mealsName = useTypeSelector((state) => state.mealsList.meals)
   
    
    const addButton = React.useCallback( async (prod:MealsItem) => {
    await axios.post('http://localhost:5000/api/cart/add',{
            token: localStorage.getItem('token'),
            meals: prod
    })
}, [])
    return(
    <div className="meals_list">
        <div className="MealsHeader">
            <h1>Выбери свой Бургер</h1>
        </div>
        <div className="MealsList">
            {mealsName.map((prod) => {
                return (
                <div 
                key={prod.id.toString()} 
                className="list"
                >
                    <div onClick={() => navigate(FOOD_ROUTER + '/' + prod.id)}>
                        <img className='list_img' src={process.env.REACT_APP_PORT + prod.Image} alt='Бургер'  />
                        <div className='list_title'>{prod.name}</div>
                        <div className='list_price'>Цена: {prod.price} р.</div>
                    </div>
                    <button className='btn_list' onClick={() =>addButton(prod) }>Добавить</button>
                </div>
                )
            })}
        </div>
    </div>
    )
})
export default BurgerItem