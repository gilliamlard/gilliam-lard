/**
 * GrainOverlay — fixed full-screen film grain.
 * Pure CSS via inline SVG noise; very low opacity, blend-multiply.
 * Skipped when user prefers reduced motion to avoid the subtle flicker.
 */

import { useEffect, useState } from "react";

const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 0.15  0 0 0 0 0.10  0 0 0 0 0.08  0 0 0 0.7 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`
  );

export default function GrainOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow(!reduced);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply"
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "220px 220px",
        opacity: 0.05,
      }}
    />
  );
}
