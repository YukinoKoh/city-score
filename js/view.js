var Model = Model || [];
var VM = VM || {};
var View = View || {};
var map;
var markers =[];

View = {
  // create initial map
  map: function(){
    var mapProp = {
      center: new google.maps.LatLng(51.508742,-0.120850),
      zoom: 5,
    };
    map = new google.maps.Map(document.getElementById("map"),mapProp);
    return map;
  },
  set_all: function(){
    var cities = VM.get_all();
    this.set_markers(cities);
  },
  // set markers and show list
  set_markers: function(cities){
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
        marker.setMap(map);
        // pin markers on the map
        // var infowindow = new google.maps.InfoWindow({
        //  content: cities[i].data
        // });
        // marker event listener
        marker.addListener('click', function(e) {
         // infowindow.open(map, marker);
         View.change_marker(marker.title);
         show_text(marker.title);
        });
        // create list dom
        text += '<li id="'+cities[i].name.toLowerCase()+'" class="cities-list" onclick="show_text(this.id)">'
                 +cities[i].name +'</li>';
      }());
    }
    $('#cities_name').append(text);
  },
  change_marker: function(city_name){
    for (var i=0; i<markers.length; i++){
      if (markers[i].title != city_name){
        markers[i].setIcon('img/marker1.svg');
      }else{
        markers[i].setIcon('img/marker2.svg');
      }
    }
  },
  // show city info at #info when clicked 
  append_info: function(city_name){
    city_name = city_name.toLowerCase();
    city = VM.get_by_name(city_name);
    var name='';
    if (city.name){
      name += '<span data-bind="text: name">'+city.name+'</span>';
    } else {
      text += 'error: error occured while retirieving the city name.';
    }
    $('#info-name').empty();
    $('#info-name').append(name);
    var text = ''
    var healthcare = city.healthcare;
    var education = city.education;
    if (healthcare && education){
      text += '<div class="i-score">';
      text += 'Healthcare score: <span data-bind="text: healthcare">'+healthcare+'</span><br>';
      text += 'Education score: <span data-bind="text: education">'+education+'</span>';
      text += '</div>';
    } else {
      text += 'error: no score data retrieved';
    }
    $('#info-data').empty();
    $('#info-data').append(text);
  }
}
function show_text(city_name){
  View.append_info(city_name);
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
    if (title.indexOf(filter) > -1){
      list_city.style.display="inline";
      markers[i].setVisible(true);
      found += 1;
    } else {
      list_city.style.display="none";
      markers[i].setVisible(false);
    }
  }
  if (found == 0){
    var text = 'No city is found with your search';
    $('#info-found').append(text);
  } else {
    $('#info-found').empty(); 
  }
}
