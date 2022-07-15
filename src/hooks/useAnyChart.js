import { useEffect, useState } from "react";

/** Hook for using anychart module */
export const useAnychart = () => {
  const [isAnychartLoaded, setIsAnychartLoaded] = useState({
    anychart: null,
    isAnychartReady: false,
  });
  useEffect(() => {
    if (window.anychart) {
      setIsAnychartLoaded({
        anychart: window.anychart,
        isAnychartReady: true,
      });
    } else {
      setIsAnychartLoaded({
        anychart: null,
        isAnychartReady: false,
      });
    }
  }, [window.anychart]);

  return isAnychartLoaded;
};
