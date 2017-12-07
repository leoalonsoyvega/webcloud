const Twitter = require('twitter');
const config = require('./config');
const promisify = require('util').promisify;
const { mk_error_response, mk_ok_response } = require('./utils');
const key_yandex = 'trnsl.1.1.20171123T231407Z.07bdcf1e0513b995.166154da9d6b0d02de2c8ab55a13f7c287629271';
const yandex = require('yandex-translate')(key_yandex);
const translate = promisify(yandex.translate);

/*
library doc - https://www.npmjs.com/package/twitter
twitter API doc - https://developer.twitter.com/en/docs/api-reference-index
twitter API - tweet object - https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
twitter API - user object - https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object


Obtener user credentials:
  1. Loggearse a twitter
  2. IR a https://apps.twitter.com/
  3. Crear una app
     - en website poner http://www.example.com
  4. Ir a Keys and
  5. Poner las credenciales en el archivo config.js
*/

const client = new Twitter(config.auth.twitter);

function followers_count(data){
  return data.user.followers_count;
};

function user_max_followers(array){
  return array.reduce(function (prev,curr) {
      return followers_count(prev) > followers_count(curr) ? prev : curr;
  });
};

function mk_tweets_user(response){
  return response.map(x => ({text: x.text, author: x.user.screen_name, lang: x.lang}))
};

function mk_translator(data){
  return translate(data.text,{to:'es'}).then(
    (res) => {
      return {
      text_original: data.text,
      text: res.text,
      author: data.user.screen_name,
      lang: data.lang,}
    }
  )
  
};



function tweets(req, res) {
  const city = JSON.parse(req.query.city);
  const cityName = city.name;
  const params = {
    q: cityName,
    count: 10,
  };
  
  client.get('search/tweets', params).then(
    (response) => 
     user_max_followers(response.statuses)
).then(
    (response) => 
     client.get('statuses/user_timeline', { screen_name: response.user.screen_name, count: 2})
).then(
  (response) =>
     Promise.all(response.map(x => mk_translator(x)))
).then(
  (response) =>{
    res.json(mk_ok_response(response))}
).catch(
    (error) => res.json(
      res.json(mk_error_response(error)))
)

};

module.exports = tweets;