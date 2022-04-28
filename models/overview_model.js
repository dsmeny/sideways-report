export const dataModel = (stockData, convertNumber) => {
  return {
    row1: {
      ["Latest Quarter"]: stockData.LatestQuarter,
      Symbol: stockData.Symbol,
      Name: stockData.Name,
      Description: stockData.Description,
    },
    row2: {
      ["Shares Outstanding"]: convertNumber(stockData.SharesOutstanding),
      ["Market Cap (m)"]: convertNumber(stockData.MarketCapitalization),
      ["Book Value"]: stockData.BookValue,
      EBITDA: stockData.EBITDA,
    },
    row3: {
      ["52 Week High"]: stockData["52WeekHigh"],
      ["52 Week Low"]: stockData["52WeekLow"],
      ["50 Day Moving Avg"]: stockData["50DayMovingAverage"],
      ["200 Day Moving Avg"]: stockData["200DayMovingAverage"],
    },
    row4: {
      ["Analyst Target Price"]: stockData["AnalystTargetPrice"],
      ["GrossProfitTTM"]: convertNumber(stockData.GrossProfitTTM),
      Industry: stockData.Industry,
      Sector: stockData.Sector,
    },
    row5: {
      EPS: stockData.EPS,
      PERatio: stockData.PERatio,
      PEGRatio: stockData.PEGRatio,
      ["Asset Type"]: stockData.AssetType,
    },
    row6: {
      ["Quarterly Earnings Growth YOY"]: stockData.QuarterlyEarningsGrowthYOY,
      ["Quarterly Revenue Growth YOY"]: stockData.QuarterlyRevenueGrowthYOY,
      ["Revenue Per Share TTM"]: stockData.RevenuePerShareTTM,
      ["Revenue TTM"]: stockData.RevenueTTM,
    },
    row7: {
      ["Dividend Date"]: stockData.DividendDate,
      ["Dividend Per Share"]: stockData.DividendPerShare,
      ["Dividend Yield"]: stockData.DividendYield,
      ["Ex Dividend Date"]: stockData.ExDividendDate,
    },
    row8: {
      ["Price To Sales Ratio TTM"]: stockData.PriceToSalesRatioTTM,
      ["Price To Book Ratio"]: stockData.PriceToBookRatio,
      ["Trailing PE"]: stockData.TrailingPE,
      ["Forward PE"]: stockData.ForwardPE,
    },
    row9: {
      ["Profit Margin"]: stockData.ProfitMargin,
      ["EV To Revenue"]: stockData.EVToRevenue,
      ["EV To EBITDA"]: stockData.EVToEBITDA,
      Beta: stockData.Beta,
    },
    row10: {
      ["Operating Margin TTM"]: stockData.OperatingMarginTTM,
      ["Return On Assets TTM"]: stockData.ReturnOnAssetsTTM,
      ["Return On Equity TTM"]: stockData.ReturnOnEquityTTM,
      ["Diluted EPS TTM"]: stockData.DilutedEPSTTM,
    },
    row11: {
      ["Fiscal Year End"]: stockData.FiscalYearEnd,
      Currency: stockData.Currency,
      Country: stockData.Country,
      ["Exchange"]: stockData.Exchange,
    },
    row12: {
      CIK: stockData.CIK,
      Address: stockData.Address,
    },
  };
};
