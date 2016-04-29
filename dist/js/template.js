var Template = (function () {
    var publicAPI;
    publicAPI = {
        methodInputGroup: _methodInputGroup
    };
    return publicAPI;
    /*************
     * Functions *
     *************/
    function _methodInputGroup(options) {
        var $li = document.createElement('li');
        $li.classList.add('form-group');
        var $input = document.createElement('input');
        $input.id = options.id || '';
        $input.type = options.type || 'text';
        $input.name = options.name || '';
        $input.value = options.value || '';
        var $label = document.createElement('label');
        $label.htmlFor = options.id;
        $label.textContent = options.text || '';
        $li.appendChild($input);
        $li.appendChild($label);
        return $li;
    }
})();
