/**
 * Gilliam Lard — Real Estate Advisor
 * Design: Bright, warm, elegant with halation glow effects
 * Classy, professional, inviting
 * Typography: Space Grotesk (display) + DM Sans (body)
 * Palette: Warm cream bg, charcoal text, maroon accent, gold highlights
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Difference from "@/components/Difference";
import ServiceAreas from "@/components/ServiceAreas";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Difference />
      <ServiceAreas />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
