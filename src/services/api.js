import axios from "axios";

const frase = axios.create({
  baseURL: "http://api.quotable.io/random",
});

function nameAge(name) {
  return axios.create({
    baseURL: `https://api.agify.io/?name=${name}`,
  });
}
const mercadoFin = axios.create({
  baseURL: "https://mercadobitcoin.net/api/BTC/trades",
});

const extraPhrases = axios.create({
  baseURL: "localhost:4000/functions", //for local env
});
export { frase, nameAge, mercadoFin, extraPhrases };
