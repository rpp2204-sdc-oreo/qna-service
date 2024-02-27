# QnA Microservice

**Description**:
This service was created in order to allow for more easily maintainable code and to serve data at a much higher rate than previously allowed by the company's API. Originally made and tested with over 10 million data entries and can perform with 20 ms latency, up to 800 requests per second.

**Data**:
Uses PostgreSQL for the main data storage as well as Redis for caching. With each product selected by a user, data for questions, those questions' answers, and any images that go along with those answers would be sent back to the client in a nested structure for easy use by the client.

## Tech Stack
* [NodeJS](https://nodejs.dev/)
* [Express](https://expressjs.com/)
* [Postgresql](https://www.postgresql.org/)
* [Node-Postgres](https://node-postgres.com/)
* [Redis](https://redis.io/)
* [NGINX](https://www.nginx.com/)
* [AWS](https://aws.amazon.com/)

## Author
* William Kent
  * https://github.com/kentwl1876
