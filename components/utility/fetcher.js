const fetcher = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error(`HTTP error! status: ${res.status}`);
    error.info = await res.json();
    error.status = res.status;
    return error;
  }

  return res.json();
};

export default fetcher;
