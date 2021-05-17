import { createContext, useState, useEffect } from "react";

const TriggerContext = createContext({
  searchTrigger: null,
});

export function TriggerContextProvider(props) {
  const [isSearch, setIsSearch] = useState(false);
}

export default TriggerContext;
