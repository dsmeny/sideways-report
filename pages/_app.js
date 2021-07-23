import Head from "next/head";

import Layout from "../components/layout/Layout";
import { TriggerContextProvider } from "../store/context-provider";
import { StockContextProvider } from "../store/stock-provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <TriggerContextProvider>
      <Layout>
        <Head>
          <title>Sidways Report</title>
          <meta name="description" content="stock data reporting" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <StockContextProvider>
          <Component {...pageProps} />
        </StockContextProvider>
      </Layout>
    </TriggerContextProvider>
  );
}

export default MyApp;
