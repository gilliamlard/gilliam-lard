/**
 * About — Brief personal introduction
 * Design: Bright cream background, warm halation accents
 * Asymmetric layout with Virginia home image
 * Classy, professional, inviting
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";

const VIRGINIA_HOME = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388409088/U9NrqBKRzTeVrcCo656SAy/virginia-home-GxJUKy2f5jv6kAJubZU9jj.webp";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32 lg:py-40 overflow-hidden halation-ambient">
      <span className="section-number">01</span>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image — Left */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5"
          >
            <div className="relative halation">
              <img
                src={VIRGINIA_HOME}
                alt="Beautiful Virginia home"
                className="relative z-10 w-full aspect-[4/5] object-cover rounded-xl sm:rounded-2xl shadow-xl shadow-charcoal/8"
              />
              {/* Warm overlay at bottom */}
              <div className="absolute inset-0 z-20 rounded-xl sm:rounded-2xl bg-gradient-to-t from-charcoal/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Text — Right */}
          <div className="lg:col-span-7 lg:pl-8">
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-4"
            >
              <span className="font-display text-xs tracking-[0.25em] uppercase text-maroon font-medium">
                About Gilliam
              </span>
            </motion.div>

            <motion.h2
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-charcoal mb-6 sm:mb-8"
            >
              Built on
              <br />
              <span className="text-maroon">relationships.</span>
            </motion.h2>

            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-5 text-slate text-base sm:text-lg leading-relaxed max-w-xl"
            >
              <p>
                Real estate isn't just about properties — it's about people. As a young advisor
                serving the New River Valley and Roanoke Valley, I bring a fresh perspective
                grounded in genuine care for every client I work with.
              </p>
              <p>
                My approach is simple: listen first, serve always. Whether you're buying your
                first home, relocating to Virginia, or investing in the region's growing market,
                I'm here to walk alongside you through every step of the journey.
              </p>
              <p>
                Guided by faith and driven by a passion for helping others, I believe that the
                best business relationships are the ones that feel like friendships.
              </p>
            </motion.div>

            {/* Accent line */}
            <motion.div
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-8 sm:mt-10"
            >
              <div className="divider-elegant" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
