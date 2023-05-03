import { motion } from "framer-motion";
import { useColorMode } from "~/contexts/color-mode-context";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";

const MotionSun = motion(TbSunFilled);
const MotionMoon = motion(TbMoonFilled);

export default function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <div
      onClick={toggleColorMode}
      className={`flex-start flex h-6 w-10 rounded-full bg-slate-100 items-center px-[2px] shadow-inner hover:cursor-pointer dark:bg-gray-dark ${
        colorMode === "light" && "place-content-end"
      }`}
    >
      <motion.div
        className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200/50 dark:bg-gray-darkest"
        layout
        transition={{ ...spring, staggerChildren: 0.07 }}
      >
        <div>
          {colorMode === "light" ? (
            <MotionSun
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              className="block w-4 h-4 text-yellow-500"
            />
          ) : (
            <MotionMoon
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              className="block w-4 h-4 text-white"
            />
          )}
        </div>
      </motion.div>
    </div>

    // <div
    //   onClick={toggleColorMode}
    //   className="inset-y-0 right-0 flex items-center pr-2 text-white cursor-pointer sm:static sm:inset-auto sm:ml-6 sm:pr-0"
    // >
    //   {colorMode === "dark" && (
    //     <img className="block w-6 h-6" src="/img/moon.svg" alt="Moon icon" />
    //   )}
    //   {colorMode === "light" && (
    //     <img className="block w-6 h-6" src="/img/sun.svg" alt="Sun icon" />
    //   )}
    // </div>
  );
}
