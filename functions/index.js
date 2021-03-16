//Import modules
const scrape = require("./scrape");
const emailModule = require("./email");
const payment = require("./payment");
const survey = require("./survey");
//Import firebase stuff
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
//import security stuff
const cors = require("cors")({ origin: true });

exports.frases = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const body = request.body;
    const frasesDoPensador = await scrape(body.text);
    response.send(frasesDoPensador);
  });
});

exports.payment = functions.https.onRequest(payment); //TESTME:

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  return emailModule.sendWelcomeEmail(email, displayName);
});

exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  const email = user.email;
  const displayName = user.displayName;

  return emailModule.sendGoodbyeEmail(email, displayName);
});

exports.sendAppUpdateSurvey = functions.analytics
  .event("app_update")
  .onLog(async (event) => {
    const uid = event.user.userId;
    const appVersion = event.user.appInfo.appVersion;

    // Check that the user has indeed upgraded to the latest version.
    if (appVersion === survey.LATEST_VERSION) {
      // Fetch the email of the user. In this sample we assume that the app is using Firebase Auth and
      // has set the Firebase Analytics User ID to be the same as the Firebase Auth uid using the
      // setUserId API.
      const user = await admin.auth().getUser(uid);
      const email = user.email;
      const name = user.displayName;
      return survey.sendSurveyEmail(email, name);
    }
    return null;
  });
