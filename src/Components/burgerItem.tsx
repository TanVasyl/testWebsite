import * as React from "react"; 
import axios from 'axios';
import { useTypeSelector } from '../hooks/useSelector';
import { useAppDispatch } from '../reducers/store';
import { fetchMealsItems } from '../reducers/slice/mealsSlice';
import { MealsItem } from '..//types';


const BurgerItem: React.FC = () => {
    console.log('Render BurgerItem');
    const mealsName = useTypeSelector((state) => state.mealsList.meals)
   
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(fetchMealsItems())
    },[])

const addButton = React.useCallback( async (prod:MealsItem) => {
    const {id,count,price,title,url} = prod
    await axios.post('http://localhost:5000/post',{
            token: sessionStorage.getItem('tokenSession'),
            meals: {
                id:id,
                count:count,
                price:price,
                title:title,
                url:url
            }
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
export default BurgerItem