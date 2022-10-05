require('dotenv').config();
const {Client} = require('pg');

const USER = process.env.USERNAME;
const PASS = process.env.PASS;


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
});