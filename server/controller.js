const db = require('./db.js');

module.exports = {
  getQuestions: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in getQuestions', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  getAnswers: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in getAnswers', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  addQuestion: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in addQuestion', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  addAnswer: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in addAnswer', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  qHelpful: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in qHelpful', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  qReport: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in qReport', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  aHelpful: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in aHelpful', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  },
  aReport: (params, cb) => {
    db.query('TODO', params, (err, res) => {
      if (err) {
        console.log('ERROR in aReport', err);
        return cb(err, null);
      } else {
        return cb(null, res);
      }
    });
  }
};