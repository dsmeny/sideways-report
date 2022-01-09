import redis from "../../util/redis-cli";

export default async function handler(req, res) {
  const currentDate = new Date();
  const currentSeconds = currentDate.getTime() / 1000;

  if (req.method === "POST") {
    const { name, payload } = req.body;
    await redis.setex(name, 86400 - currentSeconds, payload);
    res.status(200).json({ message: "ok" });
  } else {
    const { name } = req.query;
    const response = await redis.get(name);
    res.status(200).json({ message: "ok", data: response });
  }
}
