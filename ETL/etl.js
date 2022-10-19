const fs = require('fs');
const parser = require('csv-parser');
const db = require ('../server/controller.js');

async function loadData() {
  // Read stream for questions
  // await fs.createReadStream('./data/questions.csv')
  // .on('error', (error) => {
  //   console.log('ERROR IN QUESTIONS:', error);
  // })
  // .pipe(parser())
  // .on('data', (row) => {
  //   console.log(row.id);
  //   let params = [row.id, row.product_id, row.body, row.date_written, row.asker_name, row.asker_email, row.reported, row.helpful];
  //   db.addQuestion(params, (err, res) => {
  //     if (err) {
  //       console.log('ERROR: Adding question in etl.js');
  //     } else {
  //       //console.log(res);
  //     }
  //   });
  // })
  // .on('end', () => {
  //   console.log('Finished reading questions');
  // });
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
  // await fs.createReadStream('./data/answers_photos.csv')
  // .on('error', (error) => {
  //   console.log('ERROR IN PHOTOS:', error);
  // })
  // .pipe(parser())
  // .on('data', (row) => {
  //   //console.log(row.id);
  //   let params = [row.id, row.answer_id, row.url];
  //   db.addPhoto(params, (err, res) => {
  //     if (err) {
  //       console.log('ERROR: Adding a photo in etl.js');
  //     } else {
  //       //console.log(res);
  //     }
  //   });
  // })
  // .on('end', () => {
  //   console.log('Finished reading photos');
  // });
}

loadData();