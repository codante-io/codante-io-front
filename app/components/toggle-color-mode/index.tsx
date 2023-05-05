import { motion } from "framer-motion";
import { useColorMode } from "~/contexts/color-mode-context";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";
import React from "react";

const SunIcon = React.forwardRef(function SunIcon(
  props: any,
  ref: React.Ref<any>
) {
  return (
    <div ref={ref}>
      <TbSunFilled {...props} />
    </div>
  );
});

const MoonIcon = React.forwardRef(function MoonIcon(
  props: any,
  ref: React.Ref<any>
) {
  return (
    <div ref={ref}>
      <TbMoonFilled {...props} />
    </div>
  );
});

const MotionSun = motion(SunIcon);
const MotionMoon = motion(MoonIcon);

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
              ref={null}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              className="block w-4 h-4 text-yellow-500"
            />
          ) : (
            <MotionMoon
              ref={null}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              className="block w-4 h-4 text-white"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
