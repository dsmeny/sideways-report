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

  function searchHandler() {
    setIsSearch(!isSearch);
  }

  function scrollHandler() {
    setIsClicked(!isClicked);
  }

  function noScroll() {
    window.scrollTo(0, 1000);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
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
  };

  return (
    <TriggerContext.Provider value={context}>
      {props.children}
    </TriggerContext.Provider>
  );
}

export default TriggerContext;
