/**
 * Difference — THE DARK SECTION
 * Design moves:
 *  - Near-black background (charcoal deep) — editorial contrast moment
 *  - Cream/gold typography
 *  - Chapter mark + bigger Playfair heading with italic accent
 *  - Cards: subtle warm border, gold icon hover, refined hover lift
 *  - Slow deliberate motion
 *
 * Content unchanged.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Compass, Handshake } from "lucide-react";
import type { Variants } from "framer-motion";

const editorialEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DIFFERENTIATORS = [
  {
    icon: Heart,
    label: "I.",
    title: "Faith-Driven Service",
    description:
      "Every decision is guided by integrity and a genuine desire to serve. Your best interest isn't just a priority — it's a conviction.",
  },
  {
    icon: Users,
    label: "II.",
    title: "Relationships Over Transactions",
    description:
      "I don't chase closings. I build lasting relationships. When you work with me, you gain an advisor for life — not just a single deal.",
  },
  {
    icon: Compass,
    label: "III.",
    title: "Your Goals, Your Timeline",
    description:
      "No pressure, no hard sells. I listen to understand where you are and where you want to be, then help you get there at your own pace.",
  },
  {
    icon: Handshake,
    label: "IV.",
    title: "Local Expertise, Personal Touch",
    description:
      "I know these communities inside and out. You get hyper-local knowledge paired with a personal commitment to your success.",
  },
];

const cardVariants: Variants = {
  hidden: { y: 48, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.95,
      ease: editorialEase,
      delay: 0.2 + i * 0.12,
    },
  }),
};

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.95, ease: editorialEase, delay },
  }),
};

export default function Difference() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-28 sm:py-36 lg:py-44 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.012 260) 0%, oklch(0.15 0.012 260) 100%)",
      }}
    >
      {/* Atmospheric warm glow — top */}
      <div
        className="atmosphere"
        style={{
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "55%",
          background:
            "radial-gradient(ellipse at center, oklch(0.55 0.14 18 / 0.18) 0%, transparent 65%)",
        }}
      />
      {/* Gold accent atmosphere — bottom right */}
      <div
        className="atmosphere"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.12 75 / 0.08) 0%, transparent 65%)",
          animationDelay: "-5s",
        }}
      />

      {/* Top + bottom editorial rules */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-gray-light/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-gray-light/20 to-transparent" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-7"
          >
            <span className="chapter-mark chapter-mark--gold">
              Chapter Two — The Difference
            </span>
          </motion.div>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="display-headline text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem]"
            style={{ color: "oklch(0.96 0.012 80)" }}
          >
            Not your typical{" "}
            <span className="display-italic" style={{ color: "oklch(0.72 0.12 75)" }}>
              agent.
            </span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {DIFFERENTIATORS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group relative p-8 sm:p-10 rounded-sm border lift-on-hover"
                style={{
                  background: "oklch(0.22 0.012 260 / 0.5)",
                  borderColor: "oklch(0.85 0.02 80 / 0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Numeral */}
                <div
                  className="display-italic text-sm mb-6 tracking-widest"
                  style={{ color: "oklch(0.72 0.12 75 / 0.85)" }}
                >
                  {item.label}
                </div>

                <div className="flex items-start gap-5">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-110"
                    style={{
                      background: "oklch(0.72 0.12 75 / 0.12)",
                      border: "1px solid oklch(0.72 0.12 75 / 0.25)",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "oklch(0.82 0.10 75)" }} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-display font-semibold text-xl sm:text-2xl mb-3"
                      style={{ color: "oklch(0.96 0.012 80)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-base sm:text-lg leading-relaxed"
                      style={{ color: "oklch(0.78 0.012 80)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Hover gold rule that draws in */}
                <div
                  className="absolute left-8 right-8 sm:left-10 sm:right-10 bottom-5 h-px origin-left transition-transform duration-700 group-hover:scale-x-100 scale-x-0"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.72 0.12 75 / 0.6), transparent)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
