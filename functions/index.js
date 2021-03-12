//In order for firebase work.
const functions = require("firebase-functions");

const enviando = require("node-fetch"),
  slugify = require("slugify"),
  cheerio = require("cheerio"),
  iconv = require("iconv-lite"),
  cors = require("cors")({ origin: true });

const scrapePhrases = async (personagem) => {
  const baseUrl = "https://www.pensador.com/";
  const searchTerm = slugify(`frases de ${personagem}`, {
    replacement: "_",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  let contentPage = await fetchPage(searchTerm);
  let result = await extract(contentPage);

  return result.phrases;

  async function fetchPage(searchTerm, current = 1) {
    return new Promise((resolve, reject) => {
      enviando(`${baseUrl}/${searchTerm}/${current}`)
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
        const phrases = [];
        const $ = cheerio.load(htmlContent);
        $(".thought-card").each(function (i, e) {
          phrases.push({
            author: $(this).find("a").first().text(),
            text: $(this).find("p").first().text().replace(/\n/g, ""),
          });
        });

        let next = false;
        $("#paginacao").each(function (i, e) {
          if ($(this).find(".nav").last().text().includes("xima")) {
            next = true;
          }
        });

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
