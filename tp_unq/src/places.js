const { mk_error_response, mk_ok_response } = require('./utils');

function mk_places_response(cityName) {
  return mk_ok_response(
    [
      {
        name: 'fakePlace',
        rating: 4.5,
        description: 'An excelente place to be'
      },
      {
        name: 'fake Mc Donald\'s',
        rating: 2.5,
        description: 'Cheap Fast Food',
      }
    ]
  );
}

function places(req, res) {
  try {
    const cityName = JSON.parse(req.query.city).name;
    res.json(mk_places_response(cityName));
  } catch (error) {
    res.json(mk_error_response(error));
  }
}

module.exports = places;