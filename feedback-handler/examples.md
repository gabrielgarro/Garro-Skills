# Examples — feedback-handler

> **Read only** if the user asks for an example or decomposition pattern is unclear.

Actionable problems get a **GitHub issue** (`bug` or `melhoria` + `P1`/`P2`/`P3`), then **SDD handoff only for priorities the user selects**. Implementation happens only in `new-feature-sdd`.

## Example 1 — Brief single feedback (one problem)

### User input

> triar feedback: o timer do descanso some quando troco de app

### Phase 1 — Intake

| id | raw | type_hint | source |
|----|-----|-----------|--------|
| F1 | timer do descanso some quando troco de app | bug | self |

### Phase 2b — Decompose

| Problema ID | Origem | Tipo issue | Resumo |
|-------------|--------|------------|--------|
| P01 | F1 | bug | Timer de descanso perde estado ao background |

### Phase 3 — Interview (abbreviated)

| Round | Question | Answer |
|-------|----------|--------|
| 1 | Só no treino ativo (`WorkoutRunPage`)? | Só descanso entre séries |
| 2 | Android PWA ou iOS Safari? | Android Chrome, PWA instalado |

### Phase 4 — P01 approaches (abbreviated)

- **A:** `sessionStorage` + `visibilitychange`
- **B:** Zustand + timestamp de fim do descanso
- **C:** Service Worker + notificação

**Recomendação:** B — **Rota:** `→ new-feature-sdd` — **Prioridade:** P1

### Phase 5 — Issue

```bash
gh issue create \
  --title "[P01] Timer de descanso some ao trocar de app" \
  --body-file scripts/.issue-body-P01.md \
  --label "bug,P1,feedback-triage"
```

| Problema ID | Tipo | P* | Issue # | URL |
|-------------|------|-----|---------|-----|
| P01 | bug | P1 | #42 | https://github.com/…/issues/42 |

### Phase 6 — Selection

User selects **P1** only → P01 included.

### Phase 7 — Handoff (P01 only)

```markdown
## Handoff new-feature-sdd
- Problema ID: P01
- GitHub issue: #42 — https://github.com/…/issues/42
- Feature name (PT): Descanso persistente no modo execução
- Slug: run-rest-timer-persist
- Problem: Timer de descanso zera/perde estado ao trocar de app
- Issue labels: bug, P1
- Recommended approach: B
- MVP: Countdown a partir de timestamp no Zustand + visibility API
- Out of scope: Service Worker / push (C)
- Existing SPEC feature (if any): Feature 4 — Modo Execução de Treino
- Suggested story prefix: RN-
- Related feedback IDs: F1
```

User: *"vamos começar uma nova feature: run-rest-timer-persist"*.

---

## Example 2 — Multiple symptoms → multiple problems + discovered improvement

### User input

> processar feedbacks:
> 1. Botão "próxima série" muito pequeno no mobile
> 2. Histórico não mostra nome do treino
> 3. Mesmo botão pequeno em landscape

### Phase 1 — Intake

| id | raw |
|----|-----|
| F1, F3 | botão pequeno mobile/landscape |
| F2 | histórico sem nome do treino |

### Phase 2b — Decompose (not one issue per cluster)

| Problema ID | Origem | Tipo issue | Resumo | Cluster |
|-------------|--------|------------|--------|---------|
| P01 | F1, F3 | bug | CTA próxima série abaixo de área de toque mínima | C1 |
| P02 | F2 | bug | Lista de histórico sem nome do treino | C2 |
| P03 | descoberta triagem | melhoria | Empty state do histórico sem orientação quando vazio | C2 |

### Phase 4b — Priority

| Problema ID | P* |
|-------------|-----|
| P01 | P1 |
| P02 | P2 |
| P03 | P3 |

### Phase 5 — Three issues

```bash
gh issue create --title "[P01] CTA próxima série pequeno no mobile" \
  --body-file scripts/.issue-body-P01.md --label "bug,P1,feedback-triage"

gh issue create --title "[P02] Histórico sem nome do treino" \
  --body-file scripts/.issue-body-P02.md --label "bug,P2,feedback-triage"

gh issue create --title "[P03] Empty state do histórico pouco claro" \
  --body-file scripts/.issue-body-P03.md --label "melhoria,P3,feedback-triage"
```

### Phase 6 — Selection

`AskQuestion` — user selects **P1 only**.

### Phase 7 — Handoff

Only **P01** gets handoff (slug `run-session-footer-ux`, approach B). P02 and P03 stay open on GitHub without SDD this session.

---

## Example 3 — New capability

### User input

> triar feedback: quero exportar treinos em PDF para mandar pro professor

### Phase 2b

| Problema ID | Origem | Tipo issue | Resumo |
|-------------|--------|------------|--------|
| P01 | F1 | melhoria | Exportar treino salvo em PDF |

### Phase 5

```bash
gh issue create --title "[P01] Exportar treino em PDF" \
  --body-file scripts/.issue-body-P01.md --label "melhoria,P2,feedback-triage"
```

### Phase 6–7

User selects P2 → handoff `workout-pdf-export`, approach B.
