import * as React from 'react';
import './style.css'
import Login from '../../Components/login'
import RegistrationUser from '../../Components/registr'

const Auth: React.FC = () => {
    console.log('Render Auth');
    
    return (
    <div>
        <Login/>
        <RegistrationUser/>
    </div>
    )
}

export default Auth