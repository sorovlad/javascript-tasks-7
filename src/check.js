'use strict';

module.exports.wrap = function (value) {
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
    var methods = {
        hasKeys: function (fields) {
            return checkHasKeys.bind(this)(fields);
        },
        hasValueType: function (field, type) {
            return checkHasValueType.bind(this)(field, type);
        },
        hasLength: function (count) {
            return checkHasLength.bind(this)(count);
        },
        containsValues: function (values) {
            return checkContainsValues.bind(this)(values);
        },
        hasParamsCount: function (count) {
            return checkHasParamsCount.bind(this)(count);
        },
        hasWordsCount: function (count) {
            return checkHasWordsCount.bind(this)(count);
        },
        isNull: function () {
            return isNull.bind(_this)();
        }
    };

    Object.defineProperty(Object.prototype, 'check', { get: function () {
        var curentMethods = Object.keys(methods).reduce(function (prev, key) {
            prev[key] = methods[key].bind(this);
            return prev;
        }.bind(this), {});

        var _this = this;
        curentMethods.not = {
            hasKeys: function (fields) {
                return !checkHasKeys.bind(_this)(fields);
            },
            hasValueType: function (field, type) {
                return !checkHasValueType.bind(_this)(field, type);
            },
            hasLength: function (count) {
                return !checkHasLength.bind(_this)(count);
            },
            containsValues: function (values) {
                return !checkContainsValues.bind(_this)(values);
            },
            hasParamsCount: function (count) {
                return !checkHasParamsCount.bind(_this)(count);
            },
            hasWordsCount: function (count) {
                return !checkHasWordsCount.bind(_this)(count);
            },
            isNull: function () {
                return !isNull.bind(_this)();
            }
        };
        return curentMethods;
    }});

    Object.prototype.checkHasKeys = checkHasKeys;
    function checkHasKeys(fields) {
        return !fields.some(item => {
            return !this.hasOwnProperty(item);
        });
    };
    Object.prototype.checkHasValueType = checkHasValueType;
    function checkHasValueType(field, type) {
        if (!this.hasOwnProperty(field) || typeof this === 'function') {
            return false;
        }
        return typeof this[field] === typeof type();
    };
    Object.prototype.checkHasLength = checkHasLength;
    function checkHasLength(count) {
        return this.length === count;
    };
    Object.prototype.checkContainsValues = checkContainsValues;
    function checkContainsValues(values) {
        return values.every(item => {
            return this.hasOwnProperty(item);
        });
    };
    Function.prototype.checkHasParamsCount = checkHasParamsCount;
    function checkHasParamsCount(count) {
        return this.length === count;
    };
    String.prototype.checkHasWordsCount = checkHasWordsCount;
    function checkHasWordsCount(count) {
        return count === this.split(' ').filter(item => {
            return item.length !== 0;
        }).length;
    };
    Object.prototype.isNull = isNull;
    function isNull() {
        return this.value === null;
    };
};
