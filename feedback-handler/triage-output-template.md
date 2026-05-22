# Triage output template

Copy and fill in **Portuguese** for each **problem** (`P01`, `P02`, …). One feedback may produce multiple blocks.

---

## Problemas decompostos (Phase 2b)

| Problema ID | Origem | Tipo issue | Resumo | Cluster (opc.) |
|-------------|--------|------------|--------|----------------|
| P01 | F1 | bug | | |
| P02 | descoberta na triagem | melhoria | | |

---

## Triagem — [Problema ID] [bug | melhoria]

**Classificação interna:** `bug` | `improvement` | `new_feature` | `ux_copy` | `tech_debt` | `duplicate` | `needs_info`

**Label GitHub (tipo):** `bug` | `melhoria`

**Prioridade GitHub:** `P1` | `P2` | `P3`

**Origem:** F1 | F2 | … | descoberta na triagem

**Resumo do problema:** [1–2 frases]

**Persona / impacto:** [Free | Premium | Admin] — [severidade]

**Evidência:** [passos, rota, anexos — ou “pendente”]

### Abordagem A — Mínima (MVP / patch)

- **Resumo:**
- **Camadas:** [ex.: `WorkoutRunPage`, Zustand timer]
- **Prós:**
- **Contras:**
- **Tamanho:** S | M | L
- **Riscos:**

### Abordagem B — Equilibrada (recomendada)

- **Resumo:**
- **Camadas:**
- **Prós:**
- **Contras:**
- **Tamanho:** S | M | L
- **Riscos:**

### Abordagem C — Ambiciosa

- **Resumo:**
- **Camadas:**
- **Prós:**
- **Contras:**
- **Tamanho:** S | M | L
- **Riscos:**

### Decisão

- **Recomendação:** A | B | C — [uma frase por quê]
- **Rota:** `→ new-feature-sdd` | `→ aguardar` | `→ wont_fix / duplicate`
- **Criar issue:** sim | não

### Open questions (if any)

- [ ]

---

## Issues criadas (Phase 5)

| Problema ID | Tipo | Prioridade | Issue # | URL |
|-------------|------|------------|---------|-----|
| P01 | bug | P1 | | |
| P02 | melhoria | P3 | | |

---

## Handoff new-feature-sdd (Phase 7 — só problemas selecionados)

```markdown
## Handoff new-feature-sdd
- Problema ID: P01
- GitHub issue: #NN — <url>
- Feature name (PT):
- Slug:
- Problem:
- Issue labels: bug|P*, melhoria|P*
- Recommended approach: A | B | C
- MVP (from recommended approach):
- Out of scope:
- Existing SPEC feature (if any): Feature NN — title
- Suggested story prefix:
- Related feedback IDs:
```

**Próximo passo:** *"vamos começar uma nova feature: &lt;slug&gt;"* (carrega `new-feature-sdd` com o handoff acima).

---

## Problemas adicionais identificados na triagem (opcional)

List before Phase 5 if the agent found improvements not in user paste:

| Problema ID | Resumo | Tipo issue | Prioridade sugerida |
|-------------|--------|------------|---------------------|
| P03 | | melhoria | P3 |
