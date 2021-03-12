import axios from "axios";

const frase = axios.create({
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

const extraPhrases = axios.create({
  baseURL: "https://us-central1-diogobasso-site.cloudfunctions.net/frases",
  //baseURL: "localhost:4000/functions",for local env
});

const location = axios.create({
  baseURL: "https://ipapi.co/country_code/",
});

export { frase, nameAge, mercadoFin, extraPhrases, location };
