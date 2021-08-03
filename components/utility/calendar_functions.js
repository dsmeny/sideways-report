export const getMaxDate = () => {
  const date = new Date();
};

export const getTarget = (data, dateStr) => {
  let flattenedData = data.flat();
  const dataMap = new Map();

  const monday = recentTradeDay(dateStr) === "mon";
  const friday = recentTradeDay(dateStr) === "fri";
  const saturday = recentTradeDay(dateStr) === "sat";
  const sunday = recentTradeDay(dateStr) === "sun";

  console.log("getTarget_data:", data);
  console.log("getTarget_dateStr:", dateStr);

  if (data[flattenedData.indexOf(dateStr)]) {
    return dataMap.set(
      `${flattenedData[flattenedData.indexOf(dateStr)]}`,
      flattenedData[flattenedData.indexOf(dateStr) + 1]
    );
  } else if (saturday) {
    let newDateStr = newDate(dateStr, 1);

    return dataMap.set(
      `${flattenedData[flattenedData.indexOf(newDateStr)]}`,
      flattenedData[flattenedData.indexOf(newDateStr) + 1]
    );
  } else if (sunday) {
    let newDateStr = newDate(dateStr, 2);

    return dataMap.set(
      `${flattenedData[flattenedData.indexOf(newDateStr)]}`,
      flattenedData[flattenedData.indexOf(newDateStr) + 1]
    );
  } else if ((monday || friday) && flattenedData.indexOf(dateStr) < 0) {
    let index;

    monday ? (index = 3) : (index = 2);

    let newDateStr = newDate(dateStr, index);

    return dataMap.set(
      `${flattenedData[flattenedData.indexOf(newDateStr)]}`,
      flattenedData[flattenedData.indexOf(newDateStr) + 1]
    );
  } else return "undefined";
};

function newDate(dateStr, increment) {
  return dateStr
    .split("-")
    .map((str) => +str)
    .map((str, index) => {
      if (str <= 10) {
        if (index === 2) return `0${str - increment}`;
        else return `0${str}`;
      } else if (str === 11) {
        if (index === 2) return `0${str - increment}`;
        else return str;
      } else {
        if (index === 2) return str - increment;
        else return str;
      }
    })
    .join("-");
}

export const getDate = (dataLength, val = "max") => {
  let date = new Date();
  date.setDate(dataLength > 0 ? -(dataLength - 2) : date.getDate());
  let month = date.getMonth() < 10 ? `${date.getMonth()}` : date.getMonth();
  let dateMonth = date.getDate() < 10 ? `${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${+month < 10 ? "0" : ""}${
    val === "max" ? +month + 1 : month
  }-${+dateMonth < 10 ? "0" : ""}${dateMonth}`;
};

function recentTradeDay(value) {
  let dateVal = value.concat("T00:00:00");
  const date = new Date(dateVal);
  return date.toString().slice(0, 4).trim().toLowerCase();
}
