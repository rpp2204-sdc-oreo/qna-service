const fs = require('fs');
const parser = require('csv-parser');
const db = require ('../server/controller.js');

/* Ran into problems trying to load the database this way as it requires too much space on my computer to hold as many queries as it was trying to make and they couldn't be cleared out fast enough in order to make space for the rest.
Each of the read streams must also be run while the others are commented out in order to prevent them firing at the same time. I am not fully versed in how to go about using async/await, but these may do better when wrapped in promises.*/
async function loadData() {
  // Read stream for questions
  await fs.createReadStream('./data/questions.csv')
  .on('error', (error) => {
    console.log('ERROR IN QUESTIONS:', error);
  })
  .pipe(parser())
  .on('data', (row) => {
    console.log(row.id);
    let params = [row.id, row.product_id, row.body, row.date_written, row.asker_name, row.asker_email, row.reported, row.helpful];
    db.addQuestion(params, (err, res) => {
      if (err) {
        console.log('ERROR: Adding question in etl.js');
      } else {
        //console.log(res);
      }
    });
  })
  .on('end', () => {
    console.log('Finished reading questions');
  });
  //Read stream for answers
  await fs.createReadStream('./data/answers.csv')
  .on('error', (error) => {
    console.log('ERROR IN ANSWERS:', error);
  })
  .pipe(parser())
  .on('data', (row) => {
    console.log(row.id);
    let params = [row.id, row.question_id, row.body, row.date_written, row.answerer_name, row.answerer_email, row.reported, row.helpful];
    db.addAnswer(params, (err, res) => {
      if (err) {
        console.log('ERROR: Adding an answer in etl.js');
      } else {
        //console.log(res);
      }
    });
  })
  .on('end', () => {
    console.log('Finished reading answers');
  });
  // Read stream for photos
  await fs.createReadStream('./data/answers_photos.csv')
  .on('error', (error) => {
    console.log('ERROR IN PHOTOS:', error);
  })
  .pipe(parser())
  .on('data', (row) => {
    //console.log(row.id);
    let params = [row.id, row.answer_id, row.url];
    db.addPhoto(params, (err, res) => {
      if (err) {
        console.log('ERROR: Adding a photo in etl.js');
      } else {
        //console.log(res);
      }
    });
  })
  .on('end', () => {
    console.log('Finished reading photos');
  });
}

loadData();