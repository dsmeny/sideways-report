import { useContext } from "react";
import { useRouter } from "next/router";
import Card from "../../ui/Card";
import { ChevronUp, ChevronDown, Info } from "../../ui/Icons";
import { toMillions } from "../../utility/tableList_functions";
import classes from "./StockCard.module.css";
import TriggerContext from "../../../store/context-provider";

const StockCard = (props) => {
  const { showSearch } = useContext(TriggerContext);
  const router = useRouter();

  const stockPrices = Object.entries(props.stockData["Global Quote"]).map(
    (entry) => {
      if (entry[0].match(/^1/g)) {
        return [entry[0].replace(/^\w+/g, (str) => +str - 1), entry[1]];
      }
      return [
        entry[0].slice(1).replace(/^[1-9]/g, (str) => +str - 1),
        entry[1],
      ];
    }
  );

  // formatting volume data to millions
  stockPrices[5][0] = stockPrices[5][0].toString().concat("(m)");
  stockPrices[5][1] = toMillions(stockPrices[5][1]);
  stockPrices.shift();

  const symbol = props.stockData["Global Quote"]["01. symbol"];
  const date = props.stockData["Global Quote"]["07. latest trading day"];

  const clickHandler = () => {
    showSearch();
    router.push(`/${props.stockData["Global Quote"]["01. symbol"]}`);
  };

  return (
    <Card symbol={symbol}>
      <div className={classes.details} onClick={clickHandler}>
        <h3>{symbol}</h3>
        <span>
          <Info />
        </span>
      </div>
      <p>{date}</p>
      <ul>
        {stockPrices.map((data, index) => (
          <li key={index}>
            <strong>{data[0]}: </strong>
            {data[1]}
          </li>
        ))}
      </ul>
      {/* <div>
        <span onClick={props.clickHandler}>
          {props.isClicked === false && <ChevronDown />}
          {props.isClicked === true && <ChevronUp />}
        </span>
      </div> */}
    </Card>
  );
};

export default StockCard;
