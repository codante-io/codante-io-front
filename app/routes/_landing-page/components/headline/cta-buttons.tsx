import { Button } from "~/components/ui/button";

import { Link } from "@remix-run/react";
import Sparkles from "~/components/ui/motion/sparkles";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function CTAButtons() {
  const MotionButton = motion(Button);

  return (
    <div className="w-full flex gap-4 flex-wrap mt-10">
      <Link to="/mini-projetos">
        <MotionButton
          variant="register"
          className="w-fit flex items-center gap-2 group"
          whileHover="hover"
          whileTap="hover"
        >
          <motion.span
            initial={{ translateX: 10 }}
            variants={{
              hover: { translateX: -2 },
              initial: { translateX: 10 },
            }}
            transition={{ duration: 0.2 }}
          >
            Conheça os{" "}
            <Sparkles enableOnHover color="yellow">
              Mini Projetos
            </Sparkles>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, translateX: "-50%" }}
            variants={{
              hover: { opacity: 1, translateX: 0 },
              initial: { opacity: 0, translateX: "-100%" },
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </MotionButton>
      </Link>
      <Link to="/workshops">
        <MotionButton
          variant="register"
          className="w-fit flex items-center gap-2 group"
          whileHover="hover"
          whileTap="hover"
        >
          <motion.span
            initial={{ translateX: 10 }}
            variants={{
              hover: { translateX: -2 },
              initial: { translateX: 10 },
            }}
            transition={{ duration: 0.2 }}
          >
            Conheça os{" "}
            <Sparkles enableOnHover color="blue">
              Workshops
            </Sparkles>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, translateX: "-50%" }}
            variants={{
              hover: { opacity: 1, translateX: 0 },
              initial: { opacity: 0, translateX: "-100%" },
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </MotionButton>
      </Link>
    </div>
  );
}

export default CTAButtons;
