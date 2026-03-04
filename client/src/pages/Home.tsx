/**
 * Gilliam Lard — Real Estate Advisor
 * Design: "Velocity" — Motion-First Editorial
 * Dark (#080808) canvas, white text, maroon (#8B1A2B) accent
 * Typography: Space Grotesk (display) + Inter (body)
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Difference from "@/components/Difference";
import ServiceAreas from "@/components/ServiceAreas";
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
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
