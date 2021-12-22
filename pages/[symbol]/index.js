import { useRouter } from "next/router";
import Link from "next/link";
import useStockApi from "../../components/utility/hooks/useStockApi";
import Spinner from "../../components/ui/Spinner";
import Overview from "../../components/ui/Overview";

const Details = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const timeSeries = "OVERVIEW";

  const { stockData, isError } = useStockApi({
    symbol,
    timeSeries,
  });

  if (!stockData)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (isError) return <div>Error</div>;

  const stockDataArr = Object.entries(stockData);
  const row1 = stockDataArr.filter((el, index) => index < 4);
  const row2 = stockDataArr.filter((el, index) => index > 3 && index < 14);
  const row3 = stockDataArr.filter((el, index) => index > 13 && index < 24);
  const row4 = stockDataArr.filter((el, index) => index > 23 && index < 34);
  const row5 = stockDataArr.filter((el, index) => index > 33 && index < 44);
  const row6 = stockDataArr.filter((el, index) => index > 43 && index < 54);
  const row7 = stockDataArr.filter((el, index) => index > 53);

  // Removing TrailingPE...because who cares??  And it formats better.
  row4.pop();

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
        <Overview array={row1} />
        <hr />
        <Overview array={row2} />
        <hr />
        <Overview array={row3} />
        <hr />
        <Overview array={row4} />
        <hr />
        <Overview array={row5} />
        <hr />
        <Overview array={row6} />
        <hr />
        <Overview array={row7} />
      </div>
    </div>
  );
};

export default Details;
