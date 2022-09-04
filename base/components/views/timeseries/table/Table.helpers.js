import { getStockYear, getStockMonth } from "../../Views.helpers";

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

export const getFilteredOption = async (setStockData, selection, stocks) => {
  let stockEntries = await {
    get info() {
      let obj = {};

      for (let key in stocks) {
        obj[key] = stocks[key];
      }
      return Object.entries(obj);
    },
  };

  const filteredData = await stockEntries.info.filter(
    (el, index) => index < selection
  );

  setStockData(filteredData);
};
