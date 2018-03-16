System.register(["redux-saga", "redux-saga/effects"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(option) {
        var app = {
            _store: {},
            _model: {},
            model: model,
            dispatch: dispatch,
            getState: getState,
            subscribe: subscribe,
            callBackList: {},
            isBatchUpdate: false
        };
        return app;
        function model(m) {
            if (!app._model[m.namespace]) {
                app._model[m.namespace] = m;
                app._store[m.namespace] = m.state;
                app.callBackList[m.namespace] = {};
            }
        }
        function dispatch(action) {
            var s = action.type.split('/');
            if (s.length < 1)
                throw new 'type参数不符合要求';
            var name = s[0];
            var fun = s[1];
            if (isReducers(name, fun)) {
                var currState = startReducers(name, fun, action);
                if (!app.isBatchUpdate && currState !== app._store[name]) {
                    updateSub(name, currState);
                }
            }
            else {
                startSaga(name, fun, action);
            }
        }
        function startSaga(name, fun, action) {
            redux_saga_1.runSaga({ subscribe: subscribe, dispatch: dispatch, getState: getState }, app._model[name].effects[fun], action, sagaEffects);
        }
        function updateSub(name, currState) {
            app._store[name] = currState;
            app.isBatchUpdate = false;
            if (app.callBackList[name]) {
                Object.keys(app.callBackList[name]).forEach(function (e) {
                    app.callBackList[name][e]();
                });
            }
        }
        function startReducers(name, fun, action) {
            var state = app._store[name];
            return app._model[name].reducers[fun](state, action);
        }
        function isReducers(name, fun) {
            return Object.keys(app._model[name].reducers).some(function (e) { return e == fun; });
        }
        function getState() {
            return app._store;
        }
        function subscribe(params) {
            return function unsubscribe() {
            };
        }
    }
    exports_1("default", default_1);
    var redux_saga_1, sagaEffects;
    return {
        setters: [
            function (redux_saga_1_1) {
                redux_saga_1 = redux_saga_1_1;
            },
            function (sagaEffects_1) {
                sagaEffects = sagaEffects_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=createStore.js.map