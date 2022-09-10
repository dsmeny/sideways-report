import { useState, useEffect } from "react";
import { views } from "../../constants";
import Card from "../../base/components/card";
import PageLink from "./PageLink";
import { GoLightBulb, GoListUnordered, GoInfo } from "react-icons/go";
import { ImNewspaper } from "react-icons/im";
import { toMillions } from "../table/Table.helpers";
import classes from "./StockCard.module.css";
import { cardModel } from "../../constants";

const StockCard = ({ stockData }) => {
  const [data, setData] = useState(null);
  const { OVERVIEW, HISTORY, NEWS } = views;

  const STOCK = stockData["Global Quote"];

  useEffect(() => {
    setData(cardModel(STOCK, toMillions));
  }, []);

  const date = new Date(data?.meta.date);

  const dd = date?.toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    weekday: "short",
    month: "short",
    day: "2-digit",
  });

  return (
    <Card symbol={data && data.meta.symbol}>
      <div className={classes.details}>
        <h3>{data && data.meta.symbol}</h3>
        {data && (
          <div>
            <PageLink symbol={data.meta.symbol} type={OVERVIEW} Icon={GoInfo} />
            <PageLink
              symbol={data.meta.symbol}
              type={HISTORY}
              Icon={GoListUnordered}
            />
            <PageLink
              symbol={data.meta.symbol}
              type={NEWS}
              Icon={ImNewspaper}
            />
          </div>
        )}
      </div>
      <p>{data && dd}</p>
      <ul>
        {data &&
          Object.entries(data.stocks).map((elements, index) => (
            <li key={index}>
              <strong style={{ color: "var(--border-color)" }}>
                {elements[0]}:{" "}
              </strong>
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
    </Card>
  );
};

export default StockCard;
