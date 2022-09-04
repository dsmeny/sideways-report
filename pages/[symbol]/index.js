import { useState } from "react";
import { useRouter } from "next/router";
import CompanyOverview from "../../base/components/views/Views.overview";
import TimeSeriesOverview from "../../base/components/views/Views.timeseries";
import { TimeseriesProvider } from "../../contexts/timeseries-context";

// Constants
const COLUMNS = 4;

const containerStyle = {
  flexGrow: "2",
  minHeight: "100vh",
};

const Details = () => {
  const router = useRouter();
  const { symbol, pageType } = router.query;
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarHandler = () => {
    setShowSidebar(() => !showSidebar);
  };

  return (
    <TimeseriesProvider>
      <div style={containerStyle}>
        {pageType === "overview" && <CompanyOverview symbol={symbol} />}
        {pageType === "history" && <TimeSeriesOverview symbol={symbol} />}
      </div>
    </TimeseriesProvider>
  );
};

export default Details;
