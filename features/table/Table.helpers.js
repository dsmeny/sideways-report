export const toMillions = (stock_num) => {
  return (stock_num / 1000000).toFixed(3);
};

export const calcNums = (base, newNum) => {
  return ((newNum - base) / base) * 100;
};

export const getDayOfTheWeek = (daystring) => {
  const dayArr = daystring.split("-");
  const date = new Date(`${dayArr[0]}, ${dayArr[1]}, ${dayArr[2]}`);
  return date.toDateString().split(" ").shift();
};
