import { createContext, useState, useEffect } from "react";

const TriggerContext = createContext({
  searchTrigger: null,
  showSearch: function () {},
  showIcon: function () {},
  scrollRefresh: function () {},
  clickedTrigger: null,
  displayIcon: null,
});

export function TriggerContextProvider(props) {
  const [isSearch, setIsSearch] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  function searchHandler() {
    setIsSearch(!isSearch);
  }

  function scrollHandler() {
    setIsClicked(!isClicked);
  }

  function noScroll() {
    window.scrollTo(0, 1000);
  }

  function symbolHandler() {
    if (hasSymbol === true) {
      setHasSymbol(false);
    } else {
      setHasSymbol(true);
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 1000,
      left: 0,
      behavior: "smooth",
    });
    if (isClicked) {
      window.scrollY = "100vh";
      window.addEventListener("scroll", noScroll);

      if (window.scrollY <= "100vh") {
        window.removeEventListener("scroll", noScroll);
      }
    }
  }, [isClicked]);

  const context = {
    searchTrigger: isSearch,
    showSearch: searchHandler,
    scrollRefresh: scrollHandler,
    clickedTrigger: isClicked,
    setDisplayIcon: symbolHandler,
    displayIcon: hasSymbol,
  };

  return (
    <TriggerContext.Provider value={context}>
      {props.children}
    </TriggerContext.Provider>
  );
}

export default TriggerContext;
