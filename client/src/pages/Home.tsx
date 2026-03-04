/**
 * Gilliam Lard — Real Estate Advisor
 * Design: Bright, warm, elegant with halation glow effects
 * Classy, professional, inviting
 * Typography: Playfair Display (display) + DM Sans (body)
 * Palette: Warm cream bg, charcoal text, maroon accent, gold highlights
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Difference from "@/components/Difference";
import ServiceAreas from "@/components/ServiceAreas";
import Contact from "@/components/Contact";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Reviews />
      <Difference />
      <ServiceAreas />
      <Contact />
      <LeadForm />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
