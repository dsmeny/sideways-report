import redis from "../../util/redis-cli";

export default async function handler(req, res) {
  if (req.method === "get") {
    const params = req.params;
    const response = await redis.get(params);
    res.status(200).json({ message: "ok", data: response });
  } else if (req.method === "post") {
    console.log("post called");
    const { name, movies } = req.body;
    await redis.set(name, movies);
    res.status(200).json({ message: "ok" });
  }
}
