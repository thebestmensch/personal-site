---
author: James Mensch
pubDatetime: 2026-06-21T16:00:00Z
title: Your AI reviewer shares your AI coder's blind spots
featured: false
draft: true
tags:
  - ai-tools
  - code-review
  - verification
description: "A Claude review proposed a bug. A second Claude review would have approved it. Same model family, same blind spots, so I review with a different one."
---

Last month I watched a Claude code review propose a bug that a second Claude review would have happily approved.

The change touched an internal write path in a service I'm building. A reviewer I run in-session, Claude reading the diff, suggested widening that path to accept an identifier "for parity" with a neighboring field. It read as reasonable. It was wrong: that identifier fed a deduplication key with no unique index behind it, so accepting it from a generic caller let anyone pass a forged value and merge two records that should have stayed apart. A GPT-family reviewer on the same diff caught it and pushed back. The Claude reviewer hadn't missed a bug. It had suggested one, and a second Claude pass, the model's or my own, would have read right past it.

That's the pattern worth talking about, because it's easy to file as a fluke, and it isn't one.

A few days earlier, a simpler version sent me looking. Claude wrote a database migration. My review passes, also Claude, approved it. The new table declared its key as `id TEXT PRIMARY KEY`, and everyone read that the way you'd expect, a column that's unique and never null. In SQLite it's [neither](https://www.sqlite.org/lang_createtable.html):

> According to the SQL standard, PRIMARY KEY should always imply NOT NULL. Unfortunately, due to a bug in some early versions, this is not the case in SQLite.

Only `INTEGER PRIMARY KEY` gets the guarantee. A TEXT key accepts NULL, and because SQL treats two NULLs as distinct, it accepts many of them without a conflict. An upsert that misses the key inserts a duplicate instead of failing, and the data drifts quietly until a count comes back wrong.

Here's the honest part: that one isn't really an argument for a different reviewer. It's a missing fact. Any reviewer who happens to know the SQLite quirk catches it, and the dependable fix isn't a smarter model, it's a one-line constraint test and a `NOT NULL` you write once. I got lucky that the GPT model had a fact the Claude models lacked, and luck isn't a plan.

The write-path bug is the one that matters, because there was no fact to look up. It was a judgment call about whether a write surface should trust its caller, and the reviewer's judgment lined up with the author's judgment, because they reason from the same training. A second Claude reviewer doesn't give me a second opinion on a call like that. It gives me the same opinion, louder.

Research is starting to put numbers on this. A 2026 paper, [Nine Judges, Two Effective Votes](https://arxiv.org/abs/2605.29800), put nine frontier models from seven families on the same labeling task and measured how independent their judgments actually were. The finding: the nine judges "effectively provide only about 2 independent votes' worth of information," because "roughly three-quarters of the panel's nominal independence is lost" to the models making the same mistakes on the same items. That study is about natural-language labeling, not code review, so I'm extrapolating. But the mechanism it points at, shared training producing shared errors, doesn't care what the task is. Stacking reviewers from one lineage buys confidence, not coverage.

Which is the part that "just add more AI review" advice skips. A different model family is not the fix for the SQLite bug. A schema test catches that one every time, for free, and reaching for a second model there is the slower, less reliable option. Where a different family earns its cost is the judgment-shaped bug, the design call no linter can encode: should this endpoint trust that input, is this the right place to widen a contract, does this migration mean what its author thinks it means. That's where same-family reviewers nod each other into a mistake, and where a model that reasons differently has a chance to break the agreement.

It isn't free, and I'd be selling something if I pretended it were. The cross-family reviewer is wrong often. It flags races that can't happen, objects to code that's fine, and invents edge cases too narrow to ever fire. I eat that noise because the trade runs one way: a false alarm costs me five minutes, and a bug my coder and my reviewer both signed off on costs me a silent data corruption I find three weeks later when the totals stop reconciling.

One caveat complicates the easy version of this advice. A separate paper, [Correlated Errors in Large Language Models](https://arxiv.org/abs/2506.07962), found that "larger and more accurate models have highly correlated errors, even with distinct architectures and providers." So "pick a different vendor" is a lever that works best below the frontier and weakens as models get stronger and converge. What I'm actually reaching for isn't a different logo on the API. It's a reviewer whose mistakes don't line up with my author's, and model family is the cheapest proxy I have for that today.

So the rule I've settled on is narrow. On the diffs where being quietly wrong is expensive, the ones touching money, auth, migrations, anything a user will feel, I hand the change to a different-family model and tell it to argue against the code instead of blessing it. And I enforce that step in the commit flow rather than leaving it to my own discipline, because the moment I most want to skip it is the moment I'm tired and the diff looks fine. [I learned that one the hard way.](/writing/dont-let-ai-decide)

A second opinion that fails on exactly the inputs your first one fails on was never a second opinion. The whole value of review is the chance the reviewer is wrong somewhere the author was right. Pick the reviewer that can be.
