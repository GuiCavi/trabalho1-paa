'use strict';
var methods = [
    {
        id: 'bubble-sort-1',
        value: 'bubbleSort1',
        text: 'BubbleSort Normal'
    },
    {
        id: 'bubble-sort-2',
        value: 'bubbleSort2',
        text: 'BubbleSort Melhorado'
    },
    {
        id: 'quick-sort',
        value: 'quickSort',
        text: 'QuickSort'
    },
    {
        id: 'insertion-sort',
        value: 'insertionSort',
        text: 'InsertionSort'
    },
    {
        id: 'shell-sort',
        value: 'shellSort',
        text: 'ShellSort'
    },
    {
        id: 'selection-sort',
        value: 'selectionSort',
        text: 'SelectionSort'
    },
    {
        id: 'heap-sort',
        value: 'heapSort',
        text: 'HeapSort'
    },
    {
        id: 'merge-sort',
        value: 'mergeSort',
        text: 'MergeSort'
    }
];
var quantities = [
    '20',
    '10000',
    '20000',
    '50000',
    '100000',
    '200000',
    '500000'
];
var times = [10, 20, 30, 40];
window.addEventListener('load', function () {
    initInputs();
    var $calculate = document.getElementById('calculate');
    var choosen = {
        methods: [],
        times: [],
        quantities: []
    };
    $calculate.addEventListener('click', function (e) {
        e.preventDefault();
        /**
         * Retrieving methods selected
         */
        var $methods = document.querySelectorAll('input[name="method"]:checked');
        if ($methods.length <= 0) {
            alert('Selecione pelo menos 1 método de ordenação');
            return;
        }
        /**
         * Retrieving how many times it will be executed
         */
        var $times = document.querySelectorAll('input[name="times"]:checked');
        if ($times.length <= 0) {
            alert('Não foi escolhido nenhuma quantidade de repetições');
            return;
        }
        /**
         * Retrieving the quantity of elements
         */
        var $quantity = document.querySelectorAll('input[name="quantities"]:checked');
        if ($quantity.length <= 0) {
            alert('Não foi escolhido nenhuma quantidade de elementos');
            return;
        }
        /** If pass here, everything was choosen */
        for (var i = 0; i < $methods.length; i++) {
            choosen.methods.push($methods[i].value); //VSCode shows an error, but it doesn't exists    
        }
        for (var i = 0; i < $times.length; i++) {
            choosen.times.push($times[i].value); //VSCode shows an error, but it doesn't exists    
        }
        for (var i = 0; i < $quantity.length; i++) {
            choosen.quantities.push($quantity[i].value); //VSCode shows an error, but it doesn't exists    
        }
        console.log(choosen.methods);
        console.log(choosen.times);
        console.log(choosen.quantities);
        executeFunctions();
    });
    /*************
     * Functions *
     *************/
    /** Dynamically creates inputs based on array of settings */
    function initInputs() {
        var $methods = document.getElementById('methods');
        for (var i = 0, len = methods.length; i < len; i++) {
            var $li = Template.methodInputGroup({
                id: methods[i].id,
                type: 'checkbox',
                name: 'method',
                value: methods[i].value,
                text: methods[i].text,
            });
            $methods.appendChild($li);
        }
        var $times = document.getElementById('times');
        for (var i = 0, len = times.length; i < len; i++) {
            var $li = Template.methodInputGroup({
                id: 'times-' + times[i],
                type: 'radio',
                name: 'times',
                value: times[i],
                text: times[i] + ' vezes',
            });
            $times.appendChild($li);
        }
        var $quantities = document.getElementById('quantities');
        for (var i = 0, len = quantities.length; i < len; i++) {
            var formattedNumber = ("" + quantities[i]).split('').reverse().join('').match(/\d{1,3}/g).join('.').split('').reverse().join('');
            var $li = Template.methodInputGroup({
                id: 'quantities-' + quantities[i],
                type: 'checkbox',
                name: 'quantities',
                value: quantities[i],
                text: formattedNumber + ' elementos',
            });
            $quantities.appendChild($li);
        }
    }
    ;
    /** Execute the choosen methods N times for the number of inputs */
    function executeFunctions() {
        var $executing = document.getElementById('executing');
        $executing.style.transition = 'opacity 0.3s cubic-bezier(0,0,0.3,1)';
        $executing.style.opacity = '1';
        /**
         * ["insertionSort", "selectionSort", "heapSort"]
         * ["10"]
         * ["10000", "20000", "100000"]
         */
        _loadFile(choosen.quantities[0], function (data) {
            var elements = data.split(/\n/g).map(parseFloat);
            console.log(elements);
            var sort = new Sort();
            sort.bubbleSort1(elements);
            console.log(elements);
        });
    }
    function _loadFile(fileName, cb) {
        var xhr = (XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
        xhr.open('GET', './assets/elements/' + fileName + '.txt', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cb(xhr.responseText);
            }
        };
        xhr.send();
    }
});
