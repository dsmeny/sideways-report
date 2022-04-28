export const cardModel = (STOCK, toMillions) => {
  return {
    meta: {
      symbol: STOCK["01. symbol"],
      date: STOCK["07. latest trading day"],
    },
    stocks: {
      ["1. open"]: STOCK["02. open"],
      ["2. high"]: STOCK["03. high"],
      ["3. low"]: STOCK["04. low"],
      ["4. close"]: STOCK["05. price"],
      ["5. volume (m)"]: toMillions(STOCK["06. volume"]),
      ["6. previous close"]: STOCK["08. previous close"],
      ["7. change"]: STOCK["09. change"],
      ["8. change percent"]: STOCK["10. change percent"],
    },
  };
};
