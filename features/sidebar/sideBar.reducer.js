export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case "icon1":
      return { icon1: true, icon2: false, icon3: false };
    case "icon2":
      return { icon1: false, icon2: true, icon3: false };
    case "icon3":
      return { icon1: false, icon2: false, icon3: true };
    default:
      return state;
  }
};
