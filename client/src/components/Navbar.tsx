/**
 * Navbar — Classy, professional fixed navigation
 * Design: Warm cream glassmorphism, elegant typography
 * Halation: subtle warm glow on scroll
 */

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

const SMS_LINK = "sms:5402099772?body=Hey%20Gilliam!%20I%20found%20you%20online%20and%20I'm%20interested%20in%20learning%20more%20about%20real%20estate%20in%20the%20NRV.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "blur(0px)",
        background: scrolled
          ? "rgba(250, 247, 242, 0.85)"
          : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between py-4 sm:py-5">
        <a
          href="#"
          className="font-display font-bold text-lg sm:text-xl tracking-tight text-charcoal hover:text-maroon transition-colors duration-300"
        >
          GILLIAM LARD
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#about"
            className="hidden md:block text-sm text-slate hover:text-charcoal transition-colors duration-300 font-body"
          >
            About
          </a>
          <a
            href="#reviews"
            className="hidden md:block text-sm text-slate hover:text-charcoal transition-colors duration-300 font-body"
          >
            Reviews
          </a>
          <a
            href="tel:5402099772"
            className="hidden sm:block text-sm text-slate hover:text-charcoal transition-colors duration-300 font-display tracking-wide"
          >
            540.209.9772
          </a>
          <a
            href={SMS_LINK}
            className="flex items-center gap-2 bg-maroon hover:bg-maroon-light text-white text-sm font-display font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-maroon/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Text Me</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
