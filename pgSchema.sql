/*Basic schema for the qna service. You should be able to run this in the terminal to
  automatically setup the tables in the database.*/

/*Select Database*/
\c qna;

/*Create the tables in the database*/
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL UNIQUE,
  PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS questions (
  product_id INTEGER REFERENCES products (product_id),
  question_id SERIAL UNIQUE,
  asker_name VARCHAR(50) NOT NULL,
  question_body TEXT NOT NULL,
  question_date TIMESTAMP NOT NULL,
  helpfulness INTEGER NOT NULL,
  reported BOOLEAN NOT NULL,
  PRIMARY KEY (question_id)
);

CREATE TABLE IF NOT EXISTS answers (
  question_id INTEGER REFERENCES questions (question_id),
  answer_id SERIAL UNIQUE,
  answerer_name VARCHAR(50) NOT NULL,
  answer_body TEXT NOT NULL,
  answer_date TIMESTAMP NOT NULL,
  reported BOOLEAN NOT NULL,
  PRIMARY KEY (answer_id)
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id SERIAL UNIQUE,
  answer_id INTEGER REFERENCES answers (answer_id),
  link TEXT NOT NULL
);
