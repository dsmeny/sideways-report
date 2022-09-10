import Head from "next/head";
import Layout from "../base/components/layouts/Layouts.container";
import { useRouter } from "next/dist/client/router";
import { TriggerContextProvider } from "../contexts/context-provider";
import { StockContextProvider } from "../contexts/stock-provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { pageType, symbol } = router.query;

  return (
    <TriggerContextProvider>
      <Layout>
        <Head>
          {pageType ? (
            <title>{`${symbol} | ${pageType}`}</title>
          ) : (
            "Sideways Report"
          )}

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
