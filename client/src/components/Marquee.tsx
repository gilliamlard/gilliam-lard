/**
 * Marquee — Horizontal scrolling ticker strip
 * Design: Maroon background, white text, continuous scroll
 * Inspired by landonorris.com energy
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
    <div className="relative bg-maroon py-4 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {repeatedItems.map((item, i) => (
          <span
            key={i}
            className="font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-white/90 mx-5 sm:mx-8 inline-flex items-center gap-5 sm:gap-8"
          >
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
