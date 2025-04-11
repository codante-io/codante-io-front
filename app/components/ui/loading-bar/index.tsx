import React from "react";
import ReactLoadingBar from "react-top-loading-bar";
import type { LoadingBarRef } from "react-top-loading-bar";
import { useNavigation } from "react-router";

export default function TopLoadingBar() {
  const ref = React.useRef<LoadingBarRef>(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (navigation.state === "loading") {
      if (ref?.current) ref.current.continuousStart();
    } else if (navigation.state === "idle") {
      if (ref?.current) ref.current.complete();
    }
  }, [navigation.state]);

  return <ReactLoadingBar shadow color={"#5282ff"} ref={ref} />;
}
