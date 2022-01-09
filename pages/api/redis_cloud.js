import redis from "../../util/redis-cli";
import { expirationDate } from "../../components/utility/general";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, payload } = req.body;
    console.log(expirationDate, typeof expirationDate);
    redis.setex(name, expirationDate(), payload);
    res.status(200).json({ message: "ok" });
  } else {
    const { name } = req.query;
    const response = await redis.get(name);
    res.status(200).json({ message: "ok", data: response });
  }
}
