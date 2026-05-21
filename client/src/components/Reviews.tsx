/**
 * Reviews — Editorial pull-quote treatment
 * Design moves:
 *  - Single hero-quote on top (the highlighted current review),
 *    with massive opening quotation mark, magazine-pull-quote style
 *  - The other reviews show as compact "next up" cards below
 *  - Chapter mark, slow editorial pacing
 *  - Auto-advance every 6s, paused on hover, dot navigation
 *
 * Content (review text/names) unchanged.
 */

import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const editorialEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const REVIEWS = [
  {
    name: "Ethan B.",
    text: "My biggest takeaway from interacting with Gilliam is that he truly cares for his clients. He is very personable, and made me feel very supported throughout the process. Gilliam will put in extra work just to help you find what you're looking for!",
    rating: 5,
    source: "Google",
  },
  {
    name: "Larry",
    text: "Super helpful. Works at whatever pace you want to go, always willing to go the extra mile to make it happen! I would 100 percent recommend him for any kind of real estate related business.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Amanda W.",
    text: "Great customer service, super responsive and always willing to help in any way he can. I would definitely recommend him to anyone in the future!",
    rating: 5,
    source: "Google",
  },
  {
    name: "Verified Client",
    text: "Gilliam is professional, smart and caring with his clients. He is eager to get at it in a moment's notice. I look forward to working with Gilliam a lot more in the future!",
    rating: 5,
    source: "Google",
  },
  {
    name: "Zillow Review",
    text: "Gilliam was incredibly intentional with every conversation we had, ensuring no detail was overlooked. His deep, insider knowledge of the local area provided us with invaluable insights.",
    rating: 5,
    source: "Zillow",
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

function StarRow({ count, className = "" }: { count: number; className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          style={{ fill: "oklch(0.72 0.12 75)", color: "oklch(0.72 0.12 75)" }}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalReviews = REVIEWS.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Auto-advance every 6s (slower, more editorial)
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goToNext, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goToNext]);

  const current = REVIEWS[currentIndex];

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative py-28 sm:py-36 lg:py-44 overflow-hidden bg-cream-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft gold atmosphere */}
      <div
        className="atmosphere"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "70%",
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.10 75 / 0.07) 0%, oklch(0.55 0.14 18 / 0.04) 40%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-7"
          >
            <span className="chapter-mark">Voices — Client Reviews</span>
          </motion.div>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="display-headline text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] text-charcoal"
          >
            What people{" "}
            <span className="display-italic text-maroon">are saying.</span>
          </motion.h2>
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mt-7"
          >
            <StarRow count={5} className="!gap-0.5" />
            <span className="font-display font-semibold text-lg text-charcoal">5.0</span>
            <span className="display-italic text-sm text-warm-gray">on Google</span>
          </motion.div>
        </div>

        {/* HERO PULL-QUOTE — current review oversized */}
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-5xl"
        >
          <div className="relative pl-10 sm:pl-16 lg:pl-20 pr-2 pull-quote">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentIndex}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: editorialEase }}
                className="relative z-10 display-italic text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.25] text-charcoal"
              >
                {current.text}
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.figcaption
                key={`caption-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-8 flex items-center gap-4 flex-wrap"
              >
                <span className="block w-8 h-px bg-maroon" />
                <span className="font-display font-semibold text-charcoal tracking-wide">
                  {current.name}
                </span>
                <span className="display-italic text-warm-gray-light text-sm">
                  · {current.source}
                </span>
              </motion.figcaption>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center justify-between mt-12 sm:mt-16 max-w-5xl"
        >
          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-px transition-all duration-700 ${
                  i === currentIndex ? "w-12 bg-maroon" : "w-6 bg-charcoal/20 hover:bg-charcoal/40"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
            <span className="display-italic text-xs text-warm-gray-light ml-4 tracking-wide">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(totalReviews).padStart(2, "0")}
            </span>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              className="w-11 h-11 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal hover:bg-maroon hover:text-white hover:border-maroon active:scale-[0.95] transition-all duration-500"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="w-11 h-11 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal hover:bg-maroon hover:text-white hover:border-maroon active:scale-[0.95] transition-all duration-500"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Google link */}
        <motion.div
          custom={0.55}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 sm:mt-16"
        >
          <a
            href="https://www.google.com/search?q=Gilliam+Lard+real+estate+Blacksburg+VA+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 display-italic text-sm text-maroon hover:text-maroon-light transition-colors duration-500"
          >
            View all reviews on Google
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
