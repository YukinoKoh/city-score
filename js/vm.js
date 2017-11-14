var Model = Model || {};
var VM = {};

VM ={
  get_all: function(){
    return Model;
  },
  get_by_name: function(name){
    // name converted to lowercase before calling this function
    for (var i=0; i<Model.length; i++){
      if (Model[i].name.toLowerCase() == name){
        return Model[i];
      }
    }
    console.log('no such city name at filter_name');
    return false;
  },
  update_data_all: function(){
    for (var i=0; i<Model.length; i++){
      city_name = Model[i].name.toLowerCase();
      this.update_data(city_name);
    }
    return true;
  },
  update_data: function(city_name){
    var teleportUrl = 'https://api.teleport.org/api/urban_areas/slug:'+city_name+'/scores/';
    var city = this.get_by_name(city_name);
    var success = false
    var items = [];
    var jsonq = $.getJSON( teleportUrl, function( data ) {
      score_list = data.categories;
      for (var i=0; i < score_list.length; i++){
        items.push({ 
          key: score_list[i]['name'],
          val: score_list[i]['score_out_of_10'] 
        });
        if (score_list[i]['name'] = 'Education'){
          city.education = score_list[i]['score_out_of_10'];
        }
        if (score_list[i]['name'] = 'Healthcare'){
          city.healthcare = score_list[i]['score_out_of_10'];
        }
      }
    }).done(function() {
      city.data=items;
      return true;
    }).fail(function() {
      console.log( "error" );
      return false;
    });
    
  },
};
