import { createClient } from "redis";

export const clientRedis = createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
});

clientRedis.on("connect", () => {
  console.log("Connect redis success");
});

clientRedis.on("error", () => {
  console.log("Error redis connection");
});
