import { useRouter } from "next/router";
import CompanyOverview from "../../base/components/views/Views.overview";
import TimeSeriesOverview from "../../base/components/views/Views.timeseries";
import NewsOverview from "../../base/components/views/Views.news";
import { views } from "../../constants";
import { TimeseriesProvider } from "../../contexts/timeseries-context";

const containerStyle = {
  flexGrow: "2",
  minHeight: "100vh",
  marginTop: "4rem",
};

const Details = () => {
  const router = useRouter();
  const { symbol, pageType } = router.query;
  const { OVERVIEW, HISTORY, NEWS } = views;

  return (
    <TimeseriesProvider>
      <div style={containerStyle}>
        {pageType === OVERVIEW && <CompanyOverview symbol={symbol} />}
        {pageType === HISTORY && <TimeSeriesOverview symbol={symbol} />}
        {pageType === NEWS && <NewsOverview />}
      </div>
    </TimeseriesProvider>
  );
};

export default Details;
