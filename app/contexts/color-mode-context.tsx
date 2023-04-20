import { createContext, useContext, useEffect, useState } from "react";
import { getInitialColorMode, setColorModeClass } from "~/utils/dark-mode";

import type { ReactNode } from "react";
import type { ColorMode } from "~/utils/dark-mode";

export type ColorModeContextType = {
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);
const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, rawSetColorMode] = useState<ColorMode>("dark");

  useEffect(() => {
    rawSetColorMode(getInitialColorMode());
  }, []);

  const setColorMode = (colorMode: ColorMode) => {
    rawSetColorMode(colorMode);
    setColorModeClass(colorMode);
    // Persist it on update
    window.localStorage.setItem("color-mode", colorMode);
  };

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

function useColorMode() {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}

export { ColorModeProvider, useColorMode };
