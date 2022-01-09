import redis from "../../util/redis-cli";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { type, symbol } = req.query; // we'll come back to it.
    const response = await redis.get(key);
    res.status(200).json({ message: "ok", data: response });
  } else if (req.method === "POST") {
    const { meta, timeSeries } = req.body;
    await redis.hset(
      meta.Symbol,
      "meta",
      JSON.stringify(meta),
      "timeseries",
      JSON.stringify(timeSeries)
    );
    res.status(200).json({ message: "ok" });
  }
}
