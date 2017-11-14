const GooglePlaces = require('node-googleplaces');
const config = require('./config');

const placesApi = new GooglePlaces(config.auth.googleplaces);

function cities(req, res) {
  const keyword = req.query.keyword;
  placesApi.queryAutocomplete({
    input: keyword,
    type: 'cities',
    language: 'es',
  }).then((response) => {
    return response.body.predictions;
  }).then((predictions) => {
    return predictions.map((prediction) => ({
      name: prediction.structured_formatting.main_text,
      fullname: prediction.description,
      matched_substrings: prediction.matched_substrings,
      place_id: prediction.place_id,
    }));
  }).then((cities) => {
    return res.json(cities);
  }).catch((error) => console.error(error)

  );
}

module.exports = cities;