import { motion, useInView } from "framer-motion";
import * as React from "react";

export function BlurReveal({
  children,
  className = "",
  staggerChildren = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  const FADE_DOWN = {
    hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
    show: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : ""}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  );
}
