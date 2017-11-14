$(function(){
  View.map();
  View.set_all();
  VM.update_data_all();
  ko.applyBindings(Model);
});

var Model = Model || {};
var View = View || {};
var map;
var C = {};



