import { useEffect, useCallback } from "react";
const useEnterNavigation = (containerRef) => {
  const preOrderHelper = useCallback((root) => {
    if (root !== null) {
      if (root.tabIndex !== -1) return root;
      var nodes = root.childNodes;
      var isFound = null;
      for (var i = 0; i < nodes.length; i++) {
        isFound = preOrderHelper(nodes[i]);
        if (isFound instanceof Element) return isFound;
      }
    }
    return null;
  }, []);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.which === 13) {
        var element = document.querySelector(":focus");
        var parent = element;
        while (parent.getAttribute("data-navigation") === null) {
          parent = parent.parentNode;
        }
        var allNavigation = containerRef.current.querySelectorAll(
          "[data-navigation=true]"
        );
        var currentIndex = null;
        allNavigation.forEach((element, index) => {
          if (parent.isSameNode(element)) currentIndex = index;
        });
        var nextElement =
          currentIndex + 1 === allNavigation.length
            ? allNavigation[0]
            : allNavigation[currentIndex + 1];
        var child = nextElement;
        preOrderHelper(child).focus();
      }
    },
    [preOrderHelper, containerRef]
  );
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, containerRef]);
};
export default useEnterNavigation;
//Add data-navigation=true as property to consider as element get focused during enter.
