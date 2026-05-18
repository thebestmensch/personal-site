---
author: James Mensch
pubDatetime: 2026-05-17T18:30:00Z
title: Memory doesn't survive momentum
slug: memory-doesnt-survive-momentum
featured: true
draft: false
tags:
  - claude-code
  - hooks
  - workflow
description: "Most posts about Claude Code stop at CLAUDE.md, the easy part. The harder problem is enforcement: rules in memory don't enforce anything once Claude has momentum on a task."
---

Most posts about configuring Claude Code stop at `CLAUDE.md`. That file is the easy part, a static brief Claude reads at session start. It's also the layer that does the least.

The actual shape of a working Claude Code setup is three things:

1. **Memory**: what Claude knows about you, the project, and prior sessions.
2. **Rules**: written guidance loaded globally or per-project (`~/.claude/rules/`, `<repo>/.claude/rules/`).
3. **Hooks**: shell scripts the harness runs around tool calls (`settings.json`).

The first two are advice. The third is enforcement. The difference matters more than I expected.

## The advice problem

I have something like 80 feedback memories accumulated across sessions. They're good. They cover real failure modes: "verify before acting on summary claims," "snapshot live external resources before PUT/DELETE," "subagents can't see staged-but-uncommitted changes."

These memories load when Claude starts a session. They're written in the imperative: _Always X. Never Y._ Read in isolation, they're a complete operational discipline.

In practice, the moment Claude is mid-task (three tool calls deep into an investigation, momentum building), those memories quietly stop being load-bearing. A rule that says "verify state before describing it to advisory agents" doesn't stop a confident-sounding agent dispatch with a stale premise. The rule existed. The behavior happened anyway.

This isn't Claude's failure. It's mine, for treating _I documented it_ as _the system enforces it._

## Hooks enforce

A hook is a shell script the Claude Code harness runs at a specific lifecycle event. `PreToolUse` hooks fire before a tool runs and can block the call with a non-zero exit. `Stop` hooks fire when Claude tries to end a turn and can refuse the stop until a condition is met.

I use hooks for the things that kept getting skipped:

- **Investigation gate.** A `PreToolUse` hook on `Edit` blocks the first edit of a session unless an investigation step (file read, grep) ran first. Hard gate on edit #1, soft reminder every fifth edit.
- **Per-gate bypass files.** If I want Claude to skip a specific gate (visual QA, code review, commit gate) for a defensible reason, I drop a reason file at `/tmp/cc-gates/<session>/skip_<gate>`. The gate reads it before blocking.
- **Stop gate for review.** When implementation completes, a `Stop` hook checks for unreviewed code in the diff and refuses to release the turn until `/code-review` runs.

The pattern: anything I noticed myself skipping got promoted from a memory rule to a hook. The memory rule often still exists, but it's now redundant; the hook makes it true.

## Concrete: what happens when I commit

A commit on a UI-touching change runs through this gauntlet:

1. **Pre-edit:** investigation hook checks for prior file reads. Blocks if none.
2. **Mid-edit:** parallel Claude Code sessions write to a `.claude/scheduled_tasks.lock`. If it exists, I'm warned before any exclusive operation.
3. **Pre-commit:** lensed `/code-review` auto-dispatches. Lenses (security, data-integrity, migration, performance) activate based on which files changed. Domain-specific agents fire alongside: `silent-failure-hunter` if `try/except` is in the diff, `concurrency-auditor` if `async with` is.
4. **Visual changes:** `/visual-qa` dispatches with a screenshot plus a design-philosophy file. The agent never sees source code, class names, or token values. Only the rendered output. That information firewall is the point. The agent can't rationalize implementation choices because it can't see them.
5. **Stop:** if any gate's bypass file is missing or stale from a prior attempt, the Stop hook refuses the turn until I either run the gate or write a fresh skip-reason file.

None of this is in my prompt. It's all infrastructure.

## The tradeoff

Hooks are harder to evolve than memory. Adding a memory takes one paragraph. Adding a hook means writing a shell script, wiring it in `settings.json`, getting the matcher pattern right, and accepting the hook will run on every applicable event until I remove it.

Most things don't need to be hooks. Most things can be a memory rule that gets followed most of the time. But for the things that keep getting skipped (verification, review gates, dispatch protocols), a hook is the only structure that survives momentum.

If you're scaling your Claude Code setup beyond a single `CLAUDE.md`, the question isn't _what should I write._ It's _what should I make impossible to skip._
