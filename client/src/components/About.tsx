/**
 * About — Editorial / Magazine
 * Design moves:
 *  - Chapter mark instead of "01"
 *  - Bigger Playfair display heading with italic accent word
 *  - Italic serif pull-quote moment ("…relationships that feel like friendships.")
 *  - Asymmetric 12-col layout with image left, narrative right
 *  - Slower reveals (editorial pacing)
 *
 * Content unchanged.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";

const VIRGINIA_HOME =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388409088/U9NrqBKRzTeVrcCo656SAy/virginia-home-GxJUKy2f5jv6kAJubZU9jj.webp";

const editorialEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { y: 48, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1.0, ease: editorialEase, delay },
  }),
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 sm:py-36 lg:py-44 overflow-hidden"
    >
      {/* Subtle breathing atmosphere */}
      <div
        className="atmosphere"
        style={{
          top: "-10%",
          right: "-10%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(circle, oklch(0.60 0.12 18 / 0.06) 0%, transparent 65%)",
          animationDelay: "-3s",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Image — Left (5 cols) */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="relative overflow-hidden rounded-sm shadow-2xl shadow-charcoal/12">
              <img
                src={VIRGINIA_HOME}
                alt="A Virginia home at dusk"
                className="ken-burns relative z-10 w-full aspect-[4/5] object-cover"
              />
              {/* Warm film grade */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, transparent 55%, oklch(0.22 0.008 260 / 0.35) 100%), radial-gradient(ellipse at 30% 20%, oklch(0.85 0.08 60 / 0.08) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Caption beneath image */}
            <motion.p
              custom={0.25}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-4 display-italic text-sm text-warm-gray-light tracking-wide"
            >
              — Home, somewhere in the Valley.
            </motion.p>
          </motion.div>

          {/* Text — Right (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-7"
            >
              <span className="chapter-mark">Chapter One — About Gilliam</span>
            </motion.div>

            <motion.h2
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="display-headline text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] text-charcoal mb-10 sm:mb-12"
            >
              Built on{" "}
              <span className="display-italic text-maroon">relationships.</span>
            </motion.h2>

            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6 text-slate text-lg sm:text-xl leading-[1.65] max-w-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <p>
                Real estate isn&apos;t just about properties — it&apos;s about people. As a
                young advisor serving the New River Valley and Roanoke Valley, I bring a
                fresh perspective grounded in genuine care for every client I work with.
              </p>
              <p>
                My approach is simple: listen first, serve always. Whether you&apos;re
                buying your first home, relocating to Virginia, or investing in the
                region&apos;s growing market, I&apos;m here to walk alongside you through
                every step of the journey.
              </p>
              <p>
                Guided by faith and driven by a passion for helping others, I believe that
                the best business relationships are the ones that feel like friendships.
              </p>
            </motion.div>

            {/* Pull-quote moment — editorial signature line */}
            <motion.figure
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative mt-14 sm:mt-16 pl-8 sm:pl-12 pr-2 max-w-xl pull-quote"
            >
              <blockquote className="relative z-10 display-italic text-2xl sm:text-3xl lg:text-[2rem] leading-[1.25] text-charcoal">
                The best business relationships are the ones that feel like friendships.
              </blockquote>
              <figcaption className="relative z-10 mt-4 flex items-center gap-3 text-warm-gray">
                <span className="block w-6 h-px bg-maroon/60" />
                <span className="display-italic text-sm tracking-wide">Gilliam</span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
