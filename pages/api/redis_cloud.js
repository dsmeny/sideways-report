import redis from "../../base/helpers/redis.helpers";
import { expirationDate } from "../../base/helpers/general.helpers";

// using upStash

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, payload } = req.body;
    redis.setex(name, expirationDate(), payload);
    res.status(200).json({ message: "ok" });
  } else {
    const { name } = req.query;
    const response = await redis.get(name);
    res.status(200).json({ message: "ok", data: response });
  }
}
