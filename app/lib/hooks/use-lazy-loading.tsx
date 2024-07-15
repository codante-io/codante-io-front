import { useEffect } from "react";
import LazyLoad from "vanilla-lazyload";

export default function useLazyLoading() {
  useEffect(() => {
    let lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy",
    });
    lazyLoadInstance.update();

    return () => {
      lazyLoadInstance.destroy();
    };
  }, []);
}
