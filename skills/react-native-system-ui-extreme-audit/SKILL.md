---
name: react-native-system-ui-extreme-audit
description: Use when continuing the extreme audit and size optimization of this React Native component library, especially when reviewing components line by line, shrinking hooks/utils/internal layers, consolidating duplicated private logic, updating docs/component-extreme-audit.md scores, and syncing the project-local skill after every change.
---

# React Native System UI Extreme Audit

## Overview

Use this skill for this repository's long-running "extreme audit" work: reduce bundle size, collapse unnecessary layers, and keep every component's score grounded in real code and real verification.

The goal is not to chase abstract cleanliness. The goal is to make the library smaller, tighter, and more reusable without weakening behavior, public API stability, or cross-platform correctness.

## Required Starting Point

Before changing code, read these files in order:

1. [`docs/component-extreme-audit.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/component-extreme-audit.md)
2. [`skills/react-native-system-ui-extreme-audit/references/project-state.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/references/project-state.md)
3. [`skills/react-native-system-ui-extreme-audit/references/handoff-playbook.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/references/handoff-playbook.md)

Use the audit doc as the source of truth for:

- current component scores
- verified build status
- already-completed optimization rounds
- next priority components

Use `project-state.md` for the latest execution notes that should survive across model handoffs.

Use `handoff-playbook.md` for the fixed optimization rules, priority order, component-by-component entry points, and validation/reporting expectations that other models should follow without re-deriving the workflow.

## Core Workflow

1. Pick one component or one tightly-related shared area at a time.
2. Read the implementation line by line, including its local files and the private helpers it pulls from `src/hooks`, `src/utils`, `src/internal`, and `src/internal/aria`.
3. Verify whether each extracted helper truly needs to stay extracted. If a helper only serves one component or one private path, prefer moving it back closer to that component.
4. Prefer deletions over abstractions. A shared file is only worth keeping when it reduces total code across multiple call sites and does not widen the public surface.
5. After each real change, sync the audit records immediately instead of batching documentation later.

## Optimization Heuristics

Prioritize these patterns:

- Remove pure internal forwarding layers and re-export-only files.
- Merge duplicated lifecycle code such as visible-state orchestration, latest-callback refs, timers, and close registries.
- Collapse fragmented private helpers that are only consumed by one component.
- Reduce repeated style assembly, prop normalization, and render-branch duplication.
- Reuse existing internal primitives before introducing new files.
- Keep public hooks minimal; move private `aria` and component-specific bridges toward `src/internal` or component-local `internal.*` files when possible.
- Treat every new file as bundle overhead. If one file can safely disappear, that is usually a win.

## Shared Directory Rules

When touching shared directories, apply stricter review:

- `src/hooks`: only keep hooks that are truly reusable across multiple public components.
- `src/hooks/aria`: keep the public layer extremely thin; push implementation inward whenever possible.
- `src/utils`: merge tiny one-off utilities where doing so reduces import fan-out and file count.
- `src/internal`: prefer this for shared private runtime logic used by multiple components.
- component-local `internal.ts` or `internal.web.ts`: prefer this for private logic used by a single component family.

## Required Sync After Every Change

Every substantive optimization must update:

- [`docs/component-extreme-audit.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/docs/component-extreme-audit.md)
- [`skills/react-native-system-ui-extreme-audit/references/project-state.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/references/project-state.md)

Update these too when the workflow itself changes:

- [`skills/react-native-system-ui-extreme-audit/SKILL.md`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/SKILL.md)
- [`skills/react-native-system-ui-extreme-audit/agents/openai.yaml`](/Users/wangwenshan/Desktop/wws/other/react-native-system-ui/skills/react-native-system-ui-extreme-audit/agents/openai.yaml)

Never inflate scores. If a component is still heavy, say so plainly.

## Validation Checklist

Run these after each optimization round:

- `npm run build`
- `npm run check:imports`
- `npm run typecheck`

If `typecheck` fails because of pre-existing issues, record the exact blocking files and do not present them as newly introduced regressions.

## Expected Output Style

When reporting progress:

- keep communication in Chinese
- give concrete file paths
- describe what got smaller or simpler
- call out remaining heaviness honestly
- keep the next target explicit
