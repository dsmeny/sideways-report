export const validateSentiment = (string) => {
  const lowerCaseStr = string.toLowerCase();

  switch (true) {
    case /bull/.test(lowerCaseStr):
      return "bull";
    case /bear/.test(lowerCaseStr):
      return "bear";
    default:
      return "neutral";
  }
};

export const formatNewsDate = (dateStr) => {
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const hour = dateStr.substring(9, 11);
  const min = dateStr.substring(11, 13);
  const sec = dateStr.substring(13, 15);

  const formattedDate = `${year}-${month}-${day}T${hour}:${min}:${sec}`;

  const options = { dateStyle: "full", timeStyle: "medium" };
  return new Intl.DateTimeFormat("en-US", options).format(
    new Date(formattedDate)
  );
};

export const counterNodes = (
  direction,
  listRef,
  countRef,
  setCounter,
  INCREMENT_BY
) => {
  const listRefNode = listRef.current;
  switch (direction) {
    case "up":
      countRef.current = countRef.current + INCREMENT_BY;
      listRefNode.style.translate = `0 ${countRef.current}px`;
      setCounter((prop) => {
        return {
          ...prop,
          upper_bound: prop.upper_bound - 1,
          lower_bound: prop.lower_bound - 1,
        };
      });
      break;
    case "down":
      countRef.current = countRef.current - INCREMENT_BY;
      listRefNode.style.translate = `0 ${countRef.current}px`;

      setCounter((prop) => {
        return {
          ...prop,
          lower_bound: prop.lower_bound + 1,
          upper_bound: prop.upper_bound + 1,
        };
      });
      break;
    default:
      break;
  }
};
