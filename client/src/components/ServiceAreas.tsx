/**
 * ServiceAreas — New River Valley & Roanoke Valley
 * Design: Bright theme, image cards with proper font sizing
 * Keep "Proudly serving Virginia" heading
 * Fix: font in cards was too big and cut off
 */

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

const NRV_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388409088/U9NrqBKRzTeVrcCo656SAy/nrv-landscape-gAY44yvdEw4vXFQKyCsWLg.webp";
const ROANOKE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388409088/U9NrqBKRzTeVrcCo656SAy/roanoke-skyline-DnaYLdfNHqfjNTv4RQxC5r.webp";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AREAS = [
  {
    name: "New River Valley",
    description: "Blacksburg, Christiansburg, Radford, and the surrounding communities. Home to Virginia Tech and a thriving local economy.",
    image: NRV_IMAGE,
  },
  {
    name: "Roanoke Valley",
    description: "Virginia's Blue Ridge — Roanoke, Salem, Vinton, and beyond. Rich history, stunning mountain views, and endless opportunity.",
    image: ROANOKE_IMAGE,
  },
];

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
};

export default function ServiceAreas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 overflow-hidden halation-ambient">
      <span className="section-number">03</span>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display text-xs tracking-[0.25em] uppercase text-maroon font-medium block mb-4"
          >
            Service Areas
          </motion.span>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-charcoal"
          >
            Proudly serving
            <br />
            <span className="text-maroon">Virginia.</span>
          </motion.h2>
        </div>

        {/* Area cards — FIXED font sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {AREAS.map((area, i) => (
            <motion.div
              key={area.name}
              custom={0.2 + i * 0.15}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] shadow-xl shadow-charcoal/8"
            >
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay — warm */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent" />

              {/* Content — properly sized fonts */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span className="font-display text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gold-soft">
                    Virginia
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white mb-1.5 sm:mb-2">
                  {area.name}
                </h3>
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-sm">
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
