export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      {/* Simulated nav height */}
      <div className="h-20" />
      {/* Animated top bar */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-brand-navy/10 overflow-hidden">
        <div className="h-full bg-brand-gold animate-[loading-bar_1.2s_ease-in-out_infinite]" />
      </div>
      {/* Page skeleton */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="font-serif text-4xl text-brand-navy/15 animate-pulse select-none">DOK</div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-brand-navy/20 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
