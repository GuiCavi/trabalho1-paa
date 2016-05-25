'use strict';
var debug;
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
var times = [1, 10, 20, 30, 40];
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
    debug = new Debug();
    initInputs();
    initCharts();
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
    function initCharts() {
        /** Initial state for random entries */
        new ChartController().plotChart({
            x: quantities.map(parseFloat),
            id: 'timeForRandom',
            title: 'Tempo médio de execução',
            mode: 'scatter',
            layout: {
                xaxis: {
                    title: 'Número de elementos'
                },
                yaxis: {
                    title: 'Tempo (ms)'
                }
            }
        });
        new ChartController().plotChart({
            x: quantities.map(parseFloat),
            y: [],
            id: 'swapForRandom',
            title: 'Número de trocas no tempo médio',
            type: 'bar',
            layout: {
                xaxis: {
                    title: 'Número de elementos'
                },
                yaxis: {
                    title: 'Número de trocas'
                }
            }
        });
        /** Initial state for random entries */
        /** Initial state for ascending entries */
        new ChartController().plotChart({
            x: quantities.map(parseFloat),
            y: [],
            id: 'timeForAscending',
            title: 'Número de trocas no tempo médio',
            type: 'bar',
            layout: {
                xaxis: {
                    title: 'Número de elementos'
                },
                yaxis: {
                    title: 'Tempo (ms)'
                }
            }
        });
        new ChartController().plotChart({
            x: quantities.map(parseFloat),
            y: [],
            id: 'swapForAscending',
            title: 'Número de trocas no tempo médio',
            type: 'bar',
            layout: {
                xaxis: {
                    title: 'Número de elementos'
                },
                yaxis: {
                    title: 'Número de trocas'
                }
            }
        });
        /** Initial state for ascending entries */
        /** Initial state for descending entries */
        new ChartController().plotChart({
            x: quantities.map(parseFloat),
            y: [],
            id: 'timeForDescending',
            title: 'Número de trocas no tempo médio',
            type: 'bar',
            layout: {
                xaxis: {
                    title: 'Número de elementos'
                },
                yaxis: {
                    title: 'Tempo (ms)'
                }
            }
        });
        new ChartController().plotChart({
            x: quantities.map(parseFloat),
            y: [],
            id: 'swapForDescending',
            title: 'Número de trocas no tempo médio',
            type: 'bar',
            layout: {
                xaxis: {
                    title: 'Número de elementos'
                },
                yaxis: {
                    title: 'Número de trocas'
                }
            }
        });
        /** Initial state for descending entries */
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
            var results = e.data['0'];
            var swaps = e.data['1'];
            $status.textContent = "Plotando os gráficos";
            setTimeout(function () {
                $status.classList.remove('show');
            }, 2000);
            /** Plotting the chart */
            var chartCtrl = new ChartController();
            var yValues = chartCtrl.fixValues(results, average);
            var swapValues = chartCtrl.fixValues(swaps, numOfSwaps);
            console.log("Y", yValues, swapValues);
            for (var i = 0, len = choosen.charac.length; i < len; ++i) {
                /** Plotting charts random entries */
                chartCtrl.plotChart({
                    x: choosen.quantities,
                    y: yValues,
                    id: 'timeFor' + (choosen.charac[i].charAt(0).toUpperCase() + choosen.charac[i].substr(1)),
                    which: choosen.charac[i],
                    title: 'Tempo médio de execução',
                    mode: 'scatter',
                    layout: {
                        xaxis: {
                            title: 'Número de elementos',
                            tickmode: 'array',
                            autotick: false,
                            type: 'category'
                        },
                        yaxis: {
                            title: 'Tempo (ms)'
                        }
                    }
                });
                chartCtrl.plotChart({
                    x: choosen.quantities,
                    y: swapValues,
                    id: 'swapFor' + (choosen.charac[i].charAt(0).toUpperCase() + choosen.charac[i].substr(1)),
                    which: choosen.charac[i],
                    title: 'Número de trocas no tempo médio',
                    type: 'bar',
                    layout: {
                        xaxis: {
                            title: 'Número de elementos',
                            tickmode: 'array',
                            autotick: false,
                            type: 'category'
                        },
                        yaxis: {
                            title: 'Número de trocas'
                        },
                        barmode: 'stack'
                    }
                });
            }
            var $chartsNav = document.querySelector('#charts nav'), $chartsSection = document.querySelector('#charts section');
            Array.from($chartsNav.querySelectorAll('a:not(.nr)')).forEach(function (el) {
                el.remove && el.remove();
            });
            Array.from($chartsSection.querySelectorAll(':scope > div:not(.nr)')).forEach(function (el) {
                el.remove && el.remove();
            });
            $chartsNav.querySelector('a.nr:first-child').classList.add('active');
            $chartsSection.querySelector(':scope > div.nr:first-child').classList.add('active');
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
                    // id: method+'Chart',
                    id: 'timeFor' + method + 'Chart',
                    mode: 'scatter',
                    layout: {
                        title: 'Comportamento para diferentes entradas (' + methodObj.text + ')',
                        xaxis: {
                            title: 'Número de elementos',
                            tickmode: 'array',
                            autotick: false,
                            type: 'category'
                        },
                        yaxis: {
                            title: 'Tempo(ms)'
                        },
                    }
                });
                chartCtrl.plotEachChart({
                    x: choosen.quantities,
                    y: swapValues[method],
                    id: 'swapFor' + method + 'Chart',
                    title: 'Número de trocas no tempo médio',
                    type: 'bar',
                    layout: {
                        xaxis: {
                            title: 'Número de elementos',
                            tickmode: 'array',
                            autotick: false,
                            type: 'category'
                        },
                        yaxis: {
                            title: 'Número de trocas'
                        },
                        barmode: 'stack'
                    }
                });
            }
            /** Plotting the chart */
        };
    }
    function average(arr) {
        var avg = 0, _values = [];
        for (var i = 0, len = arr.length; i < len; ++i) {
            avg += arr[i];
        }
        avg /= arr.length;
        _values.push(avg);
        return _values;
    }
    function numOfSwaps(arr) {
        return arr[0];
    }
});
/**
 * ChartController
 */
var ChartController = (function () {
    function ChartController() {
    }
    ChartController.prototype.plotChart = function (options) {
        var x = options.x || [1, 2, 3];
        var y = options.y || [];
        console.log("TESTE", x, y, options);
        var traces = [];
        for (var method in y) {
            traces.push({
                x: x,
                y: y[method][options.which],
                name: method
            });
            options.mode && (traces[traces.length - 1]['mode'] = options.mode);
            options.type && (traces[traces.length - 1]['type'] = options.type);
        }
        debug.p(traces);
        var layout = options.layout;
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
                name: charac_1
            });
            options.mode && (traces[traces.length - 1]['mode'] = options.mode);
            options.type && (traces[traces.length - 1]['type'] = options.type);
        }
        var layout = options.layout;
        Plotly.newPlot(options.id, traces, layout);
    };
    ChartController.prototype.fixValues = function (values, cb) {
        var _values = {};
        for (var method in values) {
            var objQuantities = values[method];
            _values[method] = {};
            for (var quantity in objQuantities) {
                var timesObj = objQuantities[quantity];
                for (var charac_2 in timesObj) {
                    _values[method][charac_2] = _values[method][charac_2] || [];
                    _values[method][charac_2] = _values[method][charac_2].concat(cb(timesObj[charac_2]));
                }
            }
        }
        return _values;
    };
    return ChartController;
}());
var Debug = (function () {
    function Debug() {
        this.area = document.getElementById('debug');
        this.codeArea = this.area.querySelector('pre');
        this.closeButton = this.area.querySelector('i.mdi');
        this.closeArea = this.closeArea.bind(this);
        this.openArea = this.openArea.bind(this);
        this.addEventListeners();
    }
    ;
    Debug.prototype.addEventListeners = function () {
        this.closeButton.addEventListener('click', this.closeArea);
    };
    Debug.prototype.closeArea = function () {
        this.area.classList.remove('opened');
    };
    Debug.prototype.openArea = function () {
        this.area.classList.add('opened');
    };
    Debug.prototype.e = function () { };
    Debug.prototype.i = function () { };
    Debug.prototype.p = function (str) {
        this.openArea();
        this.codeArea.textContent = JSON.stringify(str, null, 2);
    };
    return Debug;
}());
