import * as React from 'react';
import './style.css'
import Login from '../../Components/login'
import RegistrationUser from '../../Components/registr'
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';

const Auth: React.FC = () => {
    console.log('Render Auth');
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
    <div>
        {
            isLogin ? 
            <Login/> : 
            <RegistrationUser/>
        }
    </div>
    )
}

export default Auth