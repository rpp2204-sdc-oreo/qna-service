const db = require('./db.js');

module.exports = {
  getQuestions: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in getQuestions:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  getAnswers: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in getAnswers:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  addQuestion: (params, cb) => {
    db.query('INSERT INTO questions(id, product_id, question_body, question_date, asker_name, asker_email, reported, helpfulness) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', params, (err, res) => {
      if (err) {
        console.log('ERROR in addQuestion:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  addAnswer: (params, cb) => {
    db.query('INSERT INTO answers(id, question_id, body, answer_date, answer_name, answer_email, reported, helpfulness) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', params, (err, res) => {
      if (err) {
        console.log('ERROR in addAnswer:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  addPhoto: (params, cb) => {
    db.query('INSERT INTO photos(id, answer_id, link) VALUES ($1, $2, $3)', params, (err, res) => {
      if (err) {
        console.log('ERROR in addPhoto:', err);
      } else {
        return cb(null, res);
      }
    });
  },
  qHelpful: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in qHelpful:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  qReport: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in qReport:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  aHelpful: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in aHelpful:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  aReport: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in aReport:', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  }

};