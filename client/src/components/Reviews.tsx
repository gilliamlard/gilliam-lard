/**
 * Reviews — Google Business Profile testimonials
 * Design: Bright elegant section with halation glow
 * Real reviews from Google, 5.0 star rating
 * Classy card layout with warm accents
 */

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const REVIEWS = [
  {
    name: "Ethan B.",
    text: "My biggest takeaway from interacting with Gilliam is that he truly cares for his clients. He is very personable, and made me feel very supported throughout the process. Gilliam will put in extra work just to help you find what you're looking for!",
    rating: 5,
  },
  {
    name: "Larry",
    text: "Super helpful. Works at whatever pace you want to go, always willing to go the extra mile to make it happen! I would 100 percent recommend him for any kind of real estate related business.",
    rating: 5,
  },
  {
    name: "Amanda W.",
    text: "Great customer service, super responsive and always willing to help in any way he can. I would definitely recommend him to anyone in the future!",
    rating: 5,
  },
  {
    name: "Verified Client",
    text: "Gilliam is professional, smart and caring with his clients. He is eager to get at it in a moment's notice. I look forward to working with Gilliam a lot more in the future!",
    rating: 5,
  },
  {
    name: "Zillow Review",
    text: "Gilliam was incredibly intentional with every conversation we had, ensuring no detail was overlooked. His deep, insider knowledge of the local area provided us with invaluable insights.",
    rating: 5,
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

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
      delay: 0.15 + i * 0.08,
    },
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

  return (
    <section id="reviews" ref={ref} className="relative py-24 sm:py-32 lg:py-40 bg-cream-dark overflow-hidden">
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

        {/* Reviews grid — masonry-style 2-3 columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6 space-y-5 sm:space-y-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="break-inside-avoid bg-warm-white rounded-xl sm:rounded-2xl p-6 sm:p-7 border border-charcoal/5 hover:border-maroon/10 hover:shadow-lg hover:shadow-maroon/5 transition-all duration-500"
            >
              <StarRating count={review.rating} />
              <p className="mt-4 text-slate text-sm sm:text-base leading-relaxed italic">
                "{review.text}"
              </p>
              <div className="mt-4 pt-4 border-t border-charcoal/5">
                <p className="font-display font-semibold text-sm text-charcoal">
                  {review.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google link */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-10 sm:mt-14"
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
