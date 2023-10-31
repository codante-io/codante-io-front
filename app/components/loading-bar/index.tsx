import React from "react";
import ReactLoadingBar from "react-top-loading-bar";
import type { LoadingBarRef } from "react-top-loading-bar";
import { useNavigation } from "@remix-run/react";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

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

  return (
    <ReactLoadingBar
      shadow
      color={(fullConfig.theme?.colors?.brand as { DEFAULT: string })?.DEFAULT}
      ref={ref}
    />
  );
}
