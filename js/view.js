var vm = vm || {};
var markers = markers || [];

var view = {
  // create initial map
  map: function(){
    var mapProp = {
      center: new google.maps.LatLng(51.508742,-0.120850),
      zoom: 5,
    };
    map = new google.maps.Map(document.getElementById("map"),mapProp);
    return map;
  },
  setAll: function(){
    var cities = viewModel.getAll();
    this.setMarkers(cities);
  },
  // set markers and show list
  setMarkers: function(cities){
    var text = '';
    for (var i=0; i< cities.length; i++){
      (function(){
        var latLng = {lat: cities[i].lat, lng: cities[i].lng};
        var marker = new google.maps.Marker({
          position: latLng,
          icon: 'img/marker1.svg',
          title: cities[i].name,
          visible: true
        });
        // record markers to handle later
        markers.push(marker);
        // google map API to set the marker
        marker.setMap(map);
        marker.addListener('click', function(e) {
          viewModel.selectCity(marker.title);
        });
      }());
    }
  }
}

function filter(){
  $('#info-name').empty();
  $('#info-data').empty();
  var input = document.getElementById("input");
  var filter = input.value.toLowerCase();
  var found = 0;
  for (var i=0; i<markers.length; i++){
    var title = markers[i].title.toLowerCase();
    var list_city = document.getElementById(title);
    // match with the filter
    if (title.indexOf(filter) > -1){
      viewModel.show(title);
      markers[i].setVisible(true);
      found += 1;
    } else {
      viewModel.hide(title);
      markers[i].setVisible(false);
    }
  }
  if (found == 0){
    var text = 'No city is found with your search';
    $('#info-found').empty(); 
    $('#info-found').append(text);
  } else {
    $('#info-found').empty(); 
  }
}
