const { mk_error_response, mk_ok_response } = require('./utils.js');


function mk_weather_response(cityName) {
  return mk_ok_response(
    {
      lastBuildDate: new Date(),
      location: cityName,
      wind: '50',
      current: Math.random()*30,
    }
  );
}

module.exports = function (req, res) {
  try {
    const cityName = JSON.parse(req.query.city).name;
    res.json(mk_weather_response(cityName));
  } catch (error) {
    res.json(mk_error_response(error));
  }
};