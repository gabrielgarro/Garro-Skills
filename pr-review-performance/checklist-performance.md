# Performance checklist (Garra — Supabase + gym-api focus)

## Supabase / hooks

- [ ] No `select('*')` on list endpoints (sessions, history, exercises)
- [ ] List queries have `.limit()` or cursor pagination
- [ ] No await-in-loop over rows (N+1)
- [ ] Filters use indexed columns (`user_id`, `created_at`, FKs)
- [ ] Mutations invalidate minimal cache keys
- [ ] Realtime channel unsubscribed on unmount

## gym-api (edge)

- [ ] List handlers paginate (limit + offset/cursor)
- [ ] No per-id sequential DB calls in loops — batch or single query
- [ ] Response payload trimmed (no nested blobs unless needed)
- [ ] JWT/auth validated once per request path
- [ ] Errors do not retry unbounded client-side without backoff

## Strict — client hot paths (when lists/timers in diff)

- [ ] List > ~50 items: memoized row, stable keys, narrow Zustand selector
- [ ] Timer/tick state not stored in context that wraps whole page tree
- [ ] `useEffect` fetch: correct deps, no double fetch Strict Mode without guard

## New dependencies

- [ ] `package.json` change: note bundle size / alternative
