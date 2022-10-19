require('dotenv').config();
const {Pool, Client} = require('pg');

const USER = process.env.USERNAME;
const PASS = process.env.PASS;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qna',
  password: 'password',
  port: 5432
});

pool.on('error', (err, client) => {
  console.error('ERROR:', err);
});

module.exports = {
  query: (query, params, cb) => {
    // NOTE: For running a single query
    return pool.query(query, params, cb);
  },
  getClient: (callback) => {
    //NOTE: For running multiple queries from a single client
    pool.connect((err, client, release) => {
      callback(err, client, release);
    })
  }
}

/*NOTE: This is the initial test to ensure connection to the qna database
  const client = new Client({
    user: USER,
    host: 'localhost',
    database: 'qna',
    password: PASS,
    port: 5432
  });

  client.connect();

  client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message);
    client.end();
  });*/