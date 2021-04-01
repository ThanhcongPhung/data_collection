const redis = require('redis');
const redis_client = redis.createClient(6379, "localhost")
redis_client.on('connect', function () {
  console.log('Redis client connected');
})
module.exports = redis_client;