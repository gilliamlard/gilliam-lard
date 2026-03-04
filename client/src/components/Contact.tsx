/**
 * Contact — Final CTA section
 * Design: Keep the same bold CTA style, bright warm theme
 * Add personal message copy above the button
 * Halation glow effects
 */

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";

const SMS_LINK = "sms:5402099772?body=Hey%2C%20thank%20you%20for%20taking%20the%20time%20to%20reach%20out.%20I%27ve%20made%20this%20super%20easy%20with%20a%20pre-made%20text%20%E2%80%94%20all%20you%20do%20is%20click%20send%20and%20I%27ll%20get%20back%20to%20you%20as%20soon%20as%20I%20can%21%20Have%20a%20blessed%20rest%20of%20your%20day.";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Halation background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%]"
          style={{
            background: "radial-gradient(ellipse at center, oklch(0.55 0.14 18 / 0.06) 0%, oklch(0.78 0.10 75 / 0.04) 40%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="container relative z-10 text-center">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-display text-xs tracking-[0.25em] uppercase text-maroon font-medium block mb-4"
        >
          Get In Touch
        </motion.span>

        <motion.h2
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-charcoal mb-4 sm:mb-6"
        >
          Ready to start
          <br />
          <span className="text-maroon">your journey?</span>
        </motion.h2>

        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-slate text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-10 sm:mb-12 leading-relaxed"
        >
          Send me a text and let's talk about your real estate goals. No pressure, just a conversation.
        </motion.p>

        {/* Primary CTA — keep the same bold style */}
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 sm:mb-16"
        >
          <a
            href={SMS_LINK}
            className="group inline-flex items-center gap-3 sm:gap-4 bg-maroon hover:bg-maroon-light text-white font-display font-bold text-lg sm:text-xl md:text-2xl px-10 py-5 sm:px-14 sm:py-6 rounded-full transition-all duration-300 hover:scale-[1.03] animate-pulse-glow shadow-xl shadow-maroon/20"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            Text Me Now
            <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:translate-x-2" />
          </a>
        </motion.div>

        {/* Secondary contact options */}
        <motion.div
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          <a
            href="tel:5402099772"
            className="flex items-center gap-3 text-warm-gray hover:text-charcoal transition-colors duration-300 group"
          >
            <div className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-maroon/30 group-hover:bg-maroon-soft transition-all duration-300">
              <Phone className="w-4 h-4" />
            </div>
            <span className="font-display tracking-wide text-sm sm:text-base">540.209.9772</span>
          </a>
          <a
            href="mailto:glard.agent@gmail.com"
            className="flex items-center gap-3 text-warm-gray hover:text-charcoal transition-colors duration-300 group"
          >
            <div className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-maroon/30 group-hover:bg-maroon-soft transition-all duration-300">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-display tracking-wide text-sm sm:text-base">glard.agent@gmail.com</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
