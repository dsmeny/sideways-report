import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "../../ui/Card";
import { ChevronUp, ChevronDown, Info } from "../../ui/Icons";
import { toMillions } from "../../utility/tableList_functions";
import classes from "./StockCard.module.css";
import TriggerContext from "../../../store/context-provider";

const StockCard = ({ stockData, clickHandler, isClicked }) => {
  const { showSearch } = useContext(TriggerContext);
  const [data, setData] = useState(null);
  const router = useRouter();

  const STOCK = stockData["Global Quote"];

  const dataModel = [
    {
      symbol: STOCK["01. symbol"],
      date: STOCK["07. latest trading day"],
    },
    {
      ["1. open"]: STOCK["02. open"],
      ["2. high"]: STOCK["03. high"],
      ["3. low"]: STOCK["04. low"],
      ["4. close"]: STOCK["05. price"],
      ["5. volume (m)"]: toMillions(STOCK["06. volume"]),
      ["6. previous close"]: STOCK["08. previous close"],
      ["7. change"]: STOCK["09. change"],
      ["8. change percent"]: STOCK["10. change percent"],
    },
  ];

  useEffect(() => {
    setData(dataModel);
  }, []);

  const _clickHandler = () => {
    showSearch();
    router.push(`/${data[0].symbol}`);
  };

  return (
    <Card symbol={data && data[0].symbol}>
      <div className={classes.details} onClick={_clickHandler}>
        <h3>{data && data[0].symbol}</h3>
        <span>
          <Info />
        </span>
      </div>
      <p>{data && data[0].date}</p>
      <ul>
        {data &&
          Object.entries(data[1]).map((data, index) => (
            <li key={index}>
              <strong>{data[0]}: </strong>
              <span
                style={{
                  color:
                    (data[1].includes("-") && index > 5 && "red") ||
                    (index > 5 && "green"),
                }}
              >
                {data[1]}
              </span>
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
