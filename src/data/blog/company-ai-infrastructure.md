---
author: James Mensch
pubDatetime: 2026-06-28T16:00:00Z
title: "AI tooling is company infrastructure. Most teams still run it like personal dotfiles."
featured: false
draft: false
tags:
  - ai-tools
  - plugins
  - infrastructure
description: "Every employee runs their own local Claude. Anthropic shipped the shared install; the plugin repo to put through it is the part most teams skip."
---

We rolled Claude out across the company, and within a month everyone had a different one.

The model was identical for everyone. What each person built around it was not. Our engineers had wired skills and tool connections into Claude Code; our CEO, who doesn't write code, was using Claude Cowork with none of that. Two people could ask the same question about our own product and get different answers, because whatever knowledge shaped the answer was sitting on one person's laptop.

Every other tool we run settled this years ago. There's one Jira, and the whole company files into the same one. Same with the CI pipeline and the CRM. Nobody emails a new hire a zip of the Jira config to import; the tool runs somewhere shared and you join it. Improve a workflow and the next person who logs in gets your improvement for free.

Left alone, an AI setup never gets there. Everything you teach Claude lives in your own config, and the person at the next desk starts from scratch. Multiply that across a team and you get what we got: a dozen private installs, each drifting from the others a day after it's set up. It's Jira before anyone stood up the shared server.

## Two front doors

The drift is worse than the usual kind because there are two ways into Claude. Engineers work in Claude Code, inside the codebase. Everyone else works in Claude Cowork, which never touches the codebase at all. So the obvious move, writing your shared knowledge into the repo as a CLAUDE.md or a rules folder the AI reads, only does half the job. It reaches the engineers and the bots that run against the codebase, but nobody in Cowork, because Cowork never opens the repo.

We had built up a lot of operating knowledge about our production database, the kind you only get by breaking something and writing down what went wrong. To get it out of one engineer's head, we promoted it into the repo's shared surfaces, and for everyone working in the codebase it worked. Then our CEO asked Claude a database question in Cowork and got the generic textbook answer, because none of those surfaces exist outside a checkout.

The fix was a [plugin](https://code.claude.com/docs/en/plugins). We repackaged that same database knowledge as a plugin skill and pushed it to our internal marketplace, where it installs into Cowork and Code from one place. Then we wrote down the lesson it cost us, so the next audit would split the same way: engineer-only material stays in the repo, and anything a non-engineer needs ships as a plugin, because the plugin is the one format both front doors can install. I [wrote about this for one person once](/writing/name-tag-for-every-ai/); this is the same idea with a whole company reading.

## The plugin repo is the shared install

A plugin repo is the nearest thing to a Jira server for your AI setup. It's one repo, people install it, and it holds what was otherwise scattered across laptops.

|                                  | Claude Code (engineers) | Claude Cowork (everyone else) |
| -------------------------------- | ----------------------- | ----------------------------- |
| Repo surfaces (CLAUDE.md, rules) | reaches                 | misses                        |
| Plugin repo                      | reaches                 | reaches                       |

Skills go in it: the workflows and domain knowledge you'd otherwise walk every new hire through by hand.

The tool connections matter even more, and they're the part people underestimate. Today a teammate gets wired into your internal services by copy-pasting setup commands from a doc, one at a time, hoping it hasn't gone stale. A plugin declares those connections, so installing the plugin is the wiring, and the stale doc stops existing.

Then there are the rules and commands: the guardrails and shortcuts that make Claude act like your company's tool instead of a stock one.

I ran into the laptop problem in miniature with a command I'd written to groom our backlog. It lived in my personal dotfiles, which is a fancy way of saying it lived on one machine and helped exactly one person. Moving it into a plugin made it something anyone could install. It also turned up a bug that had been sitting in the private version for months, because a config nobody else reads can stay vague in ways a shared one gets called on.

None of this is unique to my company. I keep my own cross-tool context, who I am and how I work, [open-sourced as a plugin](https://github.com/thebestmensch/dot-me) anyone can install, so any Claude I sit down at reads the same thing. The company case is the same move with more readers: one team's setup reaching everyone, whichever door they came in through.

## Anthropic already built the server

Here's the part that caught me off guard while I was busy describing the workaround: the shared install exists. Anthropic [shipped org-level plugin provisioning](https://claude.com/blog/cowork-plugins-across-enterprise) in February. A private marketplace, your own GitHub repo as the plugin source, an admin console that pushes a plugin to everyone. It reaches both front doors. Cowork installs it by default, and Claude Code picks it up through [managed settings](https://code.claude.com/docs/en/settings) an admin controls centrally. The Jira server I said nobody had stood up got stood up while I wasn't looking.

So the gap isn't the tooling anymore. It's that the marketplace is mostly empty. Every company got handed the provisioning pipe and almost none of them have packaged a setup to run through it, because turning your AI config into a shared, versioned, installable thing still feels optional instead of like the infrastructure it now is.

You'll know your team is behind the first time a colleague watches you do something in Claude and asks how you got it to do that. The part that makes that answerable already shipped. Building the repo to put through it is the job that's still yours.
