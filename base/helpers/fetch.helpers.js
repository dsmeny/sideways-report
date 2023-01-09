const fetcher = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error(`HTTP error! status: ${res.status}`);
    error.info = await res.json();
    error.status = res.status;
    return error;
  }

  const data = await res.json();

  return data;
};

export default fetcher;

export const fetchAll = async (...args) => {
  let response = await Promise.all(
    Array.from(args, (url) => fetcher(url))
  ).then((response) => response);

  response = await { ...response[0], ...response[1].data.defaultKeyStatistics };

  console.log("response: ", response);

  return response;
};
