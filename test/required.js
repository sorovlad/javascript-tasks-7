/*jscs:disable maximumLineLength*/

var check = require('../src/check');
var assert = require('assert');

check.init();

describe('Check', function () {
    var person = { name: 'John', age: 20 };
    var numbers = [1, 2, 3];
    var func = function (a, b) {};
    var str = 'some string';

    if ({}.check) {
        describe('Extra credit', function () {
            it('Object should check that target containsKeys', function () {
                assert.ok(person.check.containsKeys(['name', 'age']));
                assert.ok(person.check.containsKeys(['age']));
                assert.equal(person.check.containsKeys(['name', 'age', 'gender']), false);
                assert.equal(person.check.containsKeys(['John', 20]), false);
            });
            it('Array should check that target containsKeys', function () {
                assert.ok(numbers.check.containsKeys([0, 1, 2]));
                assert.ok(numbers.check.containsKeys([0, 2]));
                assert.equal(numbers.check.containsKeys([0, 1, 5]), false);
                assert.equal(numbers.check.containsKeys([0, 1, 2, 3]), false);
            });
            it('Object should check that target hasKeys', function () {
                assert.ok(person.check.hasKeys(['name', 'age']));
                assert.equal(person.check.hasKeys(['name', 'ag']), false);
                assert.equal(person.check.hasKeys(['name', 'age', 'gender']), false);
                assert.equal(person.checkHasKeys(['John', 20]), false);
                assert.equal(person.check.hasKeys(['name']), false);
            });
            it('Array should check that target hasKeys', function () {
                assert.ok(numbers.check.hasKeys(['0', '1', '2']));
                assert.equal(numbers.check.hasKeys(['0', '1', '2', '3']), false);
                assert.equal(numbers.check.hasKeys(['1', '2', '3']), false);
                assert.equal(numbers.check.hasKeys(['0', '1']), false);
            });
            it('Object should check that target containsValues', function () {
                assert.ok(person.check.containsValues(['John', 20]));
                assert.ok(person.check.containsValues([20]));
                assert.equal(person.check.containsValues(['John', 'ag']), false);
                assert.equal(person.check.containsValues(['John', 20, 'gender']), false);
            });
            it('Array should check that target containsValues', function () {
                assert.ok(numbers.check.containsValues([2, 1]));
                assert.ok(numbers.check.containsValues([1, 2, 3]));
                assert.equal(numbers.check.hasKeys([1, 2, 3, 4]), false);
                assert.equal(numbers.check.hasKeys([1, 5]), false);
            });
            it('Object should check that target hasValues', function () {
                assert.ok(person.check.hasValues(['John', 20]));
                assert.equal(person.check.hasValues(['John', 20, 30]), false);
                assert.equal(person.check.hasValues(['John']), false);
            });
            it('Array should check that target hasValues', function () {
                assert.ok(numbers.check.hasValues([1, 2, 3]));
                assert.equal(numbers.check.hasValues([1, 2]), false);
                assert.equal(numbers.check.hasValues([1, 2, 3, 4]), false);
            });
            it('Object should check that target hasValueType', function () {
                assert.ok(person.check.hasValueType('name', String));
                assert.equal(person.check.hasValueType(['name', Array]), false);
            });
            it('Array should check that target hasValueType', function () {
                assert.ok(numbers.check.hasValueType(1, Number));
            });

            it('Array should check that target hasLength', function () {
                assert.ok(numbers.check.hasLength(3));
            });
            it('String should check that target hasLength', function () {
                assert.ok(str.check.hasLength(11));
            });
            it('Function should check that target hasParamsCount', function () {
                assert.ok(func.check.hasParamsCount(2));
            });

            it('Strung should check that target hasWordsCount', function () {
                assert.ok(str.check.hasWordsCount(2));
            });
        });
    } else {
        describe('Required tasks', function () {
            it('should check that target hasKeys', function () {
                assert.ok(person.checkHasKeys(['name', 'age']));
            });

            it('should check that target hasValueType', function () {
                assert.ok(person.checkHasValueType('name', String));
            });

            it('should check that target hasKeys', function () {
                assert.ok(numbers.checkHasKeys(['0', '1', '2']));
            });

            it('should check that target hasLength', function () {
                assert.ok(numbers.checkHasLength(3));
            });

            it('should check that target containsValues', function () {
                assert.ok(numbers.checkContainsValues([2, 1]));
            });

            it('should check that target hasParamsCount', function () {
                assert.ok(func.checkHasParamsCount(2));
            });

            it('should check that target hasWordsCount', function () {
                assert.ok(str.checkHasWordsCount(2));
            });
        });
    }
});
