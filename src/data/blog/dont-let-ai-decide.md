---
author: James Mensch
pubDatetime: 2026-05-03T18:30:00Z
title: Don't let your AI decide which rules to follow
featured: true
draft: false
tags:
  - ai-tools
  - claude-code
  - automation
description: "Claude has 80+ rules to follow. Three tool calls in, it decides to ignore half. Here's how to stop that."
---

We use [Claude Code](https://claude.com/claude-code) at OneOnMe, an AI coding assistant that runs in our terminal. I have 80+ rules written into its memory. Three tool calls into any non-trivial task, it decides to ignore half of them.

Most published advice for shaping it says the same thing: write a `CLAUDE.md` with your rules and the assistant will follow them. I tried that. Then I layered on dozens more rules in what's called feedback memory, accumulated across sessions. Things like _verify state before describing it to a sub-agent_ and _snapshot live resources before PUT/DELETE_. Read in isolation, they're a complete operational discipline.

The problem isn't that the rules are wrong. It's that Claude treats them as advice and then exercises judgment about which advice applies right now. That's the right behavior for product decisions. It's the wrong behavior for operational ones, things like verifying state before describing it, reading a file before editing it, running review before commit. Those shouldn't be subject to model judgment. They should just happen.

That isn't Claude's failure. It's mine, for treating _I documented it_ as _the system enforces it._

## What actually enforces

Claude Code has a feature called hooks: shell scripts the harness runs at specific points in the assistant's lifecycle. A `PreToolUse` hook fires before any tool runs, and a non-zero exit blocks the tool call. A `Stop` hook fires when the assistant tries to end a turn and can refuse the stop until a condition is met.

Hooks are not advice. They're gates. They remove the decision from the model.

The pattern I keep coming back to: anything I noticed myself skipping mid-task got promoted from a memory rule to a hook. The memory often still exists, but it's redundant now. The hook makes it true.

Some of what we run at OneOnMe:

- **Investigation before edits.** A `PreToolUse` hook on the `Edit` tool blocks the first edit of a session unless an investigation step (file read, grep, web fetch) ran first.
- **Review before commit.** A `Stop` hook checks for unreviewed code in the diff and refuses to release the turn until `/code-review` runs.
- **Per-gate bypass files.** When skipping a gate is genuinely the right call, we drop a reason file at `/tmp/cc-gates/<session>/skip_<gate>`. The gate reads it before blocking. Skipping is allowed, but it requires us to type a reason. Judgment is back in the loop, but only when we explicitly invoke it.

## A commit, in slow motion

Here's what runs when we commit a UI-touching change:

1. **Pre-edit:** investigation hook checks for prior file reads. Blocks if none.
2. **Mid-edit:** parallel Claude Code sessions write to a `.claude/scheduled_tasks.lock`. If it exists, we're warned before any exclusive operation.
3. **Pre-commit:** lensed `/code-review` auto-dispatches. Lenses (security, data-integrity, migration, performance) activate based on which files changed. Domain-specific agents fire alongside it.
4. **Visual changes:** `/visual-qa` dispatches with a screenshot and a design-philosophy file. The agent never sees source code or class names. Only the rendered output. That information firewall is the point: the agent can't rationalize implementation choices it can't see.
5. **Stop:** if any gate's bypass file is missing or stale, the `Stop` hook refuses the turn until we either run the gate or write a fresh skip-reason.

None of this is in our prompt. It's all infrastructure. Claude doesn't choose to run these checks. It can't.

## The tradeoff

Hooks are harder to evolve than rules. Adding a rule takes one paragraph. Adding a hook means a shell script, a matcher pattern, an entry in `settings.json`, and accepting that the hook will run on every applicable event until we remove it. Most things don't need to be hooks. Most things can stay as a rule that gets followed most of the time.

But for operational rules, the things that shouldn't be subject to model judgment, hooks are the only structure that holds. The question is which of your rules you want Claude to decide about, and which you want to make impossible to skip.
