import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore} from './package/koajs/index'

import appModels from './models/app'

console.log('createStore', createStore);
const app = createStore({})
app.model(appModels)
console.log('输出store',app.getState());
app.dispatch({type:'app/clear',payload:{a:20,b:20,c:30}})
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
