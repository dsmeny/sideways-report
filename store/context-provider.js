import { createContext, useState, useEffect } from "react";

const TriggerContext = createContext({
  searchTrigger: null,
  showSearch: function () {},
  getStorage: function () {},
  locStorage: null,
  scrollRefresh: function () {},
  clickedTrigger: null,
});

export function TriggerContextProvider(props) {
  const [isSearch, setIsSearch] = useState(true);
  const [storage, setStorage] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  function searchHandler() {
    setIsSearch(!isSearch);
  }

  function getStorageLength() {
    setStorage(localStorage.length);
  }

  function scrollHandler() {
    setIsClicked(!isClicked);
  }

  function noScroll() {
    window.scrollTo(0, 1000);
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

  useEffect(() => {
    searchHandler();
  }, [storage]);

  const context = {
    searchTrigger: isSearch,
    showSearch: searchHandler,
    getStorage: getStorageLength,
    locStorage: storage,
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
