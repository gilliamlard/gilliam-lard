/**
 * Contact — Final CTA section
 * Design: Full-width dark section with abstract texture background
 * Massive CTA button, contact details
 */

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";

const SMS_LINK = "sms:5402099772?body=Hey%20Gilliam!%20I%20found%20you%20online%20and%20I'm%20interested%20in%20learning%20more%20about%20real%20estate%20in%20the%20NRV.";
const TEXTURE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388409088/U9NrqBKRzTeVrcCo656SAy/abstract-dark-texture-WPWQ7XVgo7hQZ3PNogT3vW.webp";

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
      {/* Background texture */}
      <div className="absolute inset-0">
        <img
          src={TEXTURE_BG}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="container relative z-10 text-center">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-display text-xs tracking-[0.3em] uppercase text-maroon block mb-4"
        >
          Get In Touch
        </motion.span>

        <motion.h2
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-4 sm:mb-6"
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
          className="text-off-white/60 text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-10 sm:mb-14"
        >
          Send me a text and let's talk about your real estate goals. No pressure, just a conversation.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 sm:mb-16"
        >
          <a
            href={SMS_LINK}
            className="group inline-flex items-center gap-3 sm:gap-4 bg-maroon hover:bg-maroon-light text-white font-display font-bold text-lg sm:text-xl md:text-2xl px-10 py-5 sm:px-14 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 animate-pulse-maroon"
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
            className="flex items-center gap-3 text-warm-gray hover:text-white transition-colors duration-300 group"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-maroon/50 transition-colors duration-300">
              <Phone className="w-4 h-4" />
            </div>
            <span className="font-display tracking-wide text-sm sm:text-base">540.209.9772</span>
          </a>
          <a
            href="mailto:glard.agent@gmail.com"
            className="flex items-center gap-3 text-warm-gray hover:text-white transition-colors duration-300 group"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-maroon/50 transition-colors duration-300">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-display tracking-wide text-sm sm:text-base">glard.agent@gmail.com</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
