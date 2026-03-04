/**
 * Navbar — Minimal, fixed top navigation
 * Design: transparent bg, logo left, CTA right
 * Animates in on load with staggered reveal
 */

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const SMS_LINK = "sms:5402099772?body=Hey%20Gilliam!%20I%20found%20you%20online%20and%20I'm%20interested%20in%20learning%20more%20about%20real%20estate%20in%20the%20NRV.";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", background: "rgba(8,8,8,0.7)" }}
    >
      <a href="#" className="font-display font-bold text-lg sm:text-xl tracking-tight text-white hover:text-maroon-light transition-colors duration-300">
        GILLIAM LARD
      </a>

      <div className="flex items-center gap-4 sm:gap-6">
        <a
          href="tel:5402099772"
          className="hidden sm:block text-sm text-warm-gray hover:text-white transition-colors duration-300 font-display tracking-wide"
        >
          540.209.9772
        </a>
        <a
          href={SMS_LINK}
          className="flex items-center gap-2 bg-maroon hover:bg-maroon-light text-white text-sm font-display font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Text Me</span>
        </a>
      </div>
    </motion.nav>
  );
}
