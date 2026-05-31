---
author: James Mensch
pubDatetime: 2026-05-31T16:00:00Z
title: AI gives you consistent UI only after you build the system it copies from
featured: false
draft: true
tags:
  - ai-tools
  - design-systems
  - enforcement
description: "AI doesn't drift because it's careless. Each session starts blank. A component library, a CI drift gate, and a catalog of blessed exceptions hold the line."
---

The agent shipped a card that looked almost right. Same rounded corners, same hover lift, same accent outline as the cards on every other app I run. But the title wrapped where it should have truncated, the photo band was a few pixels tall, the padding was off by two. Almost right is the tell. It means the agent rebuilt the card from scratch instead of reusing the one I already had, and got close enough that I almost didn't notice.

I run about ten small apps at home, all sharing a look. So I audited them. One card class, `.card`, had been independently redefined five slightly-different ways across the apps. Same for `.section-title`: two apps, two definitions, neither aware of the other. None of it was wrong, exactly. All of it was drift.

Here's the part that took me a while to see. The AI doesn't drift because it's sloppy. It drifts because every session starts blank. Ask it to "make a card" and it generates a plausible card, and plausible is a wide target. Yesterday's card and today's card are both plausible and they don't match. You can't prompt your way out of this. The fix is upstream of the prompt: give the model a system to copy from, and a gate that fails when it doesn't.

## The system: a catalog the AI reads first

The source of truth is a single file, `COMPONENTS.md`, that lives next to the shared CSS. It opens with an instruction aimed as much at the AI as at me:

```text
> Read this first. Before authoring a new UI component,
> grep -r "<your-component>" services/shared/ AND scan this file.
> Reuse the canonical version. Never re-implement structures
> already defined here. Drift between apps is the bug this
> catalog exists to prevent.
```

Every primitive is listed with its class names, its slots, and the one rule that makes ten apps feel like siblings instead of twins: structure is shared, only the accent color is overridden per app. Bookshelf is slate blue, Recipes is sage, Screenroom is purple, and they all pull the same `.card`. A companion page renders every component live with all the accents side by side, so "what does the canonical version look like" is a link, not an archaeology dig.

(Before building this I evaluated [Storybook](https://storybook.js.org/), [Ladle](https://ladle.dev/), and the rest, and chose to extend an in-house page instead. A framework is the right call when you have a JS frontend and a team; I have neither. The catalog is a markdown file and one route.)

## The gate: because nobody runs the propagation step

The catalog tells the AI what to copy. It does nothing to stop the AI from skipping it. For that you need a gate, and this is where AI-authored UI departs from a normal design system.

Without AI, drift is slow. A teammate adds a one-off button, code review catches it next week, it gets folded back in. The discipline is human and the timescale is human. With an agent authoring changes, drift is manufactured fresh on every run by something that has no memory of the decision you made yesterday. The human backstop doesn't scale to that cadence. So the backstop moves into CI:

```yaml
- name: Verify copy-shared has been run
  run: just check-shared-drift
```

Editing a shared component means propagating it to each app's local copy. I forget to run that step. The agent forgets to run that step. So the gate runs it for us: on every pull request that touches shared files, CI re-propagates and fails if any committed copy has drifted. It isn't advice about remembering to propagate. It's a wall. I [wrote recently](/writing/dont-let-ai-decide/) that operational invariants belong in gates the harness runs, not in memory the model is free to ignore mid-task. Visual consistency turned out to be one of those invariants.

## The harder half: knowing when to stop

Canonicalizing feels like it should run to completion. Every duplicated class name converged, the audit driven to zero. That instinct is wrong, and catching it is the part nobody warns you about.

One app, Recipes, redefines the base card on purpose. Its photos sit in a fixed-height band instead of the aspect-ratio crop the other apps use, with heavier padding and a title that wraps. A grid of dishes should scan as a uniform row of plates; book covers and movie posters want the variable-height crop. Those are different visual jobs. Worse, the override can't be lifted into a single shared modifier, because the class lands on two different DOM shapes depending on the template, and one rule can't serve both.

So I didn't fix it. I blessed it. The catalog now has a section for intentional divergence, and the Recipes card is documented there with the full rationale: what it overrides, why it's a domain decision and not drift, why it resists a clean modifier. The point isn't the one exception. It's that a catalog which only records convergence quietly pressures you to over-canonicalize, to flatten a real design difference into sameness because the audit wants a zero. Write down the divergences too, with their reasons, so the next audit, run by me or by the agent, doesn't helpfully sweep them back up.

## Where this won't help you

If you run one app, you don't need any of this. Your CSS is the source of truth and there's nothing to drift against. The library, the gate, and the catalog are overhead, and the overhead only pays back once you have enough sibling surfaces that something, you or the model, would otherwise reinvent the same component a sixth time.

The instinct with AI UI work is to get better at describing what you want. The payoff runs the other way. Build the system, point the model at it, gate the drift in CI, and write down the exceptions in language the next session will read before it starts guessing.
