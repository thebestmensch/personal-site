---
author: James Mensch
pubDatetime: 2026-10-04T16:00:00Z
title: Review real AI output before you automate approval
featured: false
draft: false
tags:
  - ai-tools
  - agents
  - verification
description: "Two extraction mistakes shaped our AI review workflow. What we automated, what stayed with people, and how I'd test the approvals next."
---

I caught a Miller Lite priced at $500 while reviewing output from our AI menu extraction workflow. It was still staged, so customers never saw it.

Another extraction turned "add chicken $5" into a standalone menu item. The price was plausible, but the item was an option attached to another dish. A reviewer had to understand that relationship to catch it.

Those errors shaped how I approached automated review. Before deciding which results could pass without me, I needed to see what the model actually got wrong. Reviewing real output gave me examples I could use to improve the workflow and a clearer idea of where human judgment was still needed.

## A reasonable-looking record can still be wrong

At OneOnMe, the workflow extracts menu data for our gifting product. I [described its progression from a shared prompt to a broader workflow](/writing/from-prompt-to-agentic-workflow/), but getting useful output was only part of the problem. We also needed to decide which output could become customer-visible.

The two errors required different checks. A $500 beer is an obvious outlier once you know what the item is. The chicken modifier is harder because all of its individual fields can look sensible.

| Extracted result  | What made it wrong                        | What review needed                              |
| ----------------- | ----------------------------------------- | ----------------------------------------------- |
| Miller Lite, $500 | An implausible price for the item         | Price context and comparison with the source    |
| Add chicken, $5   | A modifier presented as a standalone item | The item's relationship to the surrounding menu |

I don't know for certain what caused the beer's price error. Inconsistent dollars-and-cents formatting is one possibility. That uncertainty matters when fixing extraction: a guessed explanation can lead to a prompt change that addresses the wrong problem.

The same distinction applies outside menus. An invoice extractor could copy a valid amount from the wrong row. A research agent could quote a sentence accurately while attaching it to the wrong claim. A check that every field exists would miss both.

## Let observed failures shape the review task

At first, I reviewed every extraction before publication. Once recurring problems were visible, I added a separate reviewer that compared incoming items with trusted catalog examples. It caught the chicken modifier and kept it from becoming a live item.

I refined the prompt with correct and incorrect examples. The reviewer assigned a confidence score, and a threshold helped route uncertain results into staging. Passing items could publish automatically. Flagged or uncertain items remained for human approval, correction, or rejection.

That gave the reviewer a specific job: identify output that should not proceed. The distinction matters because a request to "check your work" leaves the original task largely unchanged. A review task can focus on the ways a plausible extraction fails the business requirement.

```text
Proposed output
  -> reviewer decision + confidence
     |-> passes: eligible to publish
     |-> flagged or uncertain: staged
          -> human approves,
             corrects, or rejects
```

Anthropic describes a related [pattern of separating generation and evaluation](https://www.anthropic.com/engineering/building-effective-agents). Our workflow used review to decide what could proceed, rather than requiring an open-ended cycle of rewrites. A separate pass still has to earn trust through the mistakes it catches and the ones it misses.

## Give the reviewer enough context to disagree

Our reviewer's comparison with trusted catalog examples helped establish what a normal item looked like. Catching the chicken modifier demonstrated a useful plausibility check. It didn't establish that the reviewer could verify every extracted fact against its source.

The chicken error illustrates why context matters. If extraction discards the section heading and surrounding dish, a later reviewer may receive only a name and a price. Adding a more forceful instruction won't recover information it never received.

For a workflow that needs source verification, I'd make that a separate, explicit requirement of the review input. A document reviewer needs the relevant passage, while a support reviewer needs the applicable policy and account facts. Trusted examples can help interpret that evidence, but the original source is what establishes whether the proposed answer is accurate.

## Put predictable checks in code

Some findings can become ordinary validation rules. If a destination requires an identifier or a particular currency field, code can reject records that omit it. There's no reason to spend another model call checking whether a required field exists.

That is also a distinction I'd sharpen in our own system. Separate from the beer error, we had food-selection criteria, including price bounds, written into prompt instructions. Where a criterion has a precise answer, I'd implement and test it in code so a skipped instruction can't silently let the record through.

I'd use model review for the remaining interpretation, such as whether a proposed reply addresses the request or an item is actually a modifier. For a higher-consequence workflow, I'd also require human approval for consequential actions even when the reviewer sounds confident. That's a policy I'd design explicitly, beyond the confidence routing we used here.

## Check what automatic approval lets through

The confidence threshold helped route work, but the score came from the reviewer itself. I don't have evidence that a given score represented a calibrated probability of correctness, and catching a memorable error doesn't tell me the reviewer's overall accuracy.

The next test I'd add is a human-verified set of inputs and expected decisions, including known mistakes and valid examples that look unusual. I'd also sample automatically approved output against its source. Reviewing only the exception queue tells me what the system doubts, while its confident mistakes can pass unnoticed.

This follows the distinction in Anthropic's [agent evaluation guide](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) between model-based grading and human judgment used to check that grading. For our workflow, I'd track incorrect approvals alongside unnecessary escalations. One creates customer-facing errors, and the other consumes the time automation was supposed to save.

The $500 beer was useful because I saw it before a customer did. Once approval is automated, I need to look just as closely at the output that reaches the catalog without attracting anyone's attention.
