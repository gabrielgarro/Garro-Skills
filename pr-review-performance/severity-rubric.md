# Performance severity rubric (Garra — strict)

| Severity | When to use |
|----------|-------------|
| **critical** | Confirmed user-blocking: timeout, runaway loop in API, OOM risk on mobile, sync blocking UI > few seconds |
| **high** | N+1 or unbounded query in hot path; sequential per-row edge calls; `select('*')` on large tables in list views |
| **medium** | Avoidable re-render on large lists (> ~50 rows); missing pagination; duplicate fetch on mount |
| **low** | Micro-optimizations; deps could be tighter; minor bundle concern |

**Strict mode:** flag N+1 and avoidable list re-renders even if not yet measured in production — cite pattern and fix.
