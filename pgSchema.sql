/*Basic schema for the qna service. You should be able to run this in the terminal to
  automatically setup the tables in the database.*/

/*NOTE: Currently can't find a method to run this file and need to look into it more.*/

/*Select Database*/
\c qna;

/*Create the tables in the database. May need to copy/paste these individually into psql
  in order to create the tables*/

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  asker_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions (id),
  body TEXT NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email TEXT NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL UNIQUE,
  answer_id INTEGER REFERENCES answers (id),
  url TEXT NOT NULL
);
