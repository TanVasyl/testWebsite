import * as React from "react"
import { useParams } from "react-router-dom";
import { useTypeSelector } from "../../hooks/useSelector";
import { fetchOneMeals } from "../../http/foodTypeApi";
import { useAppDispatch } from "../../reducers/store";
import { MealsItem } from "../../types";

const FoodPage: React.FC = () =>  {
    // const dispatch = useAppDispatch()
    const food = useTypeSelector((state) => state.mealsList.meals)
    const [meals, setMeals] = React.useState<MealsItem>()
    const {id} = useParams()
    React.useEffect(()=> {
        fetchOneMeals(id).then(data => setMeals(data))
    },[])
    const addButton = (meals:MealsItem) => {
        console.log(meals);
        
    }
    console.log('Render FoodPage');
    if(meals === undefined) {
        return (
            <div>
                Что-то пошло не так
            </div>
        )
    }
    return(
        <div className="container">
              <div className="MealsList">
                <div 
                key={meals.id.toString()} 
                className="list"
                >
                    <img className='list_img' src={process.env.REACT_APP_PORT + meals.Image} alt='Бургер'  />
                    <div className='list_title'>{meals.name}</div>
                    <div className='list_price'>Цена: {meals.price} р.</div>
                    <button className='btn_list' onClick={() =>addButton(meals) }>Добавить</button>
                </div>
          
        </div>
        </div>
    )
}

export default FoodPage;