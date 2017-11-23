const { mk_error_response, mk_ok_response } = require('./utils.js');
const rp = require('request-promise');


function mk_weather_response(yahoo_response) {
  return mk_ok_response(
    {
      lastBuildDate: yahoo_response.query.results.channel.lastBuildDate,
      location: yahoo_response.query.results.channel.location,
      units: yahoo_response.query.results.channel.units,
      current: yahoo_response.query.results.channel.item.condition,
      forecast: yahoo_response.query.results.channel.item.forecast
    }
  );
}

module.exports = function (req, res) {
  
    const cityName = JSON.parse(req.query.city).name;
    let params = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+cityName+'")';
    let req_params = {q:params};
    let option ={
      uri: 'https://query.yahooapis.com/v1/public/yql',
      qs: req_params,
      json: true,
      enconding: 'utf8',
    };

   rp(option).then(
     (yahoo_response) =>
      res.json(mk_weather_response(yahoo_response) )
   ).catch(
     (err) =>
      res.json(mk_error_response(err))
   )
    
};