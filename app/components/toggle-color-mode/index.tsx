import { useColorMode } from "~/contexts/color-mode-context";

export default function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div
      onClick={toggleColorMode}
      className="absolute cursor-pointer inset-y-0 text-white right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
    >
      {colorMode === "dark" && (
        <img className="block h-6 w-6" src="/img/moon.svg" alt="Moon icon" />
      )}
      {colorMode === "light" && (
        <img className="block h-6 w-6" src="/img/sun.svg" alt="Sun icon" />
      )}
    </div>
  );
}
