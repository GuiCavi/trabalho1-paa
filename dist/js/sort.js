"use strict";
var Utils = require("./sortUtils");
/**
 * Algorithms
 */
var Sort = (function () {
    function Sort() {
        this.utils = new Utils.Utils();
        console.log("new object of Sort");
    }
    /**
     * Uneficient bubbleSort
     */
    Sort.prototype.bubbleSort1 = function (numbers) {
        for (var i = 0; i < numbers.length; i++) {
            for (var j = 0; j < numbers.length - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    _a = this.utils.swap(numbers[j], numbers[j + 1]), numbers[j] = _a[0], numbers[j + 1] = _a[1];
                }
            }
        }
        var _a;
    };
    /**
     * Most eficient bubbleSort
     */
    Sort.prototype.bubbleSort2 = function (numbers) {
        var finish = false, j = 0;
        while (j < numbers.length && !finish) {
            finish = true;
            for (var i = 0; i < numbers.length; i++) {
                if (numbers[i] > numbers[i + 1]) {
                    _a = this.utils.swap(numbers[i], numbers[i + 1]), numbers[i] = _a[0], numbers[i + 1] = _a[1];
                    finish = false;
                }
            }
            j++;
        }
        var _a;
    };
    /**
     * Quick sort
     */
    Sort.prototype.quickSort = function (numbers, left, right) {
        var index;
        if (numbers.length > 1) {
            index = this.utils.partition(numbers, left, right);
            if (left < index - 1)
                this.quickSort(numbers, left, index - 1);
            if (index < right)
                this.quickSort(numbers, index, right);
        }
        return numbers;
    };
    /**
     * Insertion Sort
     */
    Sort.prototype.insertionSort = function (numbers) {
        var atual;
        for (var i = 1; i < numbers.length; i++) {
            atual = numbers[i];
            for (var j = i - 1; j >= 0 && atual < numbers[j]; j--) {
                numbers[j + 1] = numbers[j];
            }
            numbers[j + 1] = atual;
        }
    };
    /**
     * Shell Sort
     */
    Sort.prototype.shellSort = function (numbers) {
        for (var salto = Math.floor(numbers.length / 2); salto > 0; salto = Math.floor(salto / 2)) {
            for (var i = salto; i < numbers.length; i++) {
                var x = numbers[i];
                for (var j = i; (j >= salto) && (x < numbers[j - salto]); j -= salto) {
                    numbers[j] = numbers[j - salto];
                }
                numbers[j] = x;
            }
        }
    };
    /**
     * Selection Sort
     */
    Sort.prototype.selectionSort = function (numbers) {
        for (var i = 0; i < numbers.length - 1; i++) {
            var k = i;
            var menor = numbers[i];
            for (var j = i + 1; j < numbers.length; j++) {
                if (numbers[j] < menor) {
                    k = j;
                    menor = numbers[j];
                }
            }
            numbers[k] = numbers[i];
            numbers[i] = menor;
        }
    };
    /**
     * Heap Sort
     */
    Sort.prototype.heapSort = function (numbers) {
        for (var i = Math.floor(numbers.length / 2); i >= 0; i--) {
            this.utils.siftDown(numbers, i, numbers.length - 1);
        }
        for (var i = numbers.length - 1; i >= 1; i--) {
            _a = this.utils.swap(numbers[0], numbers[i]), numbers[0] = _a[0], numbers[i] = _a[1];
            this.utils.siftDown(numbers, 0, i - 1);
        }
        var _a;
    };
    /**
     * Merge Sort
     */
    Sort.prototype.mergeSort = function (numbers, begin, end) {
        if (begin < end - 1) {
            var mid = Math.floor((begin + end) / 2);
            this.mergeSort(numbers, begin, mid);
            this.mergeSort(numbers, mid, end);
            numbers = this.utils.merge(numbers, begin, mid, end);
        }
        return numbers;
    };
    return Sort;
}());
