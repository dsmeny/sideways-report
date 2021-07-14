export const getMaxDate = () => {
  const date = new Date();
  const daysofweek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const dateStr = String(date.getUTCMonth() + 1).padStart(2, "0");

  return {
    date: date.getUTCDate() - 1,
    month: dateStr,
    year: date.getFullYear(),
    day: {
      dayofweek: daysofweek[date.getUTCDay() - 1],
      numerical: date.getUTCDay() - 1,
    },
  };
};
