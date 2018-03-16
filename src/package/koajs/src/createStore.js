import {runSaga} from 'redux-saga'

export default function (option) {
    const app = {
        _store:{},
        _model:{},
        model,
        dispatch,
        getState,
        callBackList:{},
        isBatchUpdate:false
    }
    return app

    /**
     * 注册model文件
     * 
     * @param {any} m 
     */
    function model(m) {
        // 判断是否存在 只在当前不存在的时候进行添加
        if (!app._model[m.namespace]){
            app._model[m.namespace] = m
            app._store[m.namespace] = m.state
        }
    }

    function dispatch(action) {
        const s = action.type.split('/')
        if (s.length < 1) throw new 'type参数不符合要求'
        const name = s[0]
        const fun = s[1]
        if (isReducers(name,fun)){
            const currState = startReducers(name,fun,action)
            if (!app.isBatchUpdate){
                updateSub(name,currState)
            }
        }else {
            startSaga(name,fun,action)
        }
    }

    function startSaga(name,fun,action) {
        runSaga(app._model[name].effects[fun],{subscribe,dispatch,getState})
    }

    /**
     * 应用更新并且启动回调
     * 
     * @param {any} name 
     * @param {any} currState 
     */
    function updateSub(name,currState) {
        app._store[name] = currState
        app.isBatchUpdate = false
        if (app.callBackList[name]){
            Object.keys(app.callBackList[name]).forEach((e)=>{
                app.callBackList[name][e]()
            })
        }
    }
    
    /**
     * 调用一个Reducers
     * 
     * @param {any} name 
     * @param {any} fun 
     * @param {any} action 
     */
    function startReducers(name,fun,action) {
        const state = app._store[name]
        return app._model[name].reducers[fun](state,action)
    }

    function isReducers(name,fun) {
        return Object.keys(app._model[name].reducers).some((e)=> e == fun)
    }
    /**
     * 返回当前数据源
     * 
     * @returns 
     */
    function getState() {
        return app._store
    }

    /**
     * 监听
     * 
     * @param {any} params 
     */
    function subscribe(params) {
        
    }
}