import { API_PARAMS } from "../../constants";

export const postToRedis = (series, data) => {
  fetch("/api/redis_cloud", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: series,
      payload: JSON.stringify(data),
    }),
  });
};

export const hasErrorMessage = (obj) => {
  console.log("obj: ", obj);
  return Object.keys(obj).some((elem) => elem.match(/([E]|[e])rror/g));
};

export const apiParamsHandler = (data, timeSeries) => {
  switch (timeSeries) {
    case API_PARAMS.TIME_SERIES_DAILY:
      postToRedis(data["Meta Data"]["2. Symbol"], data);
      return;
    case API_PARAMS.OVERVIEW:
      postToRedis(data.Name, data);
      return;
    case API_PARAMS.GLOBAL_QUOTE:
      postToRedis(`${data["Global Quote"]["01. symbol"]}_global`, data);
      return;
    default:
      console.log(new Error("No matching timeSeries."));
      return;
  }
};
