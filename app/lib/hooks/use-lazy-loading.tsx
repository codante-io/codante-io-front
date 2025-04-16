import { useEffect } from "react";
import LazyLoad from "vanilla-lazyload";

export default function useLazyLoading(refreshDeps: any[] = []) {
  useEffect(() => {
    const lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy",
    });
    lazyLoadInstance.update();

    return () => {
      if (lazyLoadInstance && typeof lazyLoadInstance.destroy === "function") {
        lazyLoadInstance.destroy();
      }
    };
  }, [refreshDeps]);
}
