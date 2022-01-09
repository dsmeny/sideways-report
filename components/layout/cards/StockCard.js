import { useRouter } from "next/router";
import Card from "../../ui/Card";
import { ChevronUp, ChevronDown, Dots } from "../../ui/Icons";
import { toMillions } from "../../utility/tableList_functions";
import classes from "./StockCard.module.css";

const StockCard = (props) => {
  const router = useRouter();

  const stockPrices = Object.entries(props.stockData);

  // formatting volume data to millions
  stockPrices[4][0] = stockPrices[4][0].toString().concat("(m)");
  stockPrices[4][1] = toMillions(stockPrices[4][1]);

  return (
    <Card symbol={props.symbol}>
      <div
        className={classes.details}
        // onClick={() => router.push(`/${props.symbol}`)}
      >
        <h3>{props.symbol}</h3>
        {/* <span>
          <Dots />
        </span> */}
      </div>
      <p>{props.date}</p>
      <ul>
        {stockPrices.map((data, index) => (
          <li key={index}>
            <strong>{data[0]}: </strong>
            {data[1]}
          </li>
        ))}
      </ul>
      <div>
        <span onClick={props.clickHandler}>
          {props.isClicked === false && <ChevronDown />}
          {props.isClicked === true && <ChevronUp />}
        </span>
      </div>
    </Card>
  );
};

export default StockCard;
