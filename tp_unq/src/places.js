const config = require('./config');
const { mk_error_response, mk_ok_response } = require('./utils');

const GooglePlaces = require('node-googleplaces');
const placesApi = new GooglePlaces(config.auth.googleplaces);


function mk_param(response){
  let data_response = JSON.parse(response.text).result.geometry;
  let lat = data_response.location.lat.toString();
  let lng = data_response.location.lng.toString();
  
  let param = {
    location: lat+','+lng,
    radius: '2000',
    types: ['bar','food','restaurant'],
  };
  return param;
}

function take_max_elem(array,num){
  return array.sort(function (e1,e2) {return e2.rating - e1.rating}).slice(0,num);
}

function make_place_response(array){
  return array.map(x => ({name: x.name,rating: x.rating,}));
}

function places(req, res) {
  
  const placeID = JSON.parse(req.query.city).place_id;
  placesApi.details({place_id: placeID}).then(
    (response) =>
      placesApi.nearbySearch(mk_param(response))
  ).then(
    (response) =>{
      let data_response = take_max_elem(JSON.parse(response.text).results,2)
      let new_response = make_place_response(data_response)
      res.json(mk_ok_response(new_response))
    }
  ).catch(
    (error) =>{
      res.json(mk_error_response(error.message))
    }
  )
    
}

module.exports = places;