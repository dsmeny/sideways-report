import redis from "../../util/redis-cli";
import { expirationDate } from "../../components/utility/general";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, payload } = req.body;
    redis.setex(name, expirationDate(), payload);
    res.status(200).json({ message: "ok" });
  } else {
    const { name } = req.query;
    const response = await redis.get(name);
    // console.log("Response redis_cloud: ", response);
    res.status(200).json({ message: "ok", data: response });
  }
}
