import { useRouter } from "next/router";
import Card from "../ui/Card";

const StockCard = (props) => {
  const router = useRouter();

  const styles = {
    details: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "89%",
    },
  };

  console.log("StockCard stockData:", props.stockData);

  return (
    <Card symbol={props.stockSymbol}>
      <div
        style={styles.details}
        onClick={() => router.push(`/${props.stockSymbol}`)}
      >
        <h3>{props.stockSymbol}</h3>
        <span style={{ transform: "translate(7px, 3px)" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="dots"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </span>
      </div>
      <p>{props.stockDate}</p>
      <ul>
        {props.stockData.map((data, index) => (
          <li key={index}>
            <strong>{data[0]}: </strong>
            {data[1]}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default StockCard;
