const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.NEXT_PUBLIC_REDIS_URL,
  port: process.env.NEXT_PUBLIC_REDIS_PORT,
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
});

export default redis;
