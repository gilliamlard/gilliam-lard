/**
 * ServiceAreas — Editorial / Magazine spread
 * Design moves:
 *  - Full-bleed landscape photography (4:5 portraits, taller)
 *  - Italic Playfair city names overlaid, magazine-style
 *  - Slow ken-burns motion on images
 *  - Chapter mark + bigger editorial heading
 *  - Refined dark-to-transparent gradient overlay
 *
 * Content unchanged.
 */

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

const NRV_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388409088/U9NrqBKRzTeVrcCo656SAy/nrv-landscape-gAY44yvdEw4vXFQKyCsWLg.webp";
const ROANOKE_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388409088/U9NrqBKRzTeVrcCo656SAy/roanoke-skyline-DnaYLdfNHqfjNTv4RQxC5r.webp";

const editorialEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const AREAS = [
  {
    chapter: "I.",
    name: "New River Valley",
    description:
      "Blacksburg, Christiansburg, Radford, and the surrounding communities. Home to Virginia Tech and a thriving local economy.",
    image: NRV_IMAGE,
  },
  {
    chapter: "II.",
    name: "Roanoke Valley",
    description:
      "Virginia's Blue Ridge — Roanoke, Salem, Vinton, and beyond. Rich history, stunning mountain views, and endless opportunity.",
    image: ROANOKE_IMAGE,
  },
];

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.95, ease: editorialEase, delay },
  }),
};

export default function ServiceAreas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-28 sm:py-36 lg:py-44 overflow-hidden">
      {/* Subtle warm atmosphere */}
      <div
        className="atmosphere"
        style={{
          top: "-10%",
          left: "-10%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(circle, oklch(0.55 0.14 18 / 0.05) 0%, transparent 65%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-7"
          >
            <span className="chapter-mark">Chapter Three — Service Areas</span>
          </motion.div>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="display-headline text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] text-charcoal"
          >
            Proudly serving{" "}
            <span className="display-italic text-maroon">Virginia.</span>
          </motion.h2>
        </div>

        {/* Editorial photo spread */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {AREAS.map((area, i) => (
            <motion.div
              key={area.name}
              custom={0.2 + i * 0.18}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative overflow-hidden rounded-sm aspect-[4/5] lg:aspect-[3/4] shadow-2xl shadow-charcoal/15"
            >
              {/* Slow ken-burns image */}
              <img
                src={area.image}
                alt={area.name}
                className="ken-burns absolute inset-0 w-full h-full object-cover"
              />

              {/* Cinematic gradient overlay — dark at bottom for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/10" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 70% 20%, oklch(0.85 0.08 60 / 0.10) 0%, transparent 60%)",
                }}
              />

              {/* Chapter numeral at top-left */}
              <div
                className="absolute top-7 left-7 sm:top-9 sm:left-9 display-italic tracking-widest text-base sm:text-lg"
                style={{ color: "oklch(0.82 0.10 75)" }}
              >
                {area.chapter}
              </div>

              {/* Editorial label at top-right */}
              <div className="absolute top-7 right-7 sm:top-9 sm:right-9 display-italic text-xs tracking-[0.3em] uppercase text-warm-white/70">
                Virginia
              </div>

              {/* Content — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10 lg:p-12">
                <h3
                  className="display-italic text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.0] tracking-tight mb-4"
                  style={{ color: "oklch(0.985 0.006 80)" }}
                >
                  {area.name}
                </h3>
                <div className="w-12 h-px bg-gold mb-4 transition-all duration-700 group-hover:w-20" />
                <p
                  className="text-sm sm:text-base leading-relaxed max-w-md"
                  style={{ color: "oklch(0.96 0.012 80 / 0.85)" }}
                >
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
