import { useEffect } from "react";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

async function fetchYahooData() {
  const response = await fetch("/api/finance_api");
  const data = await response.json();

  console.log(data);
}

const test = () => {
  useEffect(() => {
    fetchYahooData();
  }, []);

  return (
    <div style={styles}>
      <h1>Test</h1>
    </div>
  );
};

export default test;
