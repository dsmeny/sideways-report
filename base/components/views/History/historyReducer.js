export const timeSeriesReducer = (state, action) => {
  switch (action.type) {
    case "setDate":
      return {
        ...state,
        date: action.payload,
      };
    case "setSelectedYear":
      return {
        ...state,
        selectedYear: action.payload,
      };
    case "setMonth":
      return {
        ...state,
        activeMonth: action.payload,
      };
    case "setIpoDate":
      return {
        ...state,
        ipoDate: {
          year: action.payload.year,
          month: action.payload.month,
        },
      };
    case "setVolume":
      return {
        ...state,
        volume: action.payload,
      };
    default:
      return state;
  }
};

export const initialState = {
  date: "max",
  selectedYear: Number(),
  activeMonth: "",
  ipoDate: {
    year: Number(),
    month: "",
  },
  volume: "all",
};
