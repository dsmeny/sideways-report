import { useContext, useEffect } from "react";
import TriggerContext from "../../contexts/context-provider";
import { MEDIA_SIZES } from "../../constants";

const useMobile = () => {
  const { isMobile, handleScreenChanges } = useContext(TriggerContext);

  useEffect(() => {
    const media = (size) => {
      return window.matchMedia(`screen and (max-width: ${size}px)`);
    };

    const mediaMatch = media(MEDIA_SIZES.MOBILE);

    if (!isMobile) {
      handleScreenChanges(mediaMatch);
    }
    mediaMatch.addEventListener("change", handleScreenChanges);
  }, []);

  return { isMobile };
};

export default useMobile;
