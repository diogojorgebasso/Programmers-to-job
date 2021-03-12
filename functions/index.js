//In order for firebase work.
const functions = require("firebase-functions");

const fetch = require("node-fetch"),
  slugify = require("slugify"),
  cheerio = require("cheerio"),
  iconv = require("iconv-lite"),
  cors = require("cors")({ origin: true });

const scrapePhrases = async (personagem) => {
  const baseUrl = "https://www.pensador.com/";
  const searchTerm = slugify(personagem, {
    replacement: "_",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  let contentPage = await fetchPage(searchTerm);
  let result = await extract(contentPage);

  return result.phrases;

  async function fetchPage(searchTerm) {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/${searchTerm}`)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) =>
          iconv.decode(Buffer.from(arrayBuffer), "utf-8").toString()
        )
        .then((body) => resolve(body))
        .catch((err) => reject(err));
    });
  }

  async function extract(htmlContent) {
    return new Promise((resolve, reject) => {
      try {
        let phrases = [];
        const $ = cheerio.load(htmlContent);
        $(".thought-card").each(function (i, e) {
          phrases.push({
            author: $(this).find("a").first().text(),
            text: $(this).find("p").first().text().replace(/\n/g, ""),
          });
        });
        phrases = phrases.splice(0, 3);
        resolve({ phrases, next });
      } catch (err) {
        reject(err);
      }
    });
  }
};

exports.frases = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const body = request.body;
    const frasesDoPensador = await scrapePhrases(body.text);
    response.send(frasesDoPensador);
  });
});
