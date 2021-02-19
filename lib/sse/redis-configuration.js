import glob from 'glob';
import path from 'path';
import redis from 'redis';
const redisFile = glob.sync('./config/redis.js')[0];

let subscriber = {};
let publisher = {};

export const initRedis = async () => {
  if (redisFile) {
    const imported = await import(path.resolve(redisFile));
    subscriber = redis.createClient(imported.default);
    publisher = redis.createClient(imported.default);
  } else {
    subscriber = redis.createClient();
    publisher = redis.createClient();
  }

  return { subscriber, publisher };
};
