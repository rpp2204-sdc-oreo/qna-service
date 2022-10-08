require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const controller = require('./controller.js');

const app = express();

app.get('/questions/:id', (req, res) => {
  //TODO: Retrieve questions for a product
});

app.get('/answers/:id', (req, res) => {
  //TODO: Retrieve answers and their photos for a question
});

app.post('/questions', (req, res) => {
  //TODO: Add a question to the db, needs product id
});

app.post('/answers', (req, res) => {
  //TODO: Add an answer to the db, needs question id
});

app.put('/questions/helpful', (req, res) => {
  //TODO: Add to the helpful value of a question, needs question id
});

app.put('/questions/report', (req, res) => {
  //TODO: Mark a question as reported, needs question id
});

app.put('/answers/helpful', (req, res) => {
  //TODO: Add to the helpful value of an answer, needs answer id
});

app.put('/answers/report', (req, res) => {
  //TODO: Mark an answer as reported, needs answer id
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});