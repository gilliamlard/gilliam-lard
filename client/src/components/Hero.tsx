/**
 * Hero — Full-viewport, bright & elegant
 * Design: Warm cream bg, halation glow behind headshot,
 * bold typography, prominent SMS CTA with personal copy
 * Classy, professional, inviting
 */

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";

const SMS_LINK = "sms:5402099772?body=Hey%2C%20thank%20you%20for%20taking%20the%20time%20to%20reach%20out.%20I%27ve%20made%20this%20super%20easy%20with%20a%20pre-made%20text%20%E2%80%94%20all%20you%20do%20is%20click%20send%20and%20I%27ll%20get%20back%20to%20you%20as%20soon%20as%20I%20can%21%20Have%20a%20blessed%20rest%20of%20your%20day.";

const HEADSHOT_URL = "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663388409088/NeWQjnDzLkLYOWDD.JPEG?Expires=1804191409&Signature=TjEbHf~5JmWCwGIl1qCb5W9s28gvkqS8NJe5o-CAxsim~8Mv-SKP2CyNeO~xF8DtyTRFvMRLGPEOln53KF3ip5DIoNbgcvKy5EjNyOHd3Iohcw9NA379D8Wpn0Qi3uqX2GvfiFSbzuB7yxuMq4UGSWiYy5vfb5m-cBqzMgqJOOGzcuCRCShNs3l7x~71yp3mbXcmtxkEHHW8BfNq1jO~3xaaC3sDdH6tCZ0kFNLJhgkyErvCmm2e-bOqb97qAP5GfJB9qKTnJ2Vc1YMi78FRW~nFDxNdaZBRP~LVUsrEPpFhZqpJ9PCCrcOGGhlJw4Su9iPsEfdhXh9MGwtFkDxXiA__&Key-Pair-Id=K2HSFNDJXOU9YS";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const lineVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: easeOut },
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawPortraitY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rawTextY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const rawTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Only enable scroll parallax on devices with fine pointers (desktop).
  // Touch devices skip the transforms entirely for a snappier feel.
  const [parallaxOn, setParallaxOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    setParallaxOn(mq.matches);
    const handler = (e: MediaQueryListEvent) => setParallaxOn(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const portraitY = parallaxOn ? rawPortraitY : 0;
  const textY = parallaxOn ? rawTextY : 0;
  const textOpacity = parallaxOn ? rawTextOpacity : 1;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-20 sm:pt-0 overflow-hidden">
      {/* Warm halation background glows */}
      <div className="absolute top-0 right-0 w-[70%] h-[80%] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 70% 30%, oklch(0.55 0.14 18 / 0.08) 0%, oklch(0.70 0.10 50 / 0.04) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 70%, oklch(0.80 0.10 75 / 0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-24 lg:py-0">
          {/* Text Content — Left side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: textY, opacity: textOpacity }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Subtitle */}
            <motion.div variants={fadeUp} className="mb-4 sm:mb-5">
              <span className="font-display text-xs sm:text-sm tracking-[0.25em] uppercase text-maroon font-medium">
                Real Estate Advisor
              </span>
            </motion.div>

            {/* Name — oversized stacked text */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                variants={lineVariants}
                className="font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem] leading-[0.92] tracking-tight text-charcoal"
              >
                GILLIAM
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6 sm:mb-8">
              <motion.h1
                variants={lineVariants}
                className="font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem] leading-[0.92] tracking-tight text-maroon"
              >
                LARD
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl md:text-2xl text-slate font-light mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 italic"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Faithful service for your future.
            </motion.p>

            {/* Primary CTA — SMS Button */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a
                href={SMS_LINK}
                className="group flex items-center gap-3 bg-maroon hover:bg-maroon-light text-white font-display font-semibold text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] animate-pulse-glow shadow-lg shadow-maroon/15"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Text Me Now
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <div className="flex items-center gap-2 text-warm-gray text-sm">
                <a href="tel:5402099772" className="hover:text-charcoal transition-colors duration-300 font-display tracking-wide px-3 py-2">
                  Call
                </a>
                <span className="text-charcoal/15">|</span>
                <a href="mailto:glard.agent@gmail.com" className="hover:text-charcoal transition-colors duration-300 font-display tracking-wide px-3 py-2">
                  Email
                </a>
              </div>
            </motion.div>

            {/* Brokerage tag */}
            <motion.p
              variants={fadeUp}
              className="mt-8 sm:mt-10 text-xs text-warm-gray-light font-display tracking-wider uppercase"
            >
              Berkshire Hathaway HomeServices
            </motion.p>
          </motion.div>

          {/* Headshot — Right side with halation glow */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.15 }}
            style={{ y: portraitY }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative halation-portrait animate-float-soft">
              <img
                src={HEADSHOT_URL}
                alt="Gilliam Lard — Real Estate Advisor"
                className="relative z-10 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] xl:w-[30rem] xl:h-[30rem] object-cover object-top rounded-2xl sm:rounded-3xl shadow-2xl shadow-charcoal/10"
              />
              {/* Decorative border accent */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full rounded-2xl sm:rounded-3xl border-2 border-maroon/15 z-0" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — desktop only to avoid overlap with floating CTA on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs font-display tracking-[0.2em] uppercase text-warm-gray-light">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-warm-gray-light to-transparent"
        />
      </motion.div>
    </section>
  );
}
