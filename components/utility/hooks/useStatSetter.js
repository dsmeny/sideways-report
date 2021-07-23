import { useState } from "react";
import { calcNums, getDayOfTheWeek } from "../../utility/tableList_functions";

function useStatSetter() {
  const [stockStats, setStockStats] = useState([]);

  function convertStats(stockArray) {
    let gainNumbers = 0;
    let volNumbers = 0;

    const stockReducer = stockArray.reduce((acc, stock, index) => {
      if (stock[0] !== undefined) {
        for (let key in stock[1]) {
          // calculate average
          if (key !== "5. volume") {
            let number = (+stock[1][key]).toFixed(2);
            gainNumbers += +number;
          } else if (key === "5. volume") {
            let number = (+stock[1][key]).toFixed(2);
            volNumbers += +number;
          }
        }

        const statObj = {
          date: stock[0],
          day: getDayOfTheWeek(stock[0]),
          avg: +(gainNumbers / 4).toFixed(2),
          gain: 0.0,
          volAvg: +(volNumbers / 2).toFixed(2),
          vol: 0.0,
        };

        if (acc.length > 0) {
          statObj.gain = calcNums(statObj.avg, acc[index - 1].avg).toFixed(2);
          statObj.vol = calcNums(statObj.volAvg, acc[index - 1].volAvg).toFixed(
            2
          );
        }

        gainNumbers = 0;
        volNumbers = 0;

        return [...acc, statObj];
      } else return [];
    }, []);

    setStockStats(stockReducer);
  }
  return {
    stockStats,
    convertStats,
  };
}

export default useStatSetter;
