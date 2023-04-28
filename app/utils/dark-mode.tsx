export type ColorMode = "light" | "dark";

export function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference as ColorMode;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return "light";
}

export function setColorModeClass(colorMode: ColorMode) {
  if (colorMode === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
}

export function setColorMode() {
  function getColorMode() {
    const persistedColorPreference = window.localStorage.getItem("color-mode");
    const hasPersistedPreference = typeof persistedColorPreference === "string";

    if (hasPersistedPreference) {
      return persistedColorPreference as ColorMode;
    }

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mediaQueryList.matches === "boolean";
    if (hasMediaQueryPreference) {
      return mediaQueryList.matches ? "dark" : "light";
    }

    return "light";
  }

  const colorMode = getColorMode();
  if (colorMode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const DarkModeScriptInnerHtml =
  '(function setColorMode() {\n  function getColorMode() {\n    let persistedColorPreference = window.localStorage.getItem("color-mode");\n    if (typeof persistedColorPreference == "string")\n      return persistedColorPreference;\n    let mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");\n    return typeof mediaQueryList.matches == "boolean" && mediaQueryList.matches ? "dark" : "light";\n  }\n  getColorMode() === "dark" ? (document.documentElement.classList.add("dark"), document.documentElement.classList.remove("light")) : (document.documentElement.classList.remove("dark"), document.documentElement.classList.add("light"));\n})()';
