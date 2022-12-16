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

export const getLessThan = async (setStockData, selection, stocks) => {
  const ltnData = Object.entries(stocks).filter(
    (_, index) => index < selection
  );
  setStockData(ltnData);
};

export const getGreaterThan = async (setFilteredData, selection, stocks) => {
  const entries = stocks.filter((el) => +el[1]["6. volume"] >= selection);
  setFilteredData(entries);
};
