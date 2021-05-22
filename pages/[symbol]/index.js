import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

const Details = () => {
  const [data, setData] = useState([]);

  const styles = {
    position: "relative",
    top: "15vh",
  };

  const router = useRouter();
  const { symbol } = router.query;

  useEffect(async () => {
    const req = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const res = await req.json();
    const resDataArr = await Object.entries(res);
    setData((prev) => [...prev, resDataArr]);
  }, []);
  return (
    <div style={styles}>
      <Link href="/">
        <h1 style={{ textAlign: "center" }}>{symbol}</h1>
      </Link>
      <ul>
        {data.length > 0 &&
          data[0].map((array, index) => (
            <li key={index}>{`${array[0]}: ${array[1]}`}</li>
          ))}
      </ul>
    </div>
  );
};

export default Details;
