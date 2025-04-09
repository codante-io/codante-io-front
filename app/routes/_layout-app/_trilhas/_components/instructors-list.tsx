import { useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import type { Instructor } from "~/lib/models/instructor.server";

export const InstructorsList = ({
  instructors,
}: {
  instructors: Instructor[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>();
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {instructors.map((item) => (
        <div
          className="-mr-4 relative group dark:text-white text-gray-80"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 260, damping: 10 },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md dark:bg-background-700 bg-background-00 z-50 shadow-xl px-4 py-2"
            >
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-linear-to-r from-transparent via-brand-800 to-transparent h-px " />
              <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-linear-to-r from-transparent via-brand-500 to-transparent h-px " />
              <div className="font-bold relative z-30 text-base">
                {item.name}
              </div>
              <div className="0 text-xs">{item.company}</div>
            </motion.div>
          )}
          <img
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.avatar_url}
            alt={item.name}
            className="object-cover m-0! p-0! object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-background-100 dark:border-background-700 relative transition duration-500"
          />
        </div>
      ))}
    </>
  );
};
