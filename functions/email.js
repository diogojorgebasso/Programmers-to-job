/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const nodemailer = require("nodemailer");
const functions = require("firebase-functions");
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const APP_NAME = "Site Diogo Basso";

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user subscribed to the Site.
  mailOptions.subject = `Bem vindo ao ${APP_NAME}!`;
  mailOptions.text = `Opa ${displayName + "!" || ""} Bem vindo ao meu site. 
  Espero que você tenha uma excelente experiência por aqui. 
  Asseguro, de antemão, que tudo será de valia para seu crescimento pessoal! 
  Coordialmente, Diogo.`;
  await mailTransport.sendMail(mailOptions);
  console.log("New welcome email sent to:", email);
  return null;
}

// Sends a goodbye email to the given user.
async function sendGoodbyeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <opa@diogobasso.com.br>`,
    to: email,
  };

  // The user unsubscribed to the newsletter.
  mailOptions.subject = `Até! ${displayName}`;
  mailOptions.text = `Nós confirmamos que seu email acaba de ser deletado do meu site. Qualquer feedback, por favor, sinta-se a vontade para responder esse email. Cordialmente, Diogo.`;
  await mailTransport.sendMail(mailOptions);
  console.log("Account deletion confirmation email sent to:", email);
  return null;
}

module.exports = { sendGoodbyeEmail, sendWelcomeEmail };
