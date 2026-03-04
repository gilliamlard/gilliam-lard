/**
 * FloatingCTA — Persistent floating SMS button on mobile
 * Design: Fixed bottom-right, appears after scrolling past hero
 * Warm maroon with glow, bright theme
 */

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

const SMS_LINK = "sms:5402099772?body=Hey%20Gilliam!%20I%20found%20you%20online%20and%20I'm%20interested%20in%20learning%20more%20about%20real%20estate%20in%20the%20NRV.";

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
