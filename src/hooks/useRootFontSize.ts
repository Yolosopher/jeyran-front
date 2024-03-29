import { useMemo } from "react";
import useMediaQuery from "./useMediaQuery";

const useRootFontSize = () => {
  const isMax1024 = useMediaQuery(1024, true);
  const isMax900 = useMediaQuery(900, true);
  const isMax600 = useMediaQuery(600, true);

  const rootFontSize = useMemo(() => {
    if (isMax600) {
      return 10;
    }
    if (isMax900) {
      return 12;
    }
    if (isMax1024) {
      return 14;
    }
    return 16;
  }, [isMax1024, isMax900, isMax600]);

  return rootFontSize;
};
export default useRootFontSize;
