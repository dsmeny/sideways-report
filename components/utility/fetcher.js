const fetcher = async (...args) => {
  const request = await fetch(...args);
  const response = await request.json();
  return response;
};

export default fetcher;
