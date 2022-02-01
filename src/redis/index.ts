import * as Redis from 'ioredis';

export const connectRedis = new Redis(Number(process.env.REDIS_PORT), process.env.REDIS_HOST);