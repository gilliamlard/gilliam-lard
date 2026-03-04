/**
 * Marquee — Horizontal scrolling ticker strip
 * Design: Warm maroon background, white text, elegant continuous scroll
 */

export default function Marquee() {
  const items = [
    "TEXT ME",
    "FAITHFUL SERVICE",
    "YOUR FUTURE",
    "NEW RIVER VALLEY",
    "ROANOKE VALLEY",
    "REAL ESTATE",
    "RELATIONSHIPS FIRST",
  ];

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative bg-maroon py-4 sm:py-5 overflow-hidden select-none">
      {/* Subtle halation glow on marquee */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, oklch(0.45 0.15 18 / 0.3) 0%, transparent 20%, transparent 80%, oklch(0.45 0.15 18 / 0.3) 100%)",
        }}
      />
      <div className="flex whitespace-nowrap animate-marquee">
        {repeatedItems.map((item, i) => (
          <span
            key={i}
            className="font-display font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase text-white/90 mx-5 sm:mx-8 inline-flex items-center gap-5 sm:gap-8"
          >
            {item}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
