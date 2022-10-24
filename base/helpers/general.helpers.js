export const convertNumber = (param) => {
  if (/[A-Z,a-z]/g.test(param)) {
    return param;
  } else {
    return new Intl.NumberFormat()
      .formatToParts(param)
      .reduce((string, part) => string + part.value, "");
  }
};

export const expirationDate = () => {
  const currentDate = new Date();
  const hour = +currentDate
    .toLocaleString("en-US", {
      timeZone: "America/New_York",
      timeStyle: "short",
      hour12: true,
    })
    .split("")
    .shift();
  const expiration = 86400 - hour * 3600;
  return expiration;
};

export const generateId = () => {
  return Date.now() + 2;
};
