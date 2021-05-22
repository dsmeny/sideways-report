import { createContext, useState, useEffect } from "react";

const TriggerContext = createContext({
  searchTrigger: null,
  showSearch: function () {},
  getStorage: function () {},
  locStorage: null,
});

export function TriggerContextProvider(props) {
  const [isSearch, setIsSearch] = useState(false);
  const [storage, setStorage] = useState(0);

  function searchHandler() {
    setIsSearch(!isSearch);
  }

  function getStorageLength() {
    setStorage(localStorage.length);
  }

  useEffect(() => {
    searchHandler();
  }, [storage]);

  const context = {
    searchTrigger: isSearch,
    showSearch: searchHandler,
    getStorage: getStorageLength,
    locStorage: storage,
  };

  return (
    <TriggerContext.Provider value={context}>
      {props.children}
    </TriggerContext.Provider>
  );
}

export default TriggerContext;
