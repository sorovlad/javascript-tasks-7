'use strict';

exports.init = function () {
    Object.prototype.checkHasKeys = function (fields) {
        return !fields.some(item => {
            return !this.hasOwnProperty(item);
        });
    };
    Object.prototype.checkHasValueType = function (field, type) {
        if (!this.hasOwnProperty(field) || typeof this === 'function') {
            return false;
        }
        return typeof this[field] === typeof type();
    };
    Object.prototype.checkHasLength = function (count) {
        return this.length === count;
    };
    Object.prototype.checkContainsValues = function (values) {
        return values.every(item => {
            return this.hasOwnProperty(item);
        });
    };
    Function.prototype.checkHasParamsCount = function (count) {
        return this.length === count;
    };
    String.prototype.checkHasWordsCount = function (count) {
        return count === this.split(' ').filter(item => {
            return item.length !== 0;
        }).length;
    };
};
