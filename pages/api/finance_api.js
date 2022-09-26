const yahooFinance = require("yahoo-finance");

export default async function financeData(req, res) {
  yahooFinance.quote(
    {
      symbol: "DRUG",
      modules: ["defaultKeyStatistics"],
    },
    (err, quotes) => {
      res.status(200).json({ message: "ok", data: quotes });
    }
  );
}
