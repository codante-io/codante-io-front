import React from "react";
import { generateRandomInt } from "../utils/numbers";

export const useRandomInterval = (
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null,
) => {
  const timeoutId = React.useRef<number | null>(null);
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const isEnabled =
      typeof minDelay === "number" && typeof maxDelay === "number";

    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = generateRandomInt(minDelay, maxDelay);

        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };

      handleTick();
    }

    return () => window.clearTimeout(timeoutId.current!);
  }, [minDelay, maxDelay]);

  const cancel = React.useCallback(function () {
    window.clearTimeout(timeoutId.current!);
  }, []);

  return cancel;
};
