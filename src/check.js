'use strict';

module.exports.wrap = function (value) {
    if (value === undefined) {
        return {
            value: undefined
        };
    };
    if (value === null) {
        return {
            value: null
        };
    };

    switch (typeof value) {
        case 'number':
            return new Number(value);
        case 'string':
            return new String(value);
        case 'boolean':
            return new Boolean(value);
    }
    return value;
};

exports.init = function () {
    /*Некоторые методы повторяются из Object в других обьектах,
    хотя они и так будут присвоены. Как лучше сделать, оставить их
    только в Object или как есть?*/
    var objectFns = {
        hasKeys: function (fields) {
            return checkHasKeys.bind(this)(fields);
        },
        checkContainsKeys: function (keys) {
            return checkHasKeys.bind(this)(keys);
        },
        hasValueType: function (field, type) {
            return checkHasValueType.bind(this)(field, type);
        },
        containsValues: function (values) {
            return checkContainsValues.bind(this)(values);
        },
        hasValues: function (values) {
            return checkHasValues.bind(this)(values);
        },
        isNull: function () {
            return isNull.bind(this)();
        }
    };
    var functionFns = {
        hasParamsCount: function (count) {
            return checkHasParamsCount.bind(this)(count);
        }
    };
    var arrayFns = {
        hasKeys: function (fields) {
            return checkHasKeys.bind(this)(fields);
        },
        hasValueType: function (field, type) {
            return checkHasValueType.bind(this)(field, type);
        },
        checkContainsKeys: function (keys) {
            return checkHasKeys.bind(this)(keys);
        },
        containsValues: function (values) {
            return checkContainsValues.bind(this)(values);
        },
        hasLength: function (count) {
            return checkHasLength.bind(this)(count);
        },
        hasValues: function (values) {
            return checkHasValues.bind(this)(values);
        }
    };
    var stringFns = {
        hasLength: function (count) {
            return checkHasLength.bind(this)(count);
        },
        hasWordsCount: function (count) {
            return checkHasWordsCount.bind(this)(count);
        }
    };

    connectToPrototype(Object.prototype, 'check', objectFns);
    connectToPrototype(Function.prototype, 'check', functionFns);
    connectToPrototype(Array.prototype, 'check', arrayFns);
    connectToPrototype(String.prototype, 'check', stringFns);

    function connectToPrototype(objectPrototype, element, methods) {
        Object.defineProperty(objectPrototype, element, {
            get: function () {
                return connect(this, methods);
            },
            enumerable: false
        });
    };

    function connect(element, methods) {
        var curentMethods = Object.keys(methods).reduce(function (prev, key) {
            prev[key] = methods[key].bind(element);
            return prev;
        }.bind(element), {});
        curentMethods.not = Object.keys(methods).reduce(function (prev, key) {
            prev[key] = not(methods[key]).bind(element);
            return prev;
        }.bind(element), {});
        return curentMethods;
    }
    function not(method) {
        return function () {
            return !method.apply(this, arguments);
        };
    };
    function checkContainsKeys(keys) {
        return keys.every(item => {
            this.hasOwnProperty(item);
        });
    };
    function checkHasKeys(fields) {
        return !fields.some(item => {
            return !this.hasOwnProperty(item);
        });
    };
    function checkHasValueType(field, type) {
        if (!this.hasOwnProperty(field) || typeof this === 'function') {
            return false;
        }
        return typeof this[field] === typeof type();
    };
    function checkHasLength(count) {
        return this.length === count;
    };
    function checkContainsValues(values) {
        return values.every(item => {
            return this.hasOwnProperty(item);
        });
    };
    function checkHasValues(values) {
        if (typeof this === 'array') {
            return this.some(item => {
                return values.indexOf(item) !== -1;
            });
        }
        for (var key in this) {
            if (values.indexOf(key) === -1) {
                return false;
            }
        }
        return true;
    };
    function checkHasParamsCount(count) {
        return this.length === count;
    };
    function checkHasWordsCount(count) {
        return count === this.split(' ').filter(item => {
            return item.length !== 0;
        }).length;
    };
    function isNull() {
        return this.value === null;
    };

    function connectToObjectProto(proto, name, method) {
        Object.defineProperty(proto, name, {
            value: method,
            enumerable: false,
            writable: true
        });
    };

    connectToObjectProto(Object.prototype, 'checkHasKeys', checkHasKeys);
    connectToObjectProto(Object.prototype, 'checkHasValueType', checkHasValueType);
    connectToObjectProto(Object.prototype, 'checkHasLength', checkHasLength);
    connectToObjectProto(Object.prototype, 'checkContainsValues', checkContainsValues);
    connectToObjectProto(Function.prototype, 'checkHasParamsCount', checkHasParamsCount);
    connectToObjectProto(String.prototype, 'checkHasWordsCount', checkHasWordsCount);
    connectToObjectProto(Object.prototype, 'isNull', isNull);
};
