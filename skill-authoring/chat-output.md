# Chat output (default — all skills)

Unless the user asks for detail, **minimize tokens in chat**:

| Do | Don't |
|----|--------|
| 1 table + bullets curtos | Repetir o conteúdo de refs (`GYMAPP`, `guards-*`, templates) |
| Links `path` / issue # / PR URL | Colar draft SPEC, triage A/B/C completo, ou JSON de review |
| 1 linha por finding (review) | Parágrafos por item |
| Perguntas 1–2 por rodada | Resumo executivo longo antes de `AskQuestion` |
| Handoff em bloco único no fim | Múltiplos handoffs duplicados no meio do chat |

**Expandir** só se: usuário pedir "detalha", "template completo", ou ambiguidade bloqueante.
