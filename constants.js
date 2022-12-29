const API_PARAMS = {
  TIME_SERIES_DAILY: "TIME_SERIES_DAILY_ADJUSTED",
  OVERVIEW: "OVERVIEW",
  GLOBAL_QUOTE: "GLOBAL_QUOTE",
  META_DATA: "Meta Data",
  META_SYMBOL: "2. Symbol",
  TIME_SERIES: "Time Series (Daily)",
};

const MEDIA_SIZES = {
  MOBILE: "720",
};

export { API_PARAMS, MEDIA_SIZES };

export const views = {
  OVERVIEW: "overview",
  HISTORY: "history",
  NEWS: "news",
};

export const timeseriesModel = (obj) => {
  return {
    OPEN: obj["1. open"],
    HIGH: obj["2. high"],
    LOW: obj["3. low"],
    CLOSE: obj["4. close"],
    VOLUME: obj["6. volume"],
  };
};

export const overviewModel = (stockData, convertNumber) => {
  return {
    row1: {
      ["Latest Quarter"]: stockData.LatestQuarter,
      Symbol: stockData.Symbol,
      Name: stockData.Name,
      Description: stockData.Description,
    },
    row2: {
      ["Shares Outstanding"]: convertNumber(stockData.sharesOutstanding),
      Float: convertNumber(stockData.floatShares),
      ["Shares Short"]: convertNumber(stockData.sharesShort),
      ["% Shares Out"]: `${stockData.sharesPercentSharesOut * 100}%`,
    },
    row3: {
      ["Short Prev Month"]: convertNumber(
        stockData.sharesShortPreviousMonthDate
      ),
      ["Short Prior Month"]: convertNumber(stockData.sharesShortPriorMonth),
      ["% Short of Float"]: `${stockData.shortPercentOfFloat * 100}%`,
      ["Short Ratio"]: stockData.shortRatio,
    },
    row4: {
      ["% Held by Institutions"]: `${(
        stockData.heldPercentInstitutions * 100
      ).toFixed(2)}%`,
      ["% Held by Insiders"]: `${(stockData.heldPercentInsiders * 100).toFixed(
        2
      )}%`,
      ["Last Split Factor"]: stockData.lastSplitFactor ?? "N/A",
    },
    row5: {
      ["52 Week High"]: stockData["52WeekHigh"],
      ["52 Week Low"]: stockData["52WeekLow"],
      ["50 Day Moving Avg"]: stockData["50DayMovingAverage"],
      ["200 Day Moving Avg"]: stockData["200DayMovingAverage"],
    },
    row6: {
      ["Market Cap (m)"]: convertNumber(stockData.MarketCapitalization),
      ["Book Value"]: stockData.BookValue,
      ["Enterprise Value"]: convertNumber(stockData.enterpriseValue),
      Beta: stockData.Beta,
    },
    row7: {
      ["Analyst Target Price"]: stockData["AnalystTargetPrice"],
      EPS: stockData.EPS,
      Industry: stockData.Industry,
      Sector: stockData.Sector,
    },
    row8: {
      GrossProfitTTM: convertNumber(stockData.GrossProfitTTM),
      PERatio: stockData.PERatio,
      PEGRatio: stockData.PEGRatio,
      ["Asset Type"]: stockData.AssetType,
    },
    row9: {
      ["Quarterly Earnings Growth YOY"]: stockData.QuarterlyEarningsGrowthYOY,
      ["Quarterly Revenue Growth YOY"]: stockData.QuarterlyRevenueGrowthYOY,
      ["Revenue Per Share TTM"]: stockData.RevenuePerShareTTM,
      ["Revenue TTM"]: stockData.RevenueTTM,
    },
    row10: {
      ["Dividend Date"]: stockData.DividendDate,
      ["Dividend Per Share"]: stockData.DividendPerShare,
      ["Dividend Yield"]: stockData.DividendYield,
      ["Ex Dividend Date"]: stockData.ExDividendDate,
    },
    row11: {
      ["Price To Sales Ratio TTM"]: stockData.PriceToSalesRatioTTM,
      ["Price To Book Ratio"]: stockData.PriceToBookRatio,
      ["Trailing PE"]: stockData.TrailingPE,
      ["Forward PE"]: stockData.ForwardPE,
    },
    row12: {
      ["Profit Margin"]: stockData.ProfitMargin,
      ["EV To Revenue"]: stockData.EVToRevenue,
      ["EV To EBITDA"]: stockData.EVToEBITDA,
      EBITDA: stockData.EBITDA,
    },
    row13: {
      ["Operating Margin TTM"]: stockData.OperatingMarginTTM,
      ["Return On Assets TTM"]: stockData.ReturnOnAssetsTTM,
      ["Return On Equity TTM"]: stockData.ReturnOnEquityTTM,
      ["Diluted EPS TTM"]: stockData.DilutedEPSTTM,
    },
    row14: {
      ["Fiscal Year End"]: stockData.FiscalYearEnd,
      Currency: stockData.Currency,
      Country: stockData.Country,
      Exchange: stockData.Exchange,
    },
    row15: {
      CIK: stockData.CIK,
      Address: stockData.Address,
    },
  };
};

export const cardModel = (STOCK, toMillions) => {
  return {
    meta: {
      symbol: STOCK["01. symbol"],
      date: STOCK["07. latest trading day"],
    },
    stocks: {
      Open: STOCK["02. open"],
      High: STOCK["03. high"],
      Low: STOCK["04. low"],
      Close: STOCK["05. price"],
      ["Volume (m)"]: toMillions(STOCK["06. volume"]),
      ["Previous close"]: STOCK["08. previous close"],
      Change: STOCK["09. change"],
      ["Change percent"]: STOCK["10. change percent"],
    },
  };
};

export const newsModel = (stockData) => {
  return {
    authors: stockData.authors,
    image: stockData.banner_image,
    overall_sentiment: stockData.overall_sentiment_label,
    source: stockData.source,
    summary: stockData.summary,
    ticker_sentiment: stockData.ticker_sentiment,
    time: stockData.time_published,
    title: stockData.title,
    url: stockData.url,
  };
};

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
