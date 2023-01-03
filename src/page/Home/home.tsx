import * as React from 'react';
import './style.css'
import { useAppDispatch } from '../../reducers/store';
import { fetchMealsItems } from '../../reducers/slice/mealsSlice';
import { useTypeSelector } from '../../hooks/useSelector';
import BurgerItem from '../../Components/burgerItem'


// const userAuth  = useTypeSelector(state => state.authUser.isAuth)
const Home: React.FC =  () =>  {

    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(fetchMealsItems())
    },[])

    return(
    <div className="meals">
        <BurgerItem />
    </div>
    )
}

export default Home ;