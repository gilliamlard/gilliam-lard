/**
 * Hero — Full-viewport section
 * Design: Split layout on desktop (text left, headshot right)
 * Stacked on mobile (headshot top, text below)
 * Large bold typography, prominent SMS CTA button
 * Staggered clip-path text reveals
 */

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

const SMS_LINK = "sms:5402099772?body=Hey%20Gilliam!%20I%20found%20you%20online%20and%20I'm%20interested%20in%20learning%20more%20about%20real%20estate%20in%20the%20NRV.";

const HEADSHOT_URL = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663388409088/NeWQjnDzLkLYOWDD.JPEG?Expires=1804191409&Signature=TjEbHf~5JmWCwGIl1qCb5W9s28gvkqS8NJe5o-CAxsim~8Mv-SKP2CyNeO~xF8DtyTRFvMRLGPEOln53KF3ip5DIoNbgcvKy5EjNyOHd3Iohcw9NA379D8Wpn0Qi3uqX2GvfiFSbzuB7yxuMq4UGSWiYy5vfb5m-cBqzMgqJOOGzcuCRCShNs3l7x~71yp3mbXcmtxkEHHW8BfNq1jO~3xaaC3sDdH6tCZ0kFNLJhgkyErvCmm2e-bOqb97qAP5GfJB9qKTnJ2Vc1YMi78FRW~nFDxNdaZBRP~LVUsrEPpFhZqpJ9PCCrcOGGhlJw4Su9iPsEfdhXh9MGwtFkDxXiA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const lineVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const fadeUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-0 grain-overlay">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-charcoal/30" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20 lg:py-0">
          {/* Text Content — Left side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Subtitle */}
            <motion.div variants={fadeUp} className="mb-4 sm:mb-6">
              <span className="font-display text-xs sm:text-sm tracking-[0.3em] uppercase text-warm-gray">
                Real Estate Advisor
              </span>
            </motion.div>

            {/* Name — oversized stacked text */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                variants={lineVariants}
                className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.9] tracking-tight text-white"
              >
                GILLIAM
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6 sm:mb-8">
              <motion.h1
                variants={lineVariants}
                className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.9] tracking-tight text-maroon"
              >
                LARD
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl md:text-2xl text-off-white/80 font-light mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0"
            >
              Faithful service for your future.
            </motion.p>

            {/* Primary CTA — SMS Button */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a
                href={SMS_LINK}
                className="group flex items-center gap-3 bg-maroon hover:bg-maroon-light text-white font-display font-semibold text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-5 rounded-full transition-all duration-300 hover:scale-105 animate-pulse-maroon"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Text Me Now
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <div className="flex items-center gap-4 text-warm-gray text-sm">
                <a href="tel:5402099772" className="hover:text-white transition-colors duration-300 font-display tracking-wide">
                  Call
                </a>
                <span className="text-white/20">|</span>
                <a href="mailto:glard.agent@gmail.com" className="hover:text-white transition-colors duration-300 font-display tracking-wide">
                  Email
                </a>
              </div>
            </motion.div>

            {/* Brokerage tag */}
            <motion.p
              variants={fadeUp}
              className="mt-8 sm:mt-12 text-xs text-warm-gray/60 font-display tracking-wider uppercase"
            >
              Berkshire Hathaway HomeServices
            </motion.p>
          </motion.div>

          {/* Headshot — Right side */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Maroon glow behind headshot */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-maroon/20 blur-3xl scale-90" />
              <img
                src={HEADSHOT_URL}
                alt="Gilliam Lard — Real Estate Advisor"
                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-cover object-top rounded-2xl sm:rounded-3xl shadow-2xl"
              />
              {/* Decorative maroon border accent */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full rounded-2xl sm:rounded-3xl border-2 border-maroon/30" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-display tracking-[0.2em] uppercase text-warm-gray/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-warm-gray/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
