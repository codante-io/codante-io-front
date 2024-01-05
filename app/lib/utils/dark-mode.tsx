export type ColorMode = "light" | "dark";

export function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference as ColorMode;
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return "dark";
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

    return "dark";
  }

  const colorMode = getColorMode();
  if (colorMode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export const DarkModeScriptInnerHtml = `(function setColorMode() {
    function getColorMode() {
        let persistedColorPreference = window.localStorage.getItem("color-mode");
        if (typeof persistedColorPreference == "string")
            return persistedColorPreference;
        return "dark"
    }
    getColorMode() === "dark" ? (document.documentElement.classList.add("dark"), document.documentElement.classList.remove("light")) : (document.documentElement.classList.remove("dark"), document.documentElement.classList.add("light"));
})()`;
