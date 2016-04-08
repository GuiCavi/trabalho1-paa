var Utils = (function () {
    function Utils() {
        console.log("Utils class loaded");
    }
    Utils.swap = function (a, b) {
        return [b, a];
    };
    Utils.calculate = function (func, arr) {
        var start = performance.now();
        func(arr);
        var end = performance.now();
        return end - start;
    };
    Utils.generateHTML = function (arr, type) {
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
    Utils.siftDown = function (numbers, root, bottom) {
        var maxChild = root * 2 + 1;
        if (maxChild < bottom) {
            var otherChild = maxChild + 1;
            maxChild = (numbers[otherChild] > numbers[maxChild]) ? otherChild : maxChild;
        }
        else if (maxChild > bottom)
            return;
        if (numbers[root] >= numbers[maxChild])
            return;
        _a = Utils.swap(numbers[root], numbers[maxChild]), numbers[root] = _a[0], numbers[maxChild] = _a[1];
        this.siftDown(numbers, maxChild, bottom);
        var _a;
    };
    Utils.merge = function (numbers, begin, mid, end) {
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
    Utils.partition = function (numbers, left, right) {
        // let pivot: number = Math.floor(left+right / 2),
        var pivot = left, i = left, j = right;
        while (i <= j) {
            while (numbers[i] < numbers[pivot])
                i++;
            while (numbers[j] > numbers[pivot])
                j--;
            if (i <= j) {
                _a = Utils.swap(numbers[i], numbers[j]), numbers[i] = _a[0], numbers[j] = _a[1];
                i++;
                j--;
            }
        }
        return i;
        var _a;
    };
    return Utils;
}());
/**
 * Algorithms
 */
var Sort = (function () {
    function Sort() {
        console.log("new object of Sort");
    }
    /**
     * Uneficient bubbleSort
     */
    Sort.prototype.bubbleSort1 = function (numbers) {
        for (var i = 0; i < numbers.length; i++) {
            for (var j = 0; j < numbers.length - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    _a = Utils.swap(numbers[j], numbers[j + 1]), numbers[j] = _a[0], numbers[j + 1] = _a[1];
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
                    _a = Utils.swap(numbers[i], numbers[i + 1]), numbers[i] = _a[0], numbers[i + 1] = _a[1];
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
            index = Utils.partition(numbers, left, right);
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
            Utils.siftDown(numbers, i, numbers.length - 1);
        }
        for (var i = numbers.length - 1; i >= 1; i--) {
            _a = Utils.swap(numbers[0], numbers[i]), numbers[0] = _a[0], numbers[i] = _a[1];
            Utils.siftDown(numbers, 0, i - 1);
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
            numbers = Utils.merge(numbers, begin, mid, end);
        }
        return numbers;
    };
    return Sort;
}());
var Main = (function () {
    function Main() {
    }
    Main.main = function () {
        var sort = new Sort(), results = [];
        // let array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        var array = new Array(100).join('0').split('').map(function () {
            return parseInt('' + (Math.random() * 10));
        });
        for (var i = 0; i < 10; i++) {
            results.push(Utils.calculate(sort.insertionSort, array.slice(0)) + ' ms');
        }
        var $ul = Utils.generateHTML(results, 'ul');
        document.getElementById('results').appendChild($ul);
    };
    return Main;
}());
Main.main();
