import * as React from 'react';
import './style.css'
import BurgerItem from '../../Components/burgerItem'
import TypeBar from '../../Components/TypeBar';
import { useTypeSelector } from '../../hooks/useSelector';
import { fetchType } from '../../http/foodTypeApi';

const Home: React.FC = () =>  {
    console.log('Render Home');
    return(
    <div className="meals">
        <TypeBar />
        <BurgerItem />
    </div>
    )
}

export default Home ;