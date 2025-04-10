import { motion } from "framer-motion";
import { ForwardRefExoticComponent } from "react";

export function BlurRevealText({
  children,
  element,
  className,
  delay = 0.2,
}: {
  children: React.ReactNode;
  element: string | ForwardRefExoticComponent<any>;
  className?: string;
  delay?: number;
}) {
  const Component = motion(element);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.4, delay }}
      variants={{
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        hidden: { opacity: 0.5, y: -10, filter: "blur(10px)" },
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
