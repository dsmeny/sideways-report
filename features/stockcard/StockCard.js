import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../../base/components/card";
import { GoLightBulb, GoListUnordered } from "react-icons/go";
import { toMillions } from "../table/Table.helpers";
import classes from "./StockCard.module.css";
import { cardModel } from "../../constants";

const StockCard = ({ stockData }) => {
  const [data, setData] = useState(null);

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
            <Link
              href={`/${encodeURIComponent(data.meta.symbol)}?pageType=history`}
              passHref
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={classes.icon}
              >
                <GoListUnordered />
              </a>
            </Link>
            <Link
              href={`/${encodeURIComponent(
                data.meta.symbol
              )}?pageType=overview`}
              passHref
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={classes.icon}
              >
                <GoLightBulb />
              </a>
            </Link>
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
