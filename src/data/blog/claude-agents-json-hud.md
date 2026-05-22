---
author: James Mensch
pubDatetime: 2026-05-21T22:30:00Z
title: "Stop parsing TUI screenshots. claude agents --json is the HUD primitive."
featured: false
draft: false
tags:
  - ai-tools
  - claude-code
  - observability
description: "We hand-rolled a tmux status bar that watches Claude Code sessions by scraping terminal text. The 2.1.145 release shipped the JSON output we'd been faking."
---

We run multiple [Claude Code](https://claude.com/claude-code) sessions in parallel at OneOnMe. One in foreground for the work the human is driving, two or three in background for unattended tasks, sometimes a fourth dispatched by an autonomous Linear ticket agent on a separate host. The session names blur together fast. So we wrote a tmux status bar that watches them and shows which ones are working, which are waiting for input, and which finished while we weren't looking.

We called it the Visor HUD. To get the data it needed, we scraped the `claude agents` TUI. Read the terminal buffer, grep for headers, count rows, decide which session is which by ordinal position in a list. It worked. It also broke every time the upstream TUI tweaked a glyph or shuffled a column.

CC 2.1.145 quietly shipped `claude agents --json`. We can stop scraping.

## What the flag gives you

Run it from any shell:

```bash
claude agents --json
```

You get one JSON object per live session: an id, a display name, a working directory, a status (`working`, `awaiting_input`, `completed`, `stopped`), a token count, the model, whether the session is pinned, a recent prompt snippet, and the project path. Roughly what the TUI shows, in a shape a script can consume without breaking the next time someone changes a separator.

That's the whole feature. It's not a new capability. It's the existing capability made addressable.

## Before and after

Our scraping pass looked like this, simplified:

```bash
claude agents 2>&1 \
  | sed -e 's/\x1b\[[0-9;]*m//g' \
  | awk '/^[[:space:]]*Working/,/^[[:space:]]*Completed/ {print}' \
  | grep -E '^\s*[a-z]+/' \
  | wc -l
```

Three layers of escape-sequence stripping and a state machine that depended on header text staying exactly `Working` and `Completed`. Every time the TUI added an emoji prefix or renamed a section, our HUD silently undercounted.

The post-2.1.145 version of the same check:

```bash
claude agents --json \
  | jq '[.[] | select(.status == "working")] | length'
```

That's it. Two lines. No escape stripping. No header dependency. The contract is the JSON schema, not the rendered output.

We had four other HUD checks built on the same scraping pattern. All four collapsed to one or two lines of `jq` once the JSON existed.

## What else it makes scriptable

The `--json` flag isn't just a HUD primitive. It opens a class of scripts that were brittle before:

- **tmux-resurrect-style restore.** Snapshot which sessions exist, save them to disk, restore them after a reboot or a CC update. The pinned-session feature in 2.1.147 means sessions can survive the assistant's own restart, but a list of _which sessions you care about_ is still your responsibility.
- **Awaiting-input pickers.** A two-key keybinding that lists all sessions in `awaiting_input` state and attaches to the one you pick. Faster than walking the TUI.
- **Notification routing.** A session that transitions from `working` to `completed` while you're in another app is exactly the kind of thing a desktop notification should fire on. Hook it to your notification daemon of choice.
- **Per-project budgets.** Aggregate the token counts by project path and warn when a project burns through a daily cap. The TUI doesn't surface this; the JSON makes it a five-line script.

The pattern is the same in each case. The data was always there. The scripting interface arrived late. Now that it's here, build the small thing you wanted before.

## What to do

If you've been scraping `claude agents` output, rewrite those scripts against `--json` this week. The TUI-parsing path will keep working in the short term, but it'll keep breaking the same way it always has, and you no longer have an excuse.

If you've been wanting to script around session state but didn't because the surface looked hostile, look again. The hostile part is gone.

One small caveat: `--json` returns the snapshot at the moment of the call. There's no stream-as-it-changes mode yet. If you want a live-updating display, you're still polling. We poll once per second from the tmux status bar and have not noticed it on the CPU graph; the listing is local and fast.

We treat upstream's small additions as load-bearing more often than we treat their big ones. Big features get headlines. Small JSON outputs are how you stop hand-rolling the wrong abstraction.
