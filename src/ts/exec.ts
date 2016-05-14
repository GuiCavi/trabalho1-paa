importScripts("sort.js");

onmessage = function(e) {
  console.log('Dentro do worker');
  
  let choosen = {
    methods: e.data[0], 
    quantities: e.data[1],
    times: e.data[2],
    charac: e.data[3]
  }
  
  let results = exec(choosen);
  
  this.postMessage(results);
}

function exec(choosen) {

  let k = 0;
  let results = {};
  
  choosen.methods.forEach((method) => {
    
    results[method] = {};
    
    choosen.quantities.forEach((quantity) => {
      let elements = null;
      
      results[method][quantity] = [];
      
      _loadFile(quantity, function(data) {
        elements = data.split(/\n/g).map(parseFloat);
      });
      
      choosen.times.forEach((time) => {
        
        console.log(++k, method, quantity, time);
        
        for (let i = 0; i < time; ++i) {
          let sort = new Sort(),
              fn = sort[method],
              copy = elements.slice(0);
          
          let start = performance.now();
          fn(copy);
          let end = performance.now();
          
          console.log(i+1, end-start);
          results[method][quantity].push(end-start);
        }
        
      });
      
    });
  });
  
  return results;
  
};

function _loadFile(fileName, cb) {    
  let xhr = (XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
  
  xhr.open('GET', '../../assets/elements/'+fileName+'.txt', false);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb(xhr.responseText);
    }
  };    
  xhr.send();
}
