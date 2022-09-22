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
