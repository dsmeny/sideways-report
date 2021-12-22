export const convertNumber = (param) => {
  if (/[A-Z,a-z]/g.test(param)) {
    return param;
  } else {
    return new Intl.NumberFormat()
      .formatToParts(param)
      .reduce((string, part) => string + part.value, "");
  }
};
