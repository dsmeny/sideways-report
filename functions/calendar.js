export const getMaxDate = () => {
  const date = new Date();
};

export const getTarget = (data, dateStr) => {
  let flattenedData = data.flat();
  const dataMap = new Map();

  //   console.log("getTarget_dateStr:", dateStr);
  //   console.log("getTarget_data:", flattenedData);

  if (data[flattenedData.indexOf(dateStr)]) {
    return dataMap.set(
      `${flattenedData[flattenedData.indexOf(dateStr)]}`,
      flattenedData[flattenedData.indexOf(dateStr) + 1]
    );
  } else if (recentTradeDay(dateStr) === "sat") {
    console.log("sat");
    let newDateStr = newDate(dateStr, 1);

    return dataMap.set(
      `${flattenedData[flattenedData.indexOf(newDateStr)]}`,
      flattenedData[flattenedData.indexOf(newDateStr) + 1]
    );
  } else if (recentTradeDay(dateStr) === "sun") {
    console.log("sun");
    let newDateStr = newDate(dateStr, 2);

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
  console.log("recentTradeDay_value:", value);
  const date = new Date(value);
  console.log("recentTradeDay_date:", date);
  return date.toString().slice(0, 4).trim().toLowerCase();
}
