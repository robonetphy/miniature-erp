import { useEffect, useCallback } from "react";
const useArrowNavigation = (
  containerRef,
  selectCallback,
  editCallBack,
  deleteCallback
) => {
  const handleKeyDown = useCallback(
    (e) => {
      var allSelectable = containerRef.current.querySelectorAll(
        "[data-selected]"
      );
      var currentIndex = null,
        nextIndex = null;
      allSelectable.forEach((element, index) => {
        if (element.getAttribute("data-selected") === "true")
          currentIndex = index;
      });
      if (e.which === 38) {
        nextIndex = currentIndex - 1;
      }
      if (e.which === 40) {
        nextIndex = currentIndex + 1;
      }
      if (nextIndex === -1 || nextIndex === allSelectable.length) {
        nextIndex = currentIndex;
        const input = containerRef.current
          .querySelector('[data-search="true"]')
          .querySelector("input");
        input.focus();
      } else if (allSelectable[nextIndex]) {
        allSelectable[nextIndex].focus();
        selectCallback(allSelectable[nextIndex].getAttribute("data-key"));
      }
      if (e.which === 13 && typeof editCallBack === "function") {
        editCallBack(currentIndex);
      }
      if (e.which === 46 && typeof deleteCallback === "function") {
        deleteCallback(currentIndex);
      }
    },
    [containerRef, editCallBack, deleteCallback]
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
