import { getStockYear, getStockMonth } from "../../history.helpers";

export const filterByDate = async (
  setStockData,
  selectedYear,
  stocks,
  month
) => {
  const data = await getStockYear(selectedYear, stocks);
  const formattedByMonth = await getStockMonth(month, data);

  if (data) {
    const response = await Object.entries(formattedByMonth);
    setStockData(response);
  }
};

async function filteredOptions(stocks) {
  let stockEntries = await {
    get info() {
      let obj = {};

      for (let key in stocks) {
        obj[key] = stocks[key];
      }
      return Object.entries(obj);
    },
  };

  return await ((selection, symbol = "ltn") =>
    stockEntries.info.filter((el, index) =>
      symbol === "ltn" ? index < selection : index >= selection
    ));
}

export const getLessThan = async (setStockData, selection, stocks) => {
  const entries = await filteredOptions(stocks);
  const ltnData = entries(selection);
  setStockData(ltnData);
};

export const getGreaterThan = async (setStockData, selection, stocks) => {
  const entries = await filteredOptions(stocks);
  const gtnData = entries(selection, "gtn");
  setStockData(gtnData);
};
