const express = require('express');

const weather = require('./weather');
const places = require('./places');
const tweets = require('./tweets');
const cities = require('./cities');


const app = express();

app.use('/', express.static('client/build/'));

// Make hello world on /api/test

app.get('/api/helloWorld', (req, res) => {
  res.send('Hello World');
});

function helloJson(req, res) {
  res.json({
    clave: 'valor',
    clave_2: 'valor_2',
    una_lista: [1,2,3,4,5,6],
    objeto: {unalista: [{}, {}]},
    unEntero: 1,
    unString: 'string',
  });
}

app.use('/api/helloJson', helloJson);





// Make /api/hostInfo Endpoint
// Should return { numberOfCPus: , hostname, freeMem:}

app.get('/api/cities', cities);
app.get('/api/tweets', tweets);
app.get('/api/weather', weather);
app.get('/api/places', places);

app.listen(3001, () => {
  console.log('Service listening on port 3001!');
});