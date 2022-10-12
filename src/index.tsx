import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './page/App'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './reducers';


ReactDOM.render( 
    <Provider store={store}>
        <BrowserRouter>
            
                <App/>
        
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));