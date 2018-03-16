## 初始化部分
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore,Provider} from './package/fastkit-dva'

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
这里的初始化部分模仿了dva
不过现在参数还不全 后面会不断的补全
