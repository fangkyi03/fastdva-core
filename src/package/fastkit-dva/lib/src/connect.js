System.register(["react", "../utils/PropTypes", "invariant"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = (this && this.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var __moduleName = context_1 && context_1.id;
    function createConnect(modelList, mapStateToProps, mapDispatchToProps, mergeProps, _a) {
        if (modelList === void 0) { modelList = []; }
        var _b = _a === void 0 ? {} : _a, _c = _b.pure, pure = _c === void 0 ? true : _c, _d = _b.withRef, withRef = _d === void 0 ? false : _d;
        var Connect = (function (_super) {
            __extends(Connect, _super);
            function Connect(props, context) {
                var _this = _super.call(this, props, context) || this;
                _this.componentWillUnmount = function () {
                    modelList.forEach(function (e) {
                        _this.timestamp.forEach(function (el) {
                            if (_this.store.callBackList[e][el]) {
                                delete _this.store.callBackList[e][el];
                            }
                        });
                    });
                };
                _this.initSubscribe = function () {
                    modelList.forEach(function (e) {
                        _this.timestamp.push(Date.parse(new Date()));
                        _this.store.callBackList[e][String(_this.timestamp.slice(-1)[0])] = _this.onStateChange;
                    });
                };
                _this.onStateChange = function () {
                    _this.forceUpdate();
                };
                _this.addExtraProps = function () {
                    return mapStateToProps(_this.storeState);
                };
                _this.store = context.store;
                _this.storeState = _this.store.getState();
                _this.timestamp = [];
                return _this;
            }
            Connect.prototype.componentWillMount = function () {
                invariant_1.default(modelList.length > 0, '请输入你要监听改变的model 这是必输项');
                invariant_1.default(typeof mapStateToProps == 'function', 'mapStateToProps必须为一个function');
                this.initSubscribe();
            };
            Connect.prototype.render = function () {
                return (react_1.default.Children.only(react_1.default.cloneElement(this.props.children, __assign({ dispatch: this.context['store'].dispatch }, this.addExtraProps()))));
            };
            return Connect;
        }(react_1.default.PureComponent));
        Connect.contextTypes = {
            'store': PropTypes_1.storeShape.isRequired
        };
        return function (View) { return function () {
            return (<Connect>
                <View></View>
            </Connect>);
        }; };
    }
    exports_1("createConnect", createConnect);
    var react_1, PropTypes_1, invariant_1;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (PropTypes_1_1) {
                PropTypes_1 = PropTypes_1_1;
            },
            function (invariant_1_1) {
                invariant_1 = invariant_1_1;
            }
        ],
        execute: function () {
            exports_1("default", createConnect);
        }
    };
});
//# sourceMappingURL=connect.js.map