import accessibleAutocomplete from 'accessible-autocomplete';

const init = () => {
  window.accessibleAutocomplete = accessibleAutocomplete;

  var element = document.getElementById('buyerCountry');

  accessibleAutocomplete.enhanceSelectElement({
    selectElement: element,
    defaultValue: '',
  });
};

export default init();
