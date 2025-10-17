import { useScroll, useTransform } from "framer-motion";

export function useAnimateScroll({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  return {
    rotateX: useTransform(scrollYProgress, [0, 1], [20, 0]),
    scale: useTransform(scrollYProgress, [0, 1], [1.05, 1]),
    translateY: useTransform(scrollYProgress, [0, 1], [0, -10]),
  };
}
