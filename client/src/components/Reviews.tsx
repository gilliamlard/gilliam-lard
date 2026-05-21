/**
 * Reviews — Auto-scrolling carousel of Google Business reviews
 * Design: Bright elegant section, revolving carousel with smooth infinite loop
 * Playfair Display headings, warm cream cards, halation glow
 */

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
};

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4" style={{ fill: "oklch(0.72 0.12 75)", color: "oklch(0.72 0.12 75)" }} />
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

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goToNext, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goToNext]);

  // Get visible reviews (show 3 on desktop, 1 on mobile)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((currentIndex + i) % totalReviews);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 bg-cream-dark overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Halation glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, oklch(0.78 0.10 75 / 0.05) 0%, oklch(0.55 0.14 18 / 0.03) 40%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display text-xs tracking-[0.25em] uppercase text-maroon font-medium block mb-4"
          >
            Client Reviews
          </motion.span>
          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-charcoal"
          >
            What people
            <br />
            <span className="text-maroon">are saying.</span>
          </motion.h2>
        </div>

        {/* Overall rating */}
        <motion.div
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center justify-center gap-3 mb-12 sm:mb-16"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6" style={{ fill: "oklch(0.72 0.12 75)", color: "oklch(0.72 0.12 75)" }} />
            ))}
          </div>
          <span className="font-display font-bold text-xl sm:text-2xl text-charcoal">5.0</span>
          <span className="text-warm-gray text-sm sm:text-base">on Google</span>
        </motion.div>

        {/* Carousel */}
        <motion.div
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Cards container */}
          <div className="relative overflow-hidden">
            {/* Mobile: single card */}
            <div className="sm:hidden">
              <motion.div
                key={`mobile-${currentIndex}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="bg-warm-white rounded-2xl p-7 border border-charcoal/5 shadow-sm"
              >
                <StarRating count={REVIEWS[currentIndex].rating} />
                <p className="mt-5 text-slate text-base leading-relaxed italic">
                  &ldquo;{REVIEWS[currentIndex].text}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-charcoal/5 flex items-center justify-between">
                  <p className="font-display font-semibold text-sm text-charcoal">
                    {REVIEWS[currentIndex].name}
                  </p>
                  <span className="text-xs text-warm-gray">{REVIEWS[currentIndex].source}</span>
                </div>
              </motion.div>
            </div>

            {/* Desktop: 3 cards */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-5 lg:gap-6">
              {visibleIndices.map((reviewIdx, posIdx) => (
                <motion.div
                  key={`desktop-${currentIndex}-${posIdx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: posIdx * 0.08 }}
                  className="bg-warm-white rounded-2xl p-7 border border-charcoal/5 hover:border-maroon/15 hover:shadow-xl hover:shadow-maroon/10 lift-on-hover"
                >
                  <StarRating count={REVIEWS[reviewIdx].rating} />
                  <p className="mt-5 text-slate text-sm lg:text-base leading-relaxed italic">
                    &ldquo;{REVIEWS[reviewIdx].text}&rdquo;
                  </p>
                  <div className="mt-5 pt-4 border-t border-charcoal/5 flex items-center justify-between">
                    <p className="font-display font-semibold text-sm text-charcoal">
                      {REVIEWS[reviewIdx].name}
                    </p>
                    <span className="text-xs text-warm-gray">{REVIEWS[reviewIdx].source}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation arrows + dots */}
          <div className="flex items-center justify-center gap-6 mt-8 sm:mt-10">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-maroon w-6"
                      : "bg-charcoal/15 hover:bg-charcoal/30"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Google link */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-8 sm:mt-10"
        >
          <a
            href="https://www.google.com/search?q=Gilliam+Lard+real+estate+Blacksburg+VA+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-maroon hover:text-maroon-light font-display font-medium transition-colors duration-300"
          >
            View all reviews on Google
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
