const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./app/config/db');
const app = express();
const port = 8000;
const routes = require('./app/routes');

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) {
    return console.log(err);
  }
  routes(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
