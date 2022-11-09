const redis = require('redis');
const PORT = process.env.REDIS_PORT | 6379;


const client = redis.createClient(PORT);
client.connect();

client.on('error', (err) => {
  console.error('ERROR:', err);
});

module.exports = {
  cache: (key, data) => {
    return client.SETEX(key, 300, data);
  },
  checkCache: (key) => {
    return client.get(key);
  }
};