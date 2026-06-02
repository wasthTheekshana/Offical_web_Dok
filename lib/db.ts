import { Pool } from 'pg';
import { unstable_cache } from 'next/cache';

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

const pool = global._pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== 'production') global._pgPool = pool;

export default pool;

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows as T[];
}

export async function queryOne<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const res = await pool.query(text, params);
  return (res.rows[0] ?? null) as T | null;
}

// Cached versions for data that rarely changes — 60s revalidation
export const cachedQuery = <T = Record<string, unknown>>(
  text: string,
  params?: unknown[],
  tags?: string[]
) =>
  unstable_cache(
    () => query<T>(text, params),
    [text, JSON.stringify(params ?? [])],
    { revalidate: 60, tags }
  )();
