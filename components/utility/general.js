export const convertNumber = (param) => {
  if (/[A-Z,a-z]/g.test(param)) {
    return param;
  } else {
    return new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 3,
    }).format(param);
  }
};
