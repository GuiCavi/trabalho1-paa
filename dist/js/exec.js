importScripts("sort.js");
onmessage = function (e) {
    console.log('Dentro do worker');
    var choosen = {
        methods: e.data[0],
        quantities: e.data[1],
        times: e.data[2],
        charac: e.data[3]
    };
    var results = exec(choosen);
    this.postMessage(results);
    close();
};
function exec(choosen) {
    var k = 0;
    var results = {};
    choosen.methods.forEach(function (method) {
        results[method] = {};
        choosen.quantities.forEach(function (quantity) {
            var elements = null;
            results[method][quantity] = {};
            _loadFile(quantity, function (data) {
                elements = data.split(/\n/g).map(parseFloat);
            });
            choosen.times.forEach(function (time) {
                choosen.charac.forEach(function (charac) {
                    results[method][quantity][charac] = [];
                    console.log(++k, method, quantity, time, charac);
                    for (var i = 0; i < time; ++i) {
                        var sort = new Sort(), fn = sort[method], copy = charac == 'random' ?
                            elements.slice(0) :
                            (charac == 'ascending' ?
                                elements.slice(0).sort() :
                                elements.slice(0).sort().reverse());
                        var start = performance.now();
                        fn(copy);
                        var end = performance.now();
                        console.log(i + 1, end - start);
                        results[method][quantity][charac].push(end - start);
                    }
                });
            });
        });
    });
    return results;
}
;
function _loadFile(fileName, cb) {
    var xhr = (XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
    xhr.open('GET', '../../assets/elements/' + fileName + '.txt', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb(xhr.responseText);
        }
    };
    xhr.send();
}
