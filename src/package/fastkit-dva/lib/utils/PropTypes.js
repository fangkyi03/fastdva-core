System.register(["prop-types"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var prop_types_1, storeShape;
    return {
        setters: [
            function (prop_types_1_1) {
                prop_types_1 = prop_types_1_1;
            }
        ],
        execute: function () {
            exports_1("storeShape", storeShape = prop_types_1.default.shape({
                subscribe: prop_types_1.default.func.isRequired,
                dispatch: prop_types_1.default.func.isRequired,
                getState: prop_types_1.default.func.isRequired
            }));
        }
    };
});
//# sourceMappingURL=PropTypes.js.map