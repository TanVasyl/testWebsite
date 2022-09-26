import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './page/App'
import { BrowserRouter} from 'react-router-dom'


ReactDOM.render( 
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    , document.getElementById('root'));