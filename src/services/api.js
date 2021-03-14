import axios from "axios";

const fraseInicial = axios.create({
  baseURL: "http://api.quotable.io/random",
});

function nameAge(name, location) {
  console.log(location);
  return axios.create({
    baseURL: `https://api.agify.io/?name=${name}&country_id=${location}`,
  });
}

const mercadoFin = axios.create({
  baseURL: "https://mercadobitcoin.net/api/BTC/trades",
});

const newPhrase = axios.create({
  baseURL: "https://us-central1-diogobasso-site.cloudfunctions.net/frases",
  //baseURL: "http://localhost:5001/diogobasso-site/us-central1/frases", //for local env
});

const locationClient = axios.create({
  baseURL: "https://ipapi.co/country_code/",
});
const RocketNews = axios.create({
  baseURL: "https://spaceflightnewsapi.net/api/v2/articles?_limit=4",
});

export {
  fraseInicial,
  RocketNews,
  nameAge,
  mercadoFin,
  newPhrase,
  locationClient,
};
