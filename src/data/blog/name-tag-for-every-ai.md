---
author: James Mensch
pubDatetime: 2026-05-23T16:00:00Z
title: Hand every AI you use the same name tag
featured: false
draft: false
tags:
  - ai-tools
  - claude-code
  - personal-context
description: "Every new chat, you re-introduce yourself to your AI. Four plain files in ~/.me/ that any tool reads. One write, many readers, no vendor lock-in."
---

Every new chat, every new repo, every new agent, I re-onboard myself. I re-explain how I write, what I know, that my dog's name is Bean. The tools that try to remember it across sessions are locked to one vendor. Switch from Claude to Codex and the memory doesn't follow.

The shape I keep coming back to is a folder I own at `~/.me/`. Four plain files. No service, no daemon, no account to log into. Every tool that opts in reads them at session start.

```text
~/.me/
├── identity.yaml       # name, timezone, dogs, work, what I know
├── voice.md            # how I sound: tone, lexicon, anti-patterns, samples
├── preferences.yaml    # likes / avoid (editors, themes, color temp)
└── working-style.yaml  # how I want the AI to work with me
```

Two lines on each:

- **`identity.yaml`** is the name tag at the door. Invariant facts about me. The agent now knows who's typing before the first prompt lands.
- **`voice.md`** is how I sound. Sample passages, banned phrasings, register rules. When the agent generates prose for me, it has a target.
- **`preferences.yaml`** is what I like and what to avoid. Editors, themes, color temperature, tools never to suggest.
- **`working-style.yaml`** is how I want the AI to work with me. Autonomy level, when to ask, what counts as irreversible.

Different lifecycles. Identity rarely changes, preferences churn. Splitting them means I can update my color temperature without re-invalidating the file that says my name is James.

## The CLAUDE.md critique

The reflexive critique: this is CLAUDE.md with a YAML on top.

The difference shows up the moment you add a second tool. CLAUDE.md is Claude Code's surface. Codex CLI reads `~/.codex/AGENTS.md`. Cursor reads User Rules. Gemini reads `~/.gemini/GEMINI.md`. Each is the local convention for one vendor.

dot-me's installers wire `identity.yaml` (and optionally voice) into all four. One file on disk, four consumers reading it. When I refine my working-style on Tuesday, every tool I use picks it up Wednesday morning.

There's [an asciinema demo](https://asciinema.org/a/obe7oBGbHzr2LN74) of Claude Code and Codex CLI both reading the same `identity.yaml`. One file, two agents, same answer.

## A small piece of integrity infrastructure

There's one operational rule I had to enforce in code: don't let the agent edit `~/.me/` invisibly.

If an agent silently rewrites your voice file, every downstream tool starts producing prose in a register you didn't pick. The damage is delayed and quiet, and you find it weeks later when something you wrote sounds off and you don't know why.

A SessionStart hook baselines a SHA of each file when a session begins. The `/me` command runs every edit through a managed path that updates the baseline. Direct edits via the model's file-editing tool fail integrity check, and the next session warns. If I want to edit by hand, I run `/me reconcile` and re-approve.

This is the kind of thing that has to be a hook, not a rule. I [wrote about that last week](/posts/dont-let-ai-decide/): operational invariants don't belong in advice memory. They belong in shell scripts the harness runs.

## Where this won't help you

A few honest carves.

If you only use one AI tool, the cross-vendor argument doesn't apply. CLAUDE.md (or your vendor's equivalent) is fine. The portability bet only pays when you switch tools or run more than one at once.

If what you want is conversational memory ("what did we decide last Tuesday?"), this isn't it. That's the territory of ChatGPT memory, mem0, Letta, Khoj. dot-me carries invariants, not history. Complementary, not competitive.

The format is opinionated about what's structured and what's prose. Identity facts go in YAML so tools can query them without inventing a schema. Voice goes in Markdown because forcing voice into YAML loses what makes voice land. If you want one big file for everything, this isn't the shape.

The space is crowded with prose-blob entrants right now: SOUL.MD, ContextFile.ai, dot-agents, AGENTS.md's open issue for personal fields. They all assume one big file. dot-me's bet is the opposite: small files, multiple readers, no vendor lock, integrity-checked.

I've been running this for a few months across my personal infra and my day-job tools. Four reference installers (Claude Code, Codex, Cursor, Gemini) ship in [the repo](https://github.com/thebestmensch/dot-me). Right now it's the convention I use. Other people using it makes it a spec. That's the next thing to find out.
