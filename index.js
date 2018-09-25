require('dotenv').config();
const TeleBot = require('telebot');
const firebase = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const addNewPick = require('./addNewPick');
const urlRegex = require('url-regex');
const express = require('express');

const app = express();

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://sharepick-bot.firebaseio.com'
});

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);
bot.on(/\/picks?/i, (msg) => {
  	
  const pick  = (msg.text.match(urlRegex()) || [''])[0];
  if (pick !== '') {
    const db = firebase.database();
    addNewPick(pick, db, (error) => {
      if (error) return;
      bot.sendMessage(msg.chat.id, 'Pick added. Visit sharepick-bot.firebaseapp.com/fccCaracas to view all picks', { replyToMessage: msg.message_id });
    });
  }
  else {
      bot.sendMessage(msg.chat.id, 'Invalid pick. Try again and insert a valid http(s), please', { replyToMessage: msg.message_id });
  }

});
bot.start();
app.listen(3000);
