import Head from "next/head";
import Layout from "../base/components/layouts/Layouts.container";
import { TriggerContextProvider } from "../contexts/context-provider";
import { StockContextProvider } from "../contexts/stock-provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <TriggerContextProvider>
      <Layout>
        <Head>
          <title>Sideways Report</title>
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
