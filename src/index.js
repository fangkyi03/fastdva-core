import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore,Provider} from './package/koajs/index'

import appModels from './models/app'

const app = createStore({})
app.model(appModels)
const AppView = () => {
    return (
        <Provider store={app}>
            <App/>
        </Provider>
    )
}
ReactDOM.render(<AppView/>, document.getElementById('root'));
registerServiceWorker();
