# Garro-Skills

Repositório central de **Agent Skills** do Cursor — skills globais (repo-agnósticas) para copiar em qualquer projeto.

## Instalação

```bash
git clone https://github.com/gabrielgarro/Garro-Skills.git
```

Copie as pastas de skill para o diretório pessoal do Cursor:

**Windows**

```powershell
Copy-Item -Recurse -Force .\* $env:USERPROFILE\.cursor\skills\
```

**macOS / Linux**

```bash
cp -R ./* ~/.cursor/skills/
```

(Exclua `README.md` e `.git` ao copiar — só pastas com `SKILL.md`.)

## Estrutura

Cada subpasta é uma skill (`SKILL.md` + refs opcionais):

| Skill | Uso |
|-------|-----|
| `skill-authoring` | Criar/editar skills com budget de tokens |
| `new-feature-sdd` | SDD: draft → SPEC → implement → E2E |
| `feedback-handler` | Triagem de feedback → issues → SDD |
| `playwright-e2e-from-plan` | E2E a partir do Test plan |
| `pr-review-orchestrator` | Review multi-dimensão em PRs |
| `pentest-pr-reviewer` | Segurança em PRs |
| `pr-review-usability` | UX/a11y (sub-skill) |
| `pr-review-performance` | Performance (sub-skill) |
| `pr-review-standards` | Padrões de código (sub-skill) |

## Overrides por projeto

Skills globais + **delta do repo** em `.cursor/skills/<skill>/GYMAPP.md` (e.g. `guards-*.md` no gym-app). Esses arquivos **não** entram neste repo — ficam no repositório do app.

## Sincronização

Ao editar `~/.cursor/skills/`, o agente pergunta se replica em **Garro-Skills**. Copie [`rules/garro-skills-sync.mdc`](rules/garro-skills-sync.mdc) para `.cursor/rules/`.

## Chat compacto (fase 2)

- `skill-authoring/chat-output.md` — respostas curtas por padrão
- `feedback-handler/triage-output-compact.md` — triagem sem template longo
- `examples.md` esvaziados (não ler salvo pedido)

User Rules: ver gym-app `Docs/CURSOR-USER-RULES.md`.

Fluxo manual:

```bash
cd c:\repos\Garro-Skills
# copiar de ~/.cursor/skills as pastas alteradas
git add -A && git commit -m "chore(skills): …" && git push
```

## Token budget

Otimização documentada no projeto Garra: `Docs/SKILLS-TOKEN-AUDIT.md` (gym-app). Novas skills: seguir `skill-authoring/SKILL.md`.

## Licença

Uso pessoal / projetos do autor.
