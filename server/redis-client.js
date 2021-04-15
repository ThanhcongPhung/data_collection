const redis = require('redis');
require('dotenv').config();
const client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST
);
client.auth(process.env.REDIS_PASSWORD);
// const redis_client = redis.createClient(6379, "localhost")
client.on('connect', function () {
  console.log('Redis client connected');
})
module.exports = client;