var cityModel = cityModel || {};
var viewModel = viewModel || {};
var view = view || {};

$(function(){
  viewModel.assignModel();
  viewModel.updateAllData();
  ko.applyBindings(cityModel);
  view.map();
  view.setAll()
});




