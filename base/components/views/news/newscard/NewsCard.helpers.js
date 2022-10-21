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

export const changeHandler = (
  e,
  { container, radio, hasChanged, currentID },
  offsets
) => {
  const target = e.target;

  if (currentID !== target.id) {
    currentID = target.id;
    hasChanged = true;
  }

  const radioButtons = [...radio.firstChild.childNodes];

  const getter = {
    get widths() {
      return offsets.rWidth / 2 + offsets.cWidth / 2;
    },
  };

  const altNode = radioButtons.find((node) => node.id !== target.id);
  altNode.checked = false;
  target.checked = true;

  const animationLeft = [
    { translate: "0 0", opacity: "0" },
    {
      translate: `-${
        offsets.sentiWidth
          ? getter.widths - offsets.rWidthChild - offsets.sentiWidth
          : getter.widths - offsets.rWidthChild
      }px 0`,
      opacity: "1",
    },
  ];
  const animationRight = [
    {
      translate: `-${
        offsets.sentiWidth
          ? getter.widths + offsets.rWidthChild + offsets.sentiWidth
          : getter.widths + offsets.rWidthChild
      }px 0`,
      opacity: "0",
    },
    { translate: "0 0", opacity: "1" },
  ];

  const animationTiming = {
    duration: 800,
    fill: "both",
    easing: "ease-in-out",
  };

  if (hasChanged && currentID !== undefined) {
    hasChanged = false;
    if (target.id === "sentiment") {
      container.animate(animationLeft, animationTiming);
    } else {
      container.animate(animationRight, animationTiming);
    }
  }
};
