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

let quantities = [
  '20',
  '10000',
  '20000',
  '50000',
  '100000',
  '200000',
  '500000'
];

let times = [ 10, 20, 30, 40 ];

window.addEventListener('load', () => {
  
  initInputs();
  
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
    
    /** If pass here, everything was choosen */
    
    let choosen = {
      methods: [],
      times: [],
      quantities: []
    };
    
    for (var i = 0; i < $methods.length; i++) {
      choosen.methods.push((<HTMLInputElement>$methods[i]).value); //VSCode shows an error, but it doesn't exists    
    }
    for (var i = 0; i < $times.length; i++) {
      choosen.times.push((<HTMLInputElement>$times[i]).value); //VSCode shows an error, but it doesn't exists    
    }
    for (var i = 0; i < $quantity.length; i++) {
      choosen.quantities.push((<HTMLInputElement>$quantity[i]).value); //VSCode shows an error, but it doesn't exists    
    }
    
    console.log(choosen.methods);
    console.log(choosen.times);
    console.log(choosen.quantities);
    
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
        text: times[i] + ' vezes',
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
        text: formattedNumber + ' elementos',
      });
    
      $quantities.appendChild($li);
    }
  };
  
  /** Execute the choosen methods N times for the number of inputs */
  function executeFunctions(choosen) {
    let $executing = document.getElementById('executing');
    $executing.style.transition = 'opacity 0.3s cubic-bezier(0,0,0.3,1)';
    $executing.style.opacity = '1';
    
    let results = {};
    
    /** 
     * ["insertionSort", "selectionSort", "heapSort"]
     * ["10"]
     * ["10000", "20000", "100000"]
     */
    let i = 0;
    choosen.methods.forEach((method) => {
      
      results[method] = {};
      
      choosen.quantities.forEach((quantity) => {
        let elements = null;
        
        results[method][quantity] = [];
        
        _loadFile(quantity, function(data) {
          elements = data.split(/\n/g).map(parseFloat);
        });
        
        choosen.times.forEach((time) => {
          
          console.log(++i, method, quantity, time);
          
          for (let i = 0; i < time; ++i) {
            // console.log(elements);
            
            let sort = new Sort(),
                fn = sort[method];
            
            let start = performance.now();
            fn(elements.slice(0));
            let end = performance.now();
            
            console.log(i+1, end-start);
            results[method][quantity].push(end-start);
            
            // console.log(elements);
          }
          
        });
        
      });
      
    });
    
    console.dir(results);
    
    /** Testing */
    let chartCtrl: ChartController = new ChartController();
    let yValues = chartCtrl.fixValues(results);
    chartCtrl.plotChart(choosen.quantities, yValues);
    /** Testing */
    
}
  
  function _loadFile(fileName, cb) {    
    let xhr = (XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
    
    xhr.open('GET', './assets/elements/'+fileName+'.txt', false);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        cb(xhr.responseText);
      }
    };    
    xhr.send();
  }
  
});

/**
 * ChartController
 */
class ChartController {
  constructor() {
    
  }
  
  plotChart(x, values: Object) {
    console.log(values);
    
    let traces = [];
    
    for (let method in values) {
      traces.push({
        x: x,
        y: values[method],
        mode: 'scatter', 
        name: method
      });
    }
    
    var layout = {
      title: 'Teste',
      xaxis: {
        range: x
      }
    }
    
    Plotly.newPlot('chart', traces, layout);
  }
  
  fixValues(values: Object) {
    let _values = {};
    
    for (let method in values) {
      let objQuantities = values[method];
      
      _values[method] = [];
      
      for (let quantity in objQuantities) {
        let arrayTimes = objQuantities[quantity];
        
        let avg = 0;
        
        for (let i = 0; i < arrayTimes.length; ++i) {
          avg += arrayTimes[i];
        }
        
        avg /= arrayTimes.length;
        
        _values[method].push(avg);
      }
    }
    
    return _values;
  }
}