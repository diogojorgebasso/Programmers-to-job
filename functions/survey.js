"use strict";

const nodemailer = require("nodemailer");
const functions = require("firebase-functions");
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`
);

const LINK_TO_SURVEY = "https://forms.gle/XQ5JobcJ4vhhATcx8";
const LATEST_VERSION = "1.0";

/**
 * Sends an email pointing to the Upgraded App survey.
 */

async function sendSurveyEmail(email, name) {
  const mailOptions = {
    from: "Site Diogo <noreply@diogobasso.com.br>",
    to: email,
    subject: "O que está achando da nova versão?",
    text: `Eai ${
      name || ""
    }! Nós recentemente atualizamos nosso site! [muitas horas de trabalho kkkk]
           Será de grande valia para mim se conseguir responder o formulário abaixo, é rapidinho (menos de 20 segundos).
           Link: ${LINK_TO_SURVEY}.
           Desde já, muito obrigado pela confiança!
           Com os melhores cumprimentos, seu amigo Diogo.`,
  };

  await mailTransport.sendMail(mailOptions);
  console.log("Upgrade App Survey email sent to:", email);
}
module.exports = { LATEST_VERSION, sendSurveyEmail };
