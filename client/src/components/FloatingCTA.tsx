/**
 * FloatingCTA — Persistent floating SMS button on mobile
 * Design: Fixed bottom-right, appears after scrolling past hero
 * Warm maroon with glow, bright theme
 */

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

const SMS_LINK = "sms:5402099772?body=Hey%2C%20thank%20you%20for%20taking%20the%20time%20to%20reach%20out.%20I%27ve%20made%20this%20super%20easy%20with%20a%20pre-made%20text%20%E2%80%94%20all%20you%20do%20is%20click%20send%20and%20I%27ll%20get%20back%20to%20you%20as%20soon%20as%20I%20can%21%20Have%20a%20blessed%20rest%20of%20your%20day.";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 600);
  });

  return (
    <motion.a
      href={SMS_LINK}
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2 bg-maroon hover:bg-maroon-light text-white font-display font-semibold text-sm px-5 py-3.5 rounded-full shadow-xl shadow-maroon/25 animate-pulse-glow"
    >
      <MessageCircle className="w-5 h-5" />
      Text Me
    </motion.a>
  );
}
