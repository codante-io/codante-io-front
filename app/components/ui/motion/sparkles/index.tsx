import { motion } from "framer-motion";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { generateRandomInt } from "~/lib/utils/numbers";
import usePrefersReducedMotion from "~/lib/hooks/use-prefers-reduced-motion";
import { useRandomInterval } from "~/lib/hooks/use-random-interval";
import useSound from "~/lib/hooks/use-sound/use-sound";
import sparklesSound from "~/lib/sounds/sparkles.mp3";
import { cn } from "~/lib/utils/cn";

const generateSparkle = () => {
  return {
    id: String(generateRandomInt(10000, 99999)),
    createdAt: Date.now(),
    size: generateRandomInt(10, 20),
    style: {
      top: `${generateRandomInt(0, 100)}%`,
      left: `${generateRandomInt(0, 100)}%`,
    },
  };
};

const sparkleStyles = cva("absolute block", {
  variants: {
    color: {
      yellow: "fill-yellow-400",
      blue: "fill-blue-400",
      red: "fill-red-400",
      default: "fill-current",
      white: "fill-white",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

/**
 * Heavily inspired by https://www.joshwcomeau.com/react/animated-sparkles-in-react/
 */
const Sparkles = ({
  children,
  color = "default",
  soundEnabled = false,
  enableOnHover = false,
  ...delegated
}: {
  children: React.ReactNode;
  color?: VariantProps<typeof sparkleStyles>["color"];
  soundEnabled?: boolean;
  enableOnHover?: boolean;
}) => {
  const [sparkles, setSparkles] = React.useState(() =>
    Array.from({ length: 3 }).map(() => generateSparkle()),
  );

  const [play] = useSound(sparklesSound, {
    volume: 0.05,
  });

  const handleSparklesHover = () => {
    if (soundEnabled) {
      play();
    }
  };

  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval(
    () => {
      const sparkle = generateSparkle();
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => now - sp.createdAt < 750);
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : 100,
    prefersReducedMotion ? null : 450,
  );

  return (
    <span
      className="relative inline-block"
      {...delegated}
      onMouseEnter={handleSparklesHover}
      onTouchStart={handleSparklesHover}
    >
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={color}
          size={sparkle.size}
          style={sparkle.style}
          enableOnHover={enableOnHover}
        />
      ))}
      <strong className="relative z-10 font-bold">{children}</strong>
    </span>
  );
};

interface SparkleProps extends VariantProps<typeof sparkleStyles> {
  size: number;
  style: React.CSSProperties;
  enableOnHover?: boolean;
}

const Sparkle = ({ size, color, style, enableOnHover }: SparkleProps) => {
  return (
    <motion.span
      className={cn(
        sparkleStyles({ color }),
        enableOnHover && "group-hover:block hidden",
      )}
      style={style}
      initial={{ scale: 0, rotate: 0, opacity: 0, filter: "blur(0px)" }}
      animate={{ scale: 1, rotate: 180, opacity: 1, filter: "blur(1px)" }}
      exit={{ scale: 0, opacity: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8 }}
    >
      <svg width={size} height={size} viewBox="0 0 68 68" fill="none">
        <path
          d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
          className={sparkleStyles({ color })}
        />
      </svg>
    </motion.span>
  );
};

export default Sparkles;
