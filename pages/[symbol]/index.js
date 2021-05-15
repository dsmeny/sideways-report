import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";

const Details = () => {
  const [data, setData] = useState([]);

  const router = useRouter();
  const { symbol } = router.query;

  useEffect(async () => {
    const req = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const res = await req.json();
    res && setData((prev) => [...prev, Object.entries(res)]);
  }, []);
  return (
    <div>
      <Link href="/">
        <h1 style={{ textAlign: "center" }}>{symbol}</h1>
      </Link>
      <ul>
        {data && data.map((array, index) => <Card data={array} key={index} />)}
      </ul>
    </div>
  );
};

export default Details;
