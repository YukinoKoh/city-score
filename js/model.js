var cityList = [
  {
    name: 'London',
    lat: 51.507351,
    lng: -0.127758
  },{
    name: 'Berlin',
    lat: 52.520007,
    lng: 13.404954,
  },{
    name: 'Paris',
    lat: 48.856614,
    lng: 2.352222,
  },{
    name: 'Luxembourg',
    lat: 49.815273,
    lng: 6.129583,
  },{
    name: 'Frankfurt',
    lat: 50.110922,
    lng: 8.682127,
  }
]

var headerError = {
  eHeader: ko.observable(''),
  eMap: ko.observable('')
}
var filterCity ={ 
  fCity: ko.observable(''),
  error: ko.observable('')
}

var markers = markers || [];
var cityModel = [];

var viewModel = {
  assignModel: function(){
    for (var i=0; i<cityList.length; i++){
      cityModel.push({
        id: i,
        name: cityList[i].name, 
        lat: cityList[i].lat,
        lng: cityList[i].lng,
        housing: ko.observable(0),
        education: ko.observable(0),
        showCity: ko.observable(true),
        showInfo: ko.observable(false),
        clickCity: function() {
          viewModel.selectCity(this.name);
        }
      });
    }
  },
  deleteInfo: function(){
    for (var i=0; i<cityModel.length; i++){
      cityModel[i].showInfo(false);
    }
    return true;
  },
  getByName: function(name){
    // name converted to lowercase before calling this function
    for (var i=0; i<cityModel.length; i++){
      if (cityModel[i].name.toLowerCase() == name){
        return cityModel[i];
      }
    }
  },
  getAll: function(){
    return cityModel;
  },
  selectCity: function(name){
    var city_name = name.toLowerCase();
    this.deleteInfo();
    var city = this.getByName(city_name);
    change_marker(city.name);
    city.showInfo(true);
  },
  updateAllData: function(){
    for (var i=0; i<cityModel.length; i++){
      city_name = cityModel[i].name.toLowerCase();
      this.updateData(city_name);
    }
    return true;
  },
  updateData: function(city_name){
    var teleportUrl = 'https://api.teleport.org/api/urban_areas/slug:'+city_name+'/scores/';
    var city = this.getByName(city_name);
    var success = false
    var items = [];
    var error_dom = '#header-error';
    var jsonq = $.getJSON( teleportUrl, function( data ) {
      score_list = data.categories;
      for (var i=0; i < score_list.length; i++){
        items.push({ 
          key: score_list[i]['name'],
          val: score_list[i]['score_out_of_10']
        });
        if (score_list[i]['name'] == 'Housing'){
          city.housing(score_list[i]['score_out_of_10']);
        }
        if (score_list[i]['name'] == 'Education'){
          city.education(score_list[i]['score_out_of_10']);
        }
      }
    }).done(function() {
      city.score = items;
      return true;
    }).fail(function() {
      var text = "[Error!!] Error occured while retrieving the score data from Teleport."; 
      headerError.eHeader(text);
      return false;
    });
  },
  show: function(city_name){
    city_name = city_name.toLowerCase();
    var city = this.getByName(city_name);
    city.showCity(true);
  },
  hide: function(city_name){
    city_name = city_name.toLowerCase();
    var city = this.getByName(city_name);
    city.showCity(false);
  }
}
  function change_marker(city_name){
    for (var i=0; i<markers.length; i++){
      if (markers[i].title != city_name){
        markers[i].setIcon('img/marker1.svg');
      }else{
        markers[i].setIcon('img/marker2.svg');
      }
    }
  }

