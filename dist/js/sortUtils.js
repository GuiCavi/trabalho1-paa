"use strict";
var Utils = (function () {
    function Utils() {
        console.log("Utils class loaded");
    }
    Utils.prototype.swap = function (a, b) {
        return [b, a];
    };
    Utils.prototype.calculate = function (func, arr) {
        var start = performance.now();
        func(arr);
        var end = performance.now();
        return end - start;
    };
    Utils.prototype.generateHTML = function (arr, type) {
        switch (type) {
            case 'ul':
                var $ul = document.createElement('ul');
                for (var i = 0; i < arr.length; i++) {
                    var $li = document.createElement('li');
                    $li.textContent = arr[i];
                    $ul.appendChild($li);
                }
                return $ul;
            default:
                break;
        }
    };
    Utils.prototype.siftDown = function (numbers, root, bottom) {
        var maxChild = root * 2 + 1;
        if (maxChild < bottom) {
            var otherChild = maxChild + 1;
            maxChild = (numbers[otherChild] > numbers[maxChild]) ? otherChild : maxChild;
        }
        else if (maxChild > bottom)
            return;
        if (numbers[root] >= numbers[maxChild])
            return;
        _a = this.swap(numbers[root], numbers[maxChild]), numbers[root] = _a[0], numbers[maxChild] = _a[1];
        this.siftDown(numbers, maxChild, bottom);
        var _a;
    };
    Utils.prototype.merge = function (numbers, begin, mid, end) {
        var temp = [], i = begin, j = mid, k = 0;
        while (i < mid && j < end) {
            if (numbers[i] <= numbers[j])
                temp[k++] = numbers[i++];
            else
                temp[k++] = numbers[j++];
        }
        while (i < mid)
            temp[k++] = numbers[i++];
        while (j < end)
            temp[k++] = numbers[j++];
        for (i = begin; i < end; i++) {
            numbers[i] = temp[i - begin];
        }
        return numbers;
    };
    /** Partition method */
    Utils.prototype.partition = function (numbers, left, right) {
        // let pivot: number = Math.floor(left+right / 2),
        var pivot = left, i = left, j = right;
        while (i <= j) {
            while (numbers[i] < numbers[pivot])
                i++;
            while (numbers[j] > numbers[pivot])
                j--;
            if (i <= j) {
                _a = this.swap(numbers[i], numbers[j]), numbers[i] = _a[0], numbers[j] = _a[1];
                i++;
                j--;
            }
        }
        return i;
        var _a;
    };
    return Utils;
}());
exports.Utils = Utils;
