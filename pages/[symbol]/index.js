import { useRouter } from "next/router";
import Link from "next/link";
import useStockApi from "../../hooks/useStockApi";

const Details = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const timeSeries = "OVERVIEW";

  const { stockData, isLoading, isError } = useStockApi({
    symbol,
    timeSeries,
  });

  if (isLoading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  const styles = {
    position: "relative",
    top: "15vh",
  };

  return (
    <div style={styles}>
      <Link href="/">
        <h1 style={{ textAlign: "center" }}>{symbol}</h1>
      </Link>

      <div>
        {" "}
        <ul>
          {stockData &&
            Object.entries(stockData).map((el, index) => (
              <li key={index}>{`${el[0]}: ${el[1]}`}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Details;
