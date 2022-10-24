require('dotenv').config();
const PORT = process.env.PORT | 3000;

const express = require('express');
const controller = require('./controller.js');

const app = express();

app.use(express.json());

app.get('/questions/:id', async (req, res) => {
  // data is the array of questions that will be sent to the client
  let data = await new Promise((resolve, reject) => {
    // Do a search for the questions
    controller.getQuestions([req.params.id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  }).then(async (questions) => {
    // Questions have been found so create promises that will find each of their answers.
    let array = questions.map((question) => {
      return new Promise((resolve, reject) => {
        // Do a search for the answers
        controller.getAnswers([question.id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            question.answers = result.rows;
            resolve(result.rows);
          }
        });
      }).then(async (answers) => {
        // Answers have been found so create promises that will find each of their photos.
        let array = answers.map((answer) => {
          return new Promise((resolve, reject) => {
            controller.getPhotos([answer.id], (err, result) => {
              if (err) {
                reject(err);
              } else {
                answer.photos = result.rows;
                resolve();
              }
            });
          });
        });
        // Runs all promises for finding photos of the questions.
        await Promise.all(array);
      });
    });
    // Runs all promises for finding answers of the questions.
    await Promise.all(array);
    return questions;
  }).catch((err) => {
    res.status(404).send(err);
  });
  res.send(data);
});

app.get('/answers/:id', async (req, res) => {
  // data is the array of answers that will be sent to the client
  let data = await new Promise((resolve, reject) => {
    // Do a search for the answers
    controller.getAnswers([req.params.id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  }).then(async (answers) => {
    // Answers have been found so create the promises to find the photos
    let array = answers.map((answer) => {
      return new Promise((resolve, reject) => {
        // Do a search for the photos
        controller.getPhotos([answer.id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            answer.photos = result.rows;
            resolve();
          }
        });
      });
    });
    // Run all promises for finding the photos of the answers
    await Promise.all(array);
    return answers;
  }).catch((err) => {
    res.status(404).send(err);
  });
  res.send(data);
});

app.post('/questions', (req, res) => {
  //TODO: Add a question to the db, needs product id\
  let body = req.body;
  let params = [];
  controller.addQuestion(params, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log('Added a new question', result);
      res.status(201).send(result);
    }
  });
});

app.post('/answers', (req, res) => {
  //TODO: Add an answer to the db, needs question id
  let body = req.body;
  let params = [];
  controller.addAnswer(params, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log('Added a new answer', result);
      res.status(201).send(result);
    }
  });
});

app.put('/questions/helpful/:id', (req, res) => {
  //TODO: Add to the helpful value of a question, needs question id
  controller.qHelpful([req.params.id], (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(`Marked question number ${req.params.id} as helpful`);
      res.status(200).send(result);
    }
  });
});

app.put('/questions/report/:id', (req, res) => {
  //TODO: Mark a question as reported, needs question id
  controller.qReport([req.params.id], (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(`Reported question number ${req.params.id}`);
      res.status(200).send(result);
    }
  });
});

app.put('/answers/helpful/:id', (req, res) => {
  //TODO: Add to the helpful value of an answer, needs answer id
  controller.aHelpful([req.params.id], (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(`Marked answer number ${req.params.id} as helpful`);
      res.status(200).send(result);
    }
  });
});

app.put('/answers/report/:id', (req, res) => {
  //TODO: Mark an answer as reported, needs answer id
  controller.aReport([req.params.id], (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(`Reported answer number ${req.params.id}`);
      res.status(200).send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
