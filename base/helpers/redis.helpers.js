const Redis = require("ioredis");

const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);

export default redis;
