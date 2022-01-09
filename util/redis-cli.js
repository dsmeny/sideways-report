const Redis = require("ioredis");

const redis = new Redis({
  host: "redis-11050.c114.us-east-1-4.ec2.cloud.redislabs.com",
  port: 11050,
  password: "1X2NGBocH9xt8bsWzYXnmLVd8bJEqkXs",
});

export default redis;
