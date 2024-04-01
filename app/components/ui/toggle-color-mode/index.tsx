import { motion } from "framer-motion";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";
import React from "react";
import useSound from "~/lib/hooks/use-sound/use-sound";

import toggleSound from "~/lib/sounds/toggle.wav";

const SunIcon = React.forwardRef(function SunIcon(
  props: any,
  ref: React.Ref<any>,
) {
  return (
    <div ref={ref}>
      <TbSunFilled {...props} />
    </div>
  );
});

const MoonIcon = React.forwardRef(function MoonIcon(
  props: any,
  ref: React.Ref<any>,
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
  const [playSound] = useSound(toggleSound);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = () => {
    toggleColorMode();
    playSound();
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <div
      onClick={handleClick}
      className={`flex-start flex h-6 w-10 rounded-full bg-background-100 items-center px-[2px] shadow-inner hover:cursor-pointer dark:bg-background-800 ${
        colorMode === "light" && "place-content-end"
      }`}
    >
      <motion.div
        className="flex items-center justify-center w-5 h-5 rounded-full bg-background-200/50 dark:bg-background-900"
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
