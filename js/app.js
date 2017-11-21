var cityModel = cityModel || {};
var filterCity = filterCity || {};
var headerError = headerError || {};
var viewModel = viewModel || {};
var view = view || {};

$(function(){
  viewModel.assignModel();
  viewModel.updateAllData();
  ko.applyBindings(headerError, document.getElementById('header'));
  ko.applyBindings(cityModel, document.getElementById('cities'));
  ko.applyBindings(filterCity, document.getElementById('filter'));
});




