System.register(["react", "../utils/PropTypes"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    function createProvider() {
        var Provider = (function (_super) {
            __extends(Provider, _super);
            function Provider(props, context) {
                var _this = _super.call(this, props, context) || this;
                _this.store = props.store;
                return _this;
            }
            Provider.prototype.getChildContext = function () {
                return { 'store': this.store };
            };
            Provider.prototype.render = function () {
                return react_1.default.Children.only(this.props.children);
            };
            return Provider;
        }(react_1.default.PureComponent));
        Provider.childContextTypes = {
            'store': PropTypes_1.storeShape.isRequired
        };
        return Provider;
    }
    exports_1("createProvider", createProvider);
    var react_1, PropTypes_1;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (PropTypes_1_1) {
                PropTypes_1 = PropTypes_1_1;
            }
        ],
        execute: function () {
            exports_1("default", createProvider());
        }
    };
});
//# sourceMappingURL=Provider.js.map