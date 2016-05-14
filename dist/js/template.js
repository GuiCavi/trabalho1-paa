var Template = (function () {
    var publicAPI;
    publicAPI = {
        methodInputGroup: _methodInputGroup,
        chartNav: _chartNav
    };
    return publicAPI;
    /*************
     * Functions *
     *************/
    function _methodInputGroup(options) {
        var $li = document.createElement('li');
        var $input = document.createElement('input');
        $input.id = options.id || '';
        $input.type = options.type || 'text';
        $input.name = options.name || '';
        $input.value = options.value || '';
        $input.checked = options.checked || false;
        var $label = document.createElement('label');
        $label.htmlFor = options.id;
        $label.textContent = options.text || '';
        $li.appendChild($input);
        $li.appendChild($label);
        return $li;
    }
    function _chartNav(options) {
        var $a = document.createElement('a');
        $a.href = '#' + options.method;
        $a.textContent = options.text;
        return $a;
    }
})();
