// Simple in-memory rate limiter — good for single-instance Docker deployment
// For multi-instance, replace with Redis-backed solution
const store = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return true; // allowed
  }

  if (entry.count >= limit) return false; // blocked

  entry.count++;
  return true; // allowed
}

// Clean up stale entries every 10 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (now > val.reset) store.delete(key);
  }
}, 10 * 60 * 1000);
