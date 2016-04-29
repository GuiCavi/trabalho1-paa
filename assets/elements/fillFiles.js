var fs = require('fs'),
    path = require('path');

var numbers = {};

fs.readdir('./', function(err, files) {
  if (err) throw err;
  
  console.log(process.argv);
  
  var fileName = path.basename(process.argv[1]);
  for (var i = 0; i < files.length; i++) {
    if (files[i] != fileName) {
      console.log(files[i]);
      
      var len = files[i].substr(0, files[i].indexOf('.'));
      len = parseInt(len);
      
      numbers[len] = [];
      
      for (var j = 0; j < len; j++) {
        var n = parseInt(Math.random() * 10000);
        numbers[len].push(n);
      }
      
    }
  }
  
  for (var i in numbers) {
    fs.writeFile(i + '.txt', numbers[i].toString().replace(/,/g, '\n'));
  }
});