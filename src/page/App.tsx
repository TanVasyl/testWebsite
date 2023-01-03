import * as React from 'react';
import './app.css'
import { Routes, Route} from 'react-router-dom'

import Header from './Header/header';
import Auth from '../page/Auth/Auth'
import Custom from '../page/Custom/custom'
import Home from '../page/Home/home';
import Cart from '../page/Cart/cart';

const App: React.FC = () =>{
    return(
    <div className='app'>
        <Routes>
            <Route path='/' element={<Header/>}>
                <Route path='/custom' element={ <Custom/> }/>
                <Route path='/' element={ <Home/> }/>
                <Route path='/registr' element={ <Auth/> }/>
                <Route path='/cart'  element={ <Cart/> } />
                <Route path='*' element={ <Home /> } />
            </Route>
        </Routes>
    </div>
    )
}
export default App
