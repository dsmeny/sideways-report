import { createContext, useState } from "react";

const TriggerContext = createContext({
  searchTrigger: null,
  showSearch: function () {},
  showIcon: function () {},
  clickedTrigger: null,
  displayIcon: null,
});

export const TriggerContextProvider = (props) => {
  const [isSearch, setIsSearch] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  function searchHandler(e) {
    if (e === false) {
      setIsSearch(false);
      return;
    } else if (e === true) {
      setIsSearch(true);
      return;
    }
    setIsSearch(!isSearch);
  }

  function noScroll() {
    window.scrollTo(0, 1000);
  }

  const context = {
    searchTrigger: isSearch,
    showSearch: searchHandler,
    clickedTrigger: isClicked,
  };

  return (
    <TriggerContext.Provider value={context}>
      {props.children}
    </TriggerContext.Provider>
  );
};

export default TriggerContext;
