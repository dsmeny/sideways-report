export const toMillions = (stock_num) => {
  return (stock_num / 1000000).toFixed(3);
};

// this will be refactored for reuse on gains%.
export const convertVolume = (array) => {
  function calcNums(base, newNum) {
    return ((newNum - base) / base) * 100;
  }

  const result = array.reduce((acc, stock) => {
    if (stock[1]["5. volume"]) {
      let num = +stock[1]["5. volume"];
      if (acc === null) return num;
      else if (acc.gains) {
        return { prev: num, gains: [...acc.gains, calcNums(acc.prev, num)] };
      } else {
        return { prev: num, gains: [calcNums(acc, num)] };
      }
    }
  }, null);

  return result;
};

// formatting vol #'s xxx,xxx,xxx
export const formatLargeNum = (numString) => {
  let replaced = numString.split(/(\d{3})(\d{3})(?!\d)/);
  replaced.pop();
  return replaced.join(",");
};
