import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Spinner from "../../components/ui/Spinner";
import Overview from "../../components/ui/Overview";
import useStockApi from "../../components/utility/hooks/useStockApi";

// Constants
const COLUMNS = 4;

const Details = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { stockData } = useStockApi({ symbol, timeSeries: "OVERVIEW" });

  if (!stockData)
    return (
      <div>
        <Spinner />
      </div>
    );

  function stockOverview(data) {
    let dataArray = [];
    let overview = Object.entries(data);
    while (overview.length) {
      dataArray.push(overview.splice(0, COLUMNS));
    }

    return dataArray;
  }

  const styles = {
    container: {
      position: "relative",
      top: "15vh",
    },
    main: {
      textAlign: "right",
    },
    close: {
      height: "2.1rem",
      transform: "translate(-45%, 30%)",
      color: "rgb(87, 87, 87)",
    },
  };

  return (
    <div style={styles.container}>
      <Link href="/">
        <div style={styles.main}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={styles.close}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </Link>
      <div>
        {stockOverview(stockData).map((elem) => (
          <Overview array={elem} />
        ))}
      </div>
    </div>
  );
};

export default Details;
