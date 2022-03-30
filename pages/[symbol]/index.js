import Link from "next/link";
import { useRouter } from "next/router";
import Spinner from "../../components/ui/Spinner";
import Overview from "../../components/ui/Overview";
import useStockApi from "../../components/utility/hooks/useStockApi";
import { AiFillCloseCircle } from "react-icons/ai";

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
      top: "17vh",
    },
    main: {
      top: "2rem",
      position: "absolute",
      left: "50%",
      fontSize: "2.2rem",
      color: "var(--primary-font-color)",
      zIndex: "999",
    },
    wrapper: {
      position: "absolute",
      top: "2rem",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <Link href="/">
        <AiFillCloseCircle style={styles.main} />
      </Link>
      <div style={styles.wrapper}>
        {stockOverview(stockData).map((elem, index) => (
          <Overview array={elem} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Details;
