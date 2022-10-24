import { useRef } from "react";
import { changeHandler } from "./NewsCard.helpers";

const useNewsRefs = () => {
  const containerRef = useRef();
  const radioRef = useRef();
  const hasChangedRef = useRef(false);
  const currentIDRef = useRef();
  const sentimentRef = useRef();

  const radioHandlers = (e) => {
    const refs = {
      container: containerRef.current,
      radio: radioRef.current,
      hasChanged: hasChangedRef.current,
      currentID: currentIDRef.current,
      sentiment: sentimentRef.current,
    };

    const offsets = {
      cWidth: refs.container.clientWidth,
      rWidth: refs.radio.clientWidth,
      rWidthChild: refs.radio.firstChild.clientWidth,
      sentiWidth: refs.sentiment?.clientWidth,
    };

    changeHandler(e, refs, offsets);
  };

  return [{ containerRef, radioRef, sentimentRef }, radioHandlers];
};

export default useNewsRefs;
