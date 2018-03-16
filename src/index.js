import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore,Provider} from './package/koajs/index'

import appModels from './models/app'

console.log('createStore', createStore);
const app = createStore({})
app.model(appModels)
console.log('输出store',app.getState());
app.dispatch({type:'app/add',payload:{a:20,b:20,c:30}})
const AppView = () => {
    return (
        <Provider store={app}>
            <App/>
        </Provider>
    )
}
ReactDOM.render(<AppView/>, document.getElementById('root'));
registerServiceWorker();
