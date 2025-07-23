import { RedisClientType } from "./RedisClientType";

declare global {
  var __redisClient: RedisClientType | undefined;
}