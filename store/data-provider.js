import { createContext, useState, useEffect } from "react";
import useStockApi from "../hooks/useStockApi";

const DataContext = createContext({
    data = [],
    isLoading: false,
    isError: false,
});

export const DataContextProvider = (symbol, timeSeries) => {
    const { stockData, isLoading, isError } = useStockApi({ symbol, timeSeries });

    console.log("data:", stockData);

    const context = {
        data: stockData,
        isLoading,
        isError 
    }
    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
