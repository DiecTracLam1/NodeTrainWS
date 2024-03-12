import { clientRedis } from "../database/redis.connect";

export const getOrSetCacheCallBack = async (key: string, cb: any) => {
  let data: any;
  try {
    const list = await clientRedis.v4.GET(key);
    if (list) {
      data = JSON.parse(list);
    } else {
      data = await cb();
      await clientRedis.v4.SETEX(key, 10000, JSON.stringify(data));
    }
    return data;
  } catch (error) {}
};
