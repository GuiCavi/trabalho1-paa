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
        text: 'QuickSort',
        checked: true
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
    '500000',
    '1000000'
];
var times = [10, 20, 30, 40];
var charac = [
    {
        id: 'ascending',
        value: 'ascending',
        text: 'Ordem Crescente'
    },
    {
        id: 'random',
        value: 'random',
        text: 'Números aleatórios',
        checked: true
    },
    {
        id: 'descending',
        value: 'descending',
        text: 'Ordem Decrescente'
    }
];
window.addEventListener('load', function () {
    initInputs();
    new ChartController().plotChart({
        x: quantities.map(parseFloat),
        id: 'chart',
        title: 'Tempo médio de execução',
        xaxis: {
            title: 'Número de elementos'
        },
        yaxis: {
            title: 'Tempo (ms)'
        },
        mode: 'scatter'
    });
    var $calculate = document.getElementById('calculate');
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
        /**
             * Retrieving the charac of elements
             */
        var $charac = document.querySelectorAll('input[name="charac"]:checked');
        if ($charac.length <= 0) {
            alert('Não foi escolhido nenhuma característca para os elementos');
            return;
        }
        /** If pass here, everything was choosen */
        var choosen = {
            methods: [],
            times: [],
            quantities: [],
            charac: []
        };
        for (var i = 0; i < $methods.length; i++) {
            choosen.methods.push($methods[i].value);
        }
        for (var i = 0; i < $times.length; i++) {
            choosen.times.push($times[i].value);
        }
        for (var i = 0; i < $quantity.length; i++) {
            choosen.quantities.push($quantity[i].value);
        }
        for (var i = 0; i < $charac.length; i++) {
            choosen.charac.push($charac[i].value);
        }
        console.log(choosen.methods);
        console.log(choosen.times);
        console.log(choosen.quantities);
        console.log(choosen.charac);
        executeFunctions(choosen);
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
                checked: methods[i].checked
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
                text: times[i] + ' vezes'
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
                text: formattedNumber + ' elementos'
            });
            $quantities.appendChild($li);
        }
        var $charac = document.getElementById('charac');
        for (var i = 0, len = charac.length; i < len; i++) {
            var $li = Template.methodInputGroup({
                id: charac[i].id,
                type: 'checkbox',
                name: 'charac',
                value: charac[i].value,
                text: charac[i].text,
                checked: charac[i].checked
            });
            $charac.appendChild($li);
        }
    }
    ;
    /** Execute the choosen methods N times for the number of inputs */
    function executeFunctions(choosen) {
        var $status = document.getElementById('status');
        var results = {};
        $status.textContent = 'Aguarde, estamos processando as entradas...';
        $status.classList.add('show');
        /**
         * ["insertionSort", "selectionSort", "heapSort"]
         * ["10"]
         * ["10000", "20000", "100000"]
         */
        var worker = new Worker("dist/js/exec.js");
        worker.postMessage([choosen.methods, choosen.quantities, choosen.times, choosen.charac]);
        worker.onmessage = function (e) {
            console.log('onmessage do worker', e.data);
            var results = e.data;
            $status.textContent = "Plotando os gráficos";
            setTimeout(function () {
                $status.classList.remove('show');
            }, 2000);
            /** Plotting the chart */
            var chartCtrl = new ChartController();
            var yValues = chartCtrl.fixValues(results);
            console.log("Y", yValues);
            chartCtrl.plotChart({
                x: choosen.quantities,
                y: yValues,
                id: 'chart',
                title: 'Tempo médio de execução',
                xaxis: {
                    title: 'Número de elementos'
                },
                yaxis: {
                    title: 'Tempo (ms)'
                },
                mode: 'scatter'
            });
            var $chartsNav = document.querySelector('#charts nav'), $chartsSection = document.querySelector('#charts section');
            Array.from($chartsNav.querySelectorAll('a:not(:first-child)')).forEach(function (el) {
                el.remove && el.remove();
            });
            Array.from($chartsSection.querySelectorAll(':scope > div:not(:first-child)')).forEach(function (el) {
                el.remove && el.remove();
            });
            $chartsNav.querySelector('a:first-child').classList.add('active');
            $chartsSection.querySelector(':scope > div:first-child').classList.add('active');
            for (var method in results) {
                var methodObj = {};
                for (var i in methods) {
                    if (methods[i].value == method)
                        methodObj = methods[i];
                }
                var $a = Template.chartNav({
                    method: method,
                    text: methodObj.text
                });
                $chartsNav.appendChild($a);
                var $div = Template.chartDiv({
                    id: method,
                    chartId: method + 'Chart'
                });
                $chartsSection.appendChild($div);
                chartCtrl.plotEachChart({
                    x: choosen.quantities,
                    y: yValues[method],
                    id: method + 'Chart',
                    title: 'Tempo médio de execução',
                    xaxis: {
                        title: 'Número de elementos'
                    },
                    yaxis: {
                        title: 'Tempo (ms)'
                    },
                    mode: 'scatter'
                });
            }
            /** Plotting the chart */
        };
    }
});
/**
 * ChartController
 */
var ChartController = (function () {
    function ChartController() {
    }
    ChartController.prototype.plotChart = function (options) {
        var x = options.x || [1, 2, 3], y = options.y || [];
        console.log("TESTE", x, y, options);
        var traces = [];
        for (var method in y) {
            traces.push({
                x: x,
                y: y[method].random,
                mode: options.mode,
                name: method
            });
        }
        var layout = {
            title: options.title,
            xaxis: {
                range: x
            },
            yaxis: {}
        };
        layout['xaxis']['title'] = options.xaxis.title || '';
        layout['yaxis']['title'] = options.yaxis.title || '';
        Plotly.newPlot(options.id, traces, layout);
    };
    ChartController.prototype.plotEachChart = function (options) {
        var x = options.x || [1, 2, 3], y = options.y || [];
        console.log("TESTE", x, y, options);
        var traces = [];
        for (var charac_1 in y) {
            traces.push({
                x: x,
                y: y[charac_1],
                mode: options.mode,
                name: charac_1
            });
        }
        var layout = {
            title: options.title,
            xaxis: {
                range: x
            },
            yaxis: {}
        };
        layout['xaxis']['title'] = options.xaxis.title || '';
        layout['yaxis']['title'] = options.yaxis.title || '';
        Plotly.newPlot(options.id, traces, layout);
    };
    ChartController.prototype.fixValues = function (values) {
        var _values = {};
        for (var method in values) {
            var objQuantities = values[method];
            _values[method] = {};
            for (var quantity in objQuantities) {
                var timesObj = objQuantities[quantity];
                for (var charac_2 in timesObj) {
                    _values[method][charac_2] = _values[method][charac_2] || [];
                    var avg = 0;
                    for (var i = 0, len = timesObj[charac_2].length; i < len; ++i) {
                        avg += timesObj[charac_2][i];
                    }
                    avg /= timesObj[charac_2].length;
                    _values[method][charac_2].push(avg);
                }
            }
        }
        return _values;
    };
    return ChartController;
}());
