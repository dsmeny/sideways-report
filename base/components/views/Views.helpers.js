import { MONTHS } from "../../../constants";

export const getStockYear = (year, stocks) => {
  const obj = {};
  for (let key in stocks) {
    const targetDate = new Date(key);
    const targetYear = targetDate.getFullYear();
    if (targetYear === +year) {
      obj[key] = stocks[key];
    }
  }

  return obj;
};

export const getStockMonth = (month, stocks) => {
  const obj = {};
  for (let key in stocks) {
    const targetDate = new Date(key);
    const targetMonth = targetDate.getMonth();
    if (MONTHS[targetMonth] === month) {
      obj[key] = stocks[key];
    }
  }
  return obj;
};

export const getIpoMonth = (stocks) => {
  const keys = Object.keys(stocks);
  return new Date(keys[keys.length - 1]).getMonth();
};

export const findStockYears = (stocks) => {
  const years = [];
  for (let key in stocks) {
    const targetDate = new Date(key);
    const targetYear = targetDate.getFullYear();
    if (years.indexOf(targetYear) === -1) {
      years.push(targetYear);
    }
  }
  return years;
};
