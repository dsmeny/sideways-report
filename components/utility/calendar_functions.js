export const getDate = (dataLength, val = "max") => {
  let date = new Date();
  date.setDate(dataLength > 0 ? -(dataLength - 2) : date.getDate());
  let month = date.getMonth() < 10 ? `${date.getMonth()}` : date.getMonth();
  let dateMonth = date.getDate() < 10 ? `${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${+month < 10 ? "0" : ""}${
    val === "max" ? +month + 1 : month
  }-${+dateMonth < 10 ? "0" : ""}${dateMonth}`;
};

export const recentTradeDay = (value) => {
  const date = new Date(value);
  return date.toString().slice(0, 4).trim().toLowerCase();
};
