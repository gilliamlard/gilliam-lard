/**
 * Footer — Brokerage info, legal disclaimers
 * Design: Clean, bright, professional
 * MLS/Realtor/Equal Housing/BHH Affiliates
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative border-t border-charcoal/8 bg-cream-dark">
      <div className="container py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Left — Branding */}
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal mb-2">
              GILLIAM LARD
            </h3>
            <p className="text-warm-gray text-sm mb-1">Real Estate Advisor</p>
            <p className="text-warm-gray-light text-sm mb-4">
              Berkshire Hathaway HomeServices | Mountain Sky Properties
            </p>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/gilliamlard/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-warm-gray hover:text-maroon transition-colors duration-300 group"
              aria-label="Follow on Instagram"
            >
              <div className="w-9 h-9 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-maroon/30 group-hover:bg-maroon-soft transition-all duration-300">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-body">@gilliamlard</span>
            </a>
          </div>

          {/* Right — Contact */}
          <div className="md:text-right">
            <p className="text-warm-gray text-sm mb-1">
              <a href="tel:5402099772" className="hover:text-charcoal transition-colors duration-300">
                540.209.9772
              </a>
            </p>
            <p className="text-warm-gray text-sm mb-1">
              <a href="mailto:glard.agent@gmail.com" className="hover:text-charcoal transition-colors duration-300">
                glard.agent@gmail.com
              </a>
            </p>
            <p className="text-warm-gray-light text-xs mt-2">
              New River Valley & Roanoke Valley, Virginia
            </p>
          </div>
        </motion.div>

        {/* Legal disclaimers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-12 pt-8 border-t border-charcoal/5"
        >
          {/* Fair Housing & MLS logos row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-6">
            {/* Equal Housing Opportunity */}
            <div className="flex items-center gap-2 text-warm-gray-light">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-70">
                <path d="M12 2L2 9h3v11h14V9h3L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M8 13h8M8 16h8" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span className="text-xs tracking-wider uppercase">Equal Housing Opportunity</span>
            </div>
            {/* REALTOR */}
            <span className="text-warm-gray-light text-xs tracking-wider uppercase">
              REALTOR®
            </span>
            {/* MLS */}
            <span className="text-warm-gray-light text-xs tracking-wider uppercase">
              MLS
            </span>
          </div>

          {/* Legal text */}
          <div className="text-center space-y-2">
            <p className="text-warm-gray-light text-xs leading-relaxed max-w-2xl mx-auto">
              A member of the franchise system of BHH Affiliates, LLC. Berkshire Hathaway HomeServices and the Berkshire Hathaway HomeServices symbol are registered service marks of Columbia Insurance Company, a Berkshire Hathaway affiliate.
            </p>
            <p className="text-warm-gray-light/70 text-xs">
              © {new Date().getFullYear()} Gilliam Lard. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
