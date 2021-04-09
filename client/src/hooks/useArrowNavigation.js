import { useEffect, useCallback } from "react";
const useArrowNavigation = (containerRef) => {
  const handleKeyDown = useCallback(
    (e) => {
      var allArrowNavigation = containerRef.current.querySelectorAll(
        '[id^="MUIDataTableSelectCell-"]'
      );
      var currentFocus = document.querySelector(":focus");
      var currentIndex = null,
        nextElement = null;
      allArrowNavigation.forEach((element, index) => {
        if (currentFocus.isSameNode(element)) currentIndex = index;
      });
      if (e.which === 38) {
        nextElement =
          currentIndex - 1 === -1
            ? allArrowNavigation[0]
            : allArrowNavigation[currentIndex - 1];
      }
      if (e.which === 40) {
        nextElement =
          currentIndex + 1 === allArrowNavigation.length
            ? allArrowNavigation[allArrowNavigation.length - 1]
            : allArrowNavigation[currentIndex + 1];
      }
      if (nextElement) nextElement.focus();
    },
    [containerRef]
  );
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, containerRef]);
};
export default useArrowNavigation;
