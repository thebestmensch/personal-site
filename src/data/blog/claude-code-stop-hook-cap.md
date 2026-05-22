---
author: James Mensch
pubDatetime: 2026-05-21T22:00:00Z
title: "Cap your AI assistant's retry storms before the gate becomes the problem"
featured: false
draft: false
tags:
  - ai-tools
  - claude-code
  - enforcement
description: "We wrote shell-script gates to enforce AI workflow discipline. Then the gates themselves started looping. CC 2.1.147 finally added the kill switch."
---

We use [Claude Code](https://claude.com/claude-code) at OneOnMe. A while back we wrote about [replacing prose rules with shell-script gates](/posts/stop-writing-ai-rules/) for things the assistant kept skipping. Hooks turned advice into enforcement. The discipline became real instead of aspirational.

Then we hit the next problem: what happens when a gate _itself_ is the bug.

## The retry storm

A `Stop` hook fires when the assistant tries to end its turn. If the hook exits non-zero, the turn doesn't end. The assistant is told why, retries, and the hook fires again. This loop is the whole point of an enforcement gate. You can't ship without finishing the review, fixing the lint error, or whatever the gate is watching for.

But hooks have bugs. Or the file the hook is checking races with the assistant writing it. Or a bypass file you wrote moments ago has an mtime older than something the gate just refreshed.

When that happens, the gate keeps blocking and the assistant keeps retrying. Forever. No external signal. No timeout. Your turn never ends because every attempt to end it hits the gate, and the gate is wrong about why.

We had three rules in our project memory dedicated to recovering from this exact failure mode. _Re-prime the bypass token, the first attempt always fails._ _Don't pre-augment the edited-files set._ _Touch the bypass file again before retrying._ All band-aids on the same underlying class of bug: a gate that should have given up didn't.

## What CC 2.1.147 ships

The 2.1.147 release notes have a one-line entry buried in the middle:

> Fixed stop hooks that block repeatedly looping forever, the turn now ends with a warning after 8 consecutive blocks (override via `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`)

That's the kill switch. After 8 consecutive blocks from the same hook, the assistant exits the turn with a warning regardless of what the gate says. The cap is a structural backstop. You don't have to opt in. You don't have to configure anything. The footgun is just gone for the worst case.

You can raise the cap if your workflow legitimately needs more retries:

```bash
export CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=16
```

But raising it is almost never the right move. If you're hitting eight consecutive blocks from your own hook, the hook's intent was probably right and the bypass content was wrong. Rewrite the bypass. Don't disable the cap.

## Why this matters

Enforcement gates are valuable because they're stubborn. They don't get tired, they don't forget the rule three messages later, they don't rationalize their way around the check. The whole reason we use them is that humans and assistants both drift.

But stubbornness without a kill switch is a liability. A gate that's wrong about why it's blocking can wedge a session indefinitely, and the only recovery used to be the operator noticing and intervening manually. That works in a foreground session where the human is watching. It does not work when the assistant is running unattended in a background job overnight, or when six parallel agents are each hitting a different stuck gate at the same time.

The 8-block cap means the assistant always gets to end its turn, even when the rule scaffolding around it has a bug. The cap doesn't disable any individual gate. It just bounds the worst case. A broken gate fails loudly after 8 retries instead of hanging silently forever.

## What to do

If you write Claude Code stop hooks, you don't need to change anything. The cap applies by default.

If you write a hook that legitimately requires more than 8 consecutive blocks before letting the turn end, ask why. The number 8 was chosen because almost no legitimate workflow exceeds it. The exceptions we've seen are all "the hook is checking a slow remote system" cases, where the right fix is to make the check async and let the hook return success while the result lands in background.

If you've been carrying recovery rules for a stuck-gate failure mode, you can keep them. Recovery procedures are still the right answer when you know a specific gate is wrong. But the underlying _unbounded_ case is closed now. That's worth removing from your worry list.

We left our recovery rules in project memory. Three more sessions of writing fresh bypasses on retry attempts will tell us whether the cap closes the loop completely or just narrows the failure mode. Either way, a structural cap beats the discipline-only mitigation we had before.
