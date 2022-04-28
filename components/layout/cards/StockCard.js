import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "../../ui/Card";
import { ChevronUp, ChevronDown, Info } from "../../ui/Icons";
import { toMillions } from "../../utility/tableList_functions";
import classes from "./StockCard.module.css";
import TriggerContext from "../../../store/context-provider";
import { cardModel } from "../../../models/card_model";

const StockCard = ({ stockData, clickHandler, isClicked }) => {
  const { showSearch } = useContext(TriggerContext);
  const [data, setData] = useState(null);
  const router = useRouter();

  const STOCK = stockData["Global Quote"];

  useEffect(() => {
    setData(cardModel(STOCK, toMillions));
  }, []);

  const _clickHandler = () => {
    showSearch();
    router.push(`/${data.meta.symbol}`);
  };

  return (
    <Card symbol={data && data.meta.symbol}>
      <div className={classes.details} onClick={_clickHandler}>
        <h3>{data && data.meta.symbol}</h3>
        <span>
          <Info />
        </span>
      </div>
      <p>{data && data.meta.date}</p>
      <ul>
        {data &&
          Object.entries(data.stocks).map((elements, index) => (
            <li key={index}>
              <strong>{elements[0]}: </strong>
              <span
                style={{
                  color:
                    (elements[1].includes("-") && index > 5 && "red") ||
                    (index > 5 && "green"),
                }}
              >
                {elements[1]}
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
