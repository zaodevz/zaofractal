// Compute weeks since the ZAO Fractal start. Approximated to ~August 1 2024;
// the exact founding day is UNKNOWN (see /research/05-targeted-gap-fillers.md).

const ZAO_FRACTAL_START = new Date('2024-08-01T00:00:00Z');

export function currentFractalWeek(): number {
  const now = Date.now();
  const start = ZAO_FRACTAL_START.getTime();
  const weeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, weeks);
}
