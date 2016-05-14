let Template = (function() {
  let publicAPI;
  
  publicAPI = {
    methodInputGroup: _methodInputGroup,
    chartNav: _chartNav
  }
  
  return publicAPI;
  
  /*************
   * Functions *
   *************/
  
  function _methodInputGroup(options) {
    let $li = document.createElement('li');
    
    let $input = document.createElement('input');
    $input.id = options.id || '';
    $input.type = options.type || 'text';
    $input.name = options.name || '';
    $input.value = options.value || '';
    $input.checked = options.checked || false;
    
    let $label = document.createElement('label');
    $label.htmlFor = options.id;
    $label.textContent = options.text || '';
    
    $li.appendChild($input);
    $li.appendChild($label);
    
    return $li;
  }
  
  function _chartNav(options) {
    let $a = document.createElement('a');
    $a.href = '#'+options.method;
    $a.textContent = options.text;
    
    return $a;
  }

})();