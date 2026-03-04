/**
 * ContactSection — Unified "Get in Touch" section
 * Merges the CTA headline + SMS button with the lead capture form
 * Layout: Bold headline & SMS CTA on the left, lead form on the right (desktop)
 * Stacks vertically on mobile with SMS CTA first, then form
 * Clean, uncluttered, makes intuitive sense to the visitor
 */

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const SMS_LINK =
  "sms:5402099772?body=Hey%2C%20thank%20you%20for%20taking%20the%20time%20to%20reach%20out.%20I%27ve%20made%20this%20super%20easy%20with%20a%20pre-made%20text%20%E2%80%94%20all%20you%20do%20is%20click%20send%20and%20I%27ll%20get%20back%20to%20you%20as%20soon%20as%20I%20can%21%20Have%20a%20blessed%20rest%20of%20your%20day.";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
};

const HELP_OPTIONS = [
  { value: "buying", label: "Buying a Home" },
  { value: "selling", label: "Selling a Home" },
  { value: "investing", label: "Real Estate Investing" },
  { value: "relocating", label: "Relocating to Virginia" },
  { value: "other", label: "Other / General Question" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    helpType: "",
    message: "",
  });

  const submitLead = trpc.lead.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.helpType)
      return;
    submitLead.mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone || undefined,
      helpType: form.helpType,
      message: form.message || undefined,
    });
  };

  const inputClasses =
    "w-full bg-cream border border-charcoal/8 rounded-xl px-4 py-3.5 text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:border-maroon/30 focus:ring-2 focus:ring-maroon/10 transition-all duration-300 text-sm sm:text-base";

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Halation background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.55 0.14 18 / 0.05) 0%, oklch(0.78 0.10 75 / 0.03) 40%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section header — centered */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display text-xs tracking-[0.25em] uppercase text-maroon font-medium block mb-4"
          >
            Get In Touch
          </motion.span>

          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-charcoal"
          >
            Ready to start
            <br />
            <span className="text-maroon">your journey?</span>
          </motion.h2>
        </div>

        {/* Two-column layout: CTA left, Form right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left column — CTA + contact info */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center lg:text-left lg:sticky lg:top-32"
          >
            <p className="text-slate text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0">
              The easiest way to reach me? Send a text. I've pre-written the
              message for you — just tap and hit send.
            </p>

            {/* Primary SMS CTA */}
            <a
              href={SMS_LINK}
              className="group inline-flex items-center gap-3 sm:gap-4 bg-maroon hover:bg-maroon-light text-white font-display font-bold text-lg sm:text-xl px-10 py-5 sm:px-12 sm:py-5 rounded-full transition-all duration-300 hover:scale-[1.03] animate-pulse-glow shadow-xl shadow-maroon/20 mb-10 sm:mb-12"
            >
              <MessageCircle className="w-6 h-6" />
              Text Me Now
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </a>

            {/* Divider with "or" */}
            <div className="flex items-center gap-4 mb-8 sm:mb-10 max-w-sm mx-auto lg:mx-0">
              <div className="flex-1 h-px bg-charcoal/10" />
              <span className="text-warm-gray text-xs font-display tracking-[0.2em] uppercase">
                or reach me at
              </span>
              <div className="flex-1 h-px bg-charcoal/10" />
            </div>

            {/* Secondary contact options */}
            <div className="flex flex-col gap-4">
              <a
                href="tel:5402099772"
                className="flex items-center gap-3 text-warm-gray hover:text-charcoal transition-colors duration-300 group justify-center lg:justify-start"
              >
                <div className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-maroon/30 group-hover:bg-maroon-soft transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-display tracking-wide text-sm sm:text-base">
                  540.209.9772
                </span>
              </a>
              <a
                href="mailto:glard.agent@gmail.com"
                className="flex items-center gap-3 text-warm-gray hover:text-charcoal transition-colors duration-300 group justify-center lg:justify-start"
              >
                <div className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-maroon/30 group-hover:bg-maroon-soft transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-display tracking-wide text-sm sm:text-base">
                  glard.agent@gmail.com
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right column — Lead capture form */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="bg-warm-white rounded-2xl p-10 sm:p-14 border border-charcoal/5 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-maroon/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-maroon" />
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal mb-3">
                  Thank you, {form.firstName}!
                </h3>
                <p className="text-warm-gray text-base sm:text-lg leading-relaxed">
                  I've received your information and will be reaching out to you
                  soon. Have a blessed day!
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-warm-white rounded-2xl p-7 sm:p-9 border border-charcoal/5 shadow-sm"
              >
                <p className="font-display font-semibold text-charcoal text-lg sm:text-xl mb-1">
                  Prefer to leave your info?
                </p>
                <p className="text-warm-gray text-sm sm:text-base mb-6">
                  Fill this out and I'll reach out to you personally.
                </p>

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-xs font-display font-medium text-charcoal mb-1.5 tracking-wide uppercase"
                    >
                      First Name <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-xs font-display font-medium text-charcoal mb-1.5 tracking-wide uppercase"
                    >
                      Last Name <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-display font-medium text-charcoal mb-1.5 tracking-wide uppercase"
                    >
                      Email <span className="text-maroon">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-display font-medium text-charcoal mb-1.5 tracking-wide uppercase"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(540) 555-1234"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Help type */}
                <div className="mb-4">
                  <label
                    htmlFor="helpType"
                    className="block text-xs font-display font-medium text-charcoal mb-1.5 tracking-wide uppercase"
                  >
                    What can I help you with?{" "}
                    <span className="text-maroon">*</span>
                  </label>
                  <select
                    id="helpType"
                    name="helpType"
                    value={form.helpType}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                    }}
                  >
                    <option value="" disabled>
                      Select one...
                    </option>
                    {HELP_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-xs font-display font-medium text-charcoal mb-1.5 tracking-wide uppercase"
                  >
                    Anything else you'd like me to know?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell me a bit about what you're looking for..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="w-full flex items-center justify-center gap-3 bg-maroon hover:bg-maroon-light text-white font-display font-semibold text-base sm:text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-maroon/15"
                >
                  {submitLead.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send My Info
                    </>
                  )}
                </button>

                {submitLead.isError && (
                  <p className="mt-4 text-center text-sm text-red-600">
                    Something went wrong. Please try again or text me directly!
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
