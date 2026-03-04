/**
 * Difference — What makes Gilliam different
 * Design: Warm cream-dark section, elegant cards
 * Keep "Not your typical agent" heading + pillar cards
 * Classy, professional, bright
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Compass, Handshake } from "lucide-react";
import type { Variants } from "framer-motion";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DIFFERENTIATORS = [
  {
    icon: Heart,
    title: "Faith-Driven Service",
    description:
      "Every decision is guided by integrity and a genuine desire to serve. Your best interest isn't just a priority — it's a conviction.",
  },
  {
    icon: Users,
    title: "Relationships Over Transactions",
    description:
      "I don't chase closings. I build lasting relationships. When you work with me, you gain an advisor for life — not just a single deal.",
  },
  {
    icon: Compass,
    title: "Your Goals, Your Timeline",
    description:
      "No pressure, no hard sells. I listen to understand where you are and where you want to be, then help you get there at your own pace.",
  },
  {
    icon: Handshake,
    title: "Local Expertise, Personal Touch",
    description:
      "I know these communities inside and out. You get hyper-local knowledge paired with a personal commitment to your success.",
  },
];

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
      delay: i * 0.1,
    },
  }),
};

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
};

export default function Difference() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 lg:py-40 bg-cream-dark overflow-hidden">
      <span className="section-number">02</span>

      {/* Halation glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, oklch(0.55 0.14 18 / 0.04) 0%, transparent 60%)",
        filter: "blur(80px)",
      }} />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display text-xs tracking-[0.25em] uppercase text-maroon font-medium block mb-4"
          >
            The Difference
          </motion.span>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-charcoal"
          >
            Not your typical
            <br />
            <span className="text-maroon">agent.</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {DIFFERENTIATORS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-warm-white border border-charcoal/5 hover:border-maroon/15 hover:shadow-lg hover:shadow-maroon/5 transition-all duration-500"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-maroon-soft flex items-center justify-center group-hover:bg-maroon/12 transition-colors duration-500">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg sm:text-xl text-charcoal mb-2 sm:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
