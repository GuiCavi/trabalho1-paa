'use strict';

let methods = [
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

let quantities = [
	'20',
	'10000',
	'20000',
	'50000',
	'100000',
	'200000',
	'500000',
	'1000000'
];

let times = [ 10, 20, 30, 40 ];

let charac = [
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

window.addEventListener('load', () => {
	
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
	
	let $calculate = document.getElementById('calculate');
 
	$calculate.addEventListener('click', function(e) {
		e.preventDefault();
		
		/**
		 * Retrieving methods selected
		 */
		let $methods = document.querySelectorAll('input[name="method"]:checked');
		
		if ($methods.length <= 0) {
			alert('Selecione pelo menos 1 método de ordenação'); 
			return;
		}
		
		/**
		 * Retrieving how many times it will be executed
		 */
		let $times = document.querySelectorAll('input[name="times"]:checked');
		
		if ($times.length <= 0) {
			alert('Não foi escolhido nenhuma quantidade de repetições');
			return;
		}
		
		/**
		 * Retrieving the quantity of elements 
		 */  
		let $quantity = document.querySelectorAll('input[name="quantities"]:checked');
		
		if ($quantity.length <= 0) {
			alert('Não foi escolhido nenhuma quantidade de elementos');
			return;
		}
		
    /**
		 * Retrieving the charac of elements 
		 */  
		let $charac = document.querySelectorAll('input[name="charac"]:checked');
		
		if ($charac.length <= 0) {
			alert('Não foi escolhido nenhuma característca para os elementos');
			return;
		}
    
		/** If pass here, everything was choosen */
		
		let choosen = {
			methods: [],
			times: [],
			quantities: [],
      charac: []
		};
		
		for (var i = 0; i < $methods.length; i++) {
			choosen.methods.push((<HTMLInputElement>$methods[i]).value);    
		}
		for (var i = 0; i < $times.length; i++) {
			choosen.times.push((<HTMLInputElement>$times[i]).value);    
		}
		for (var i = 0; i < $quantity.length; i++) {
			choosen.quantities.push((<HTMLInputElement>$quantity[i]).value);    
		}
    for (var i = 0; i < $charac.length; i++) {
			choosen.charac.push((<HTMLInputElement>$charac[i]).value);    
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
		let $methods = document.getElementById('methods');
		for (let i = 0, len = methods.length; i < len; i++) {
			let $li = Template.methodInputGroup({
				id: methods[i].id,
				type: 'checkbox',
				name: 'method',
				value: methods[i].value,
				text: methods[i].text,
        checked: methods[i].checked
			});
		
			$methods.appendChild($li);
		}
		
		let $times = document.getElementById('times');
		for (let i = 0, len = times.length; i < len; i++) {
			let $li = Template.methodInputGroup({
				id: 'times-' + times[i],
				type: 'radio',
				name: 'times',
				value: times[i],
				text: times[i] + ' vezes'
			});
		
			$times.appendChild($li);
		}
		
		let $quantities = document.getElementById('quantities');
		for (let i = 0, len = quantities.length; i < len; i++) {
			let formattedNumber = (""+quantities[i]).split('').reverse().join('').match(/\d{1,3}/g).join('.').split('').reverse().join('');
			
			let $li = Template.methodInputGroup({
				id: 'quantities-' + quantities[i],
				type: 'checkbox',
				name: 'quantities',
				value: quantities[i],
				text: formattedNumber + ' elementos'
			});
		
			$quantities.appendChild($li);
		}
    
    let $charac = document.getElementById('charac');
		for (let i = 0, len = charac.length; i < len; i++) {
			let $li = Template.methodInputGroup({
				id: charac[i].id,
				type: 'checkbox',
				name: 'charac',
				value: charac[i].value,
				text: charac[i].text,
        checked: charac[i].checked
			});
		
			$charac.appendChild($li);
		}
	};
	
	/** Execute the choosen methods N times for the number of inputs */
	function executeFunctions(choosen) {
		let $status = document.getElementById('status');     
		let results = {};
    
    $status.textContent = 'Aguarde, estamos processando as entradas...';
    $status.classList.add('show');

		/** 
		 * ["insertionSort", "selectionSort", "heapSort"]
		 * ["10"]
		 * ["10000", "20000", "100000"]
		 */
    let worker = new Worker("dist/js/exec.js");
    worker.postMessage([choosen.methods, choosen.quantities, choosen.times, choosen.charac]);
    worker.onmessage = function(e) {
      console.log('onmessage do worker', e.data);
      
      let results = e.data;
      
      $status.textContent = "Plotando os gráficos";
      setTimeout(() => {
        $status.classList.remove('show');
      }, 2000);
      
      /** Plotting the chart */
      let chartCtrl: ChartController = new ChartController();
      let yValues = chartCtrl.fixValues(results);
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
      
      let $chartsNav = document.querySelector('#charts nav'),
          $chartsSection = document.querySelector('#charts section');
      Array.from($chartsNav.querySelectorAll('a:not(:first-child)')).forEach(function(el) {
        el.remove && el.remove();
      });
      Array.from($chartsSection.querySelectorAll(':scope > div:not(:first-child)')).forEach(function(el) {
        el.remove && el.remove();
      });
      
      $chartsNav.querySelector('a:first-child').classList.add('active');
      $chartsSection.querySelector(':scope > div:first-child').classList.add('active');
      for (let method in results) {
        let methodObj = {};
        for (let i in methods) {
          if (methods[i].value == method)
            methodObj = methods[i];
        }
        
        let $a = Template.chartNav({
          method: method,
          text: methodObj.text
        });        
        
        $chartsNav.appendChild($a);
        
        let $div = Template.chartDiv({
          id: method,
          chartId: method+'Chart'
        });
        
        $chartsSection.appendChild($div);
        
        chartCtrl.plotEachChart({
          x: choosen.quantities,
          y: yValues[method],
          id: method+'Chart',
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
    }
	}
	
});

/**
 * ChartController
 */
class ChartController {
	constructor() {
		
	}
	
	plotChart(options) {
		let x = options.x || [1, 2, 3],
        y = options.y || [];
		console.log("TESTE", x, y, options);
		
		let traces = [];
		
		for (let method in y) {
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
	}
  
  plotEachChart(options) {
    let x = options.x || [1, 2, 3],
        y = options.y || [];
		console.log("TESTE", x, y, options);
		
		let traces = [];
		
		for (let charac in y) {
      traces.push({
        x: x,
        y: y[charac],
        mode: options.mode, 
        name: charac
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
  }
	
	fixValues(values: Object) {
		let _values = {};
		
		for (let method in values) {
			let objQuantities = values[method];
      
      _values[method] = {};
			
			for (let quantity in objQuantities) {
				let timesObj = objQuantities[quantity];
				
				for (let charac in timesObj) {
          _values[method][charac] = _values[method][charac] || [];
        
          let avg = 0;
          for (let i = 0, len = timesObj[charac].length; i < len; ++i) {

  					avg += timesObj[charac][i];
            
          }
	  		
        	avg /= timesObj[charac].length;
  				_values[method][charac].push(avg);
          
				}				
			
			}
		}
    
		return _values;
	}
}