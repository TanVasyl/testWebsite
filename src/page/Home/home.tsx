import * as React from 'react';
import './style.css'
import { useTypeSelector } from '../../hooks/useSelector';
import { useAppDispatch } from '../../reducers/store';
import { fetchMealsItems } from '../../reducers/slice/mealsSlice';
import BurgerItem from '../../Components/burgerItem'


// const userAuth  = useTypeSelector(state => state.authUser.isAuth)
const Home: React.FC = () =>  {
 
    console.log('Render Home');
    return(
    <div className="meals">
        <BurgerItem />
    </div>
    )
}

export default Home ;