const db = require('./db.js');

/* In order to get the INSERT queries to work. After all of the data has been loaded into the database. Make sure that you run the following command to set the id to the max. "select setval('tableName_id_seq', (select max(id) from tableName));"; otherwise, there will be a problem with overlapping primary keys and all inserts will fail until it reaches the next new number in the sequence of primary keys. This is caused by adding to the database without using the insert statement and also restarts with each new session.*/

module.exports = {
  getQuestions: (params, cb) => {
    db.query('SELECT * FROM questions WHERE product_id = $1 AND reported = false', params, (err, res) => {
      if (err) {
        console.log('ERROR in getQuestions:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  getAnswers: (params, cb) => {
    db.query('SELECT * FROM answers WHERE question_id = $1 AND reported = false', params, (err, res) => {
      if (err) {
        console.log('ERROR in getAnswers:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  getPhotos: (params, cb) => {
    db.query('SELECT * FROM photos WHERE answer_id = $1', params, (err, res) => {
      if (err) {
        console.log('ERROR in getPhotos', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  addQuestion: (params, cb) => {
    db.query('INSERT INTO questions(product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES($1, $2, $3, $4, $5, $6, $7)', params, (err, res) => {
      if (err) {
        console.log('ERROR in addQuestion:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  addAnswer: (params, cb) => {
    db.query('INSERT INTO answers(question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES($1, $2, $3, $4, $5, $6, $7)', params, (err, res) => {
      if (err) {
        console.log('ERROR in addAnswer:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  addPhoto: (params, cb) => {
    db.query('INSERT INTO photos(answer_id, url) VALUES ($1, $2)', params, (err, res) => {
      if (err) {
        console.log('ERROR in addPhoto:', err);
      } else {
        return cb(null, res);
      }
    });
  },
  qHelpful: (params, cb) => {
    db.query('UPDATE questions SET helpfulness = helpfulness + 1 WHERE id = $1', params, (err, res) => {
      if (err) {
        console.log('ERROR in qHelpful:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  qReport: (params, cb) => {
    db.query('UPDATE questions SET reported = true WHERE id = $1', params, (err, res) => {
      if (err) {
        console.log('ERROR in qReport:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  aHelpful: (params, cb) => {
    db.query('UPDATE answers SET helpful = helpful + 1 WHERE id = $1', params, (err, res) => {
      if (err) {
        console.log('ERROR in aHelpful:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  aReport: (params, cb) => {
    db.query('UPDATE answers SET reported = true WHERE id = $1', params, (err, res) => {
      if (err) {
        console.log('ERROR in aReport:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  }

};