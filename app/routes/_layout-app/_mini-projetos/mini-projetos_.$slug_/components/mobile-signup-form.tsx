import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ResponsiveEmailSignup from "./responsive-email-signup";
import { useMediaQuery } from "~/lib/hooks/use-media-query";
import type { User } from "~/lib/models/user.server";

function MobileSignupForm({ user }: { user: User | null }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [hideOnMobile, setHideOnMobile] = useState(false);
  useEffect(() => {
    setHideOnMobile(isMobile);
  }, [isMobile]);

  return (
    !user &&
    hideOnMobile && (
      <motion.section
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: -20 },
        }}
        className="w-full bottom-0 h-20 z-20 bg-gradient-to-tr animate-bg from-background-50 to-background-100 border-background-100 dark:from-background-700 dark:to-background-900 fixed shadow-lg border-t dark:border-background-700 flex items-center justify-center"
      >
        <ResponsiveEmailSignup />
      </motion.section>
    )
  );
}

export default MobileSignupForm;
