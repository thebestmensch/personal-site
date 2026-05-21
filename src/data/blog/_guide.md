# Blog post guide

How posts should feel. Apply to every draft before publishing. Updated when a post violates a rule that isn't here yet, not on a schedule.

This file lives in `src/data/blog/` and is excluded from the collection by the `**/[^_]*.md` glob in `src/content.config.ts` (leading underscore). Boundary: this guide covers **post-level structure, posture, title/tag/description, and the kill list**. Sentence-level voice and rhythm rules live in `~/.me/voice.md`. Open questions and decision history live in `_decisions.md` alongside this file.

## Title

A claim, not a topic announcement. Falsifiable, sentence case, plain English.

Test: if you could put "I believe that" in front of the title and it reads as a coherent sentence, it's a claim. If you can't, it's a topic. Topics get filed; claims get clicks.

**Searchability test (load-bearing in unsettled spaces).** In a new or unsettled space (AI tooling, novel patterns, emerging frameworks), readers find posts by googling the problem they're stuck on, not by browsing. The title should contain the words a frustrated reader would type into the search bar at 2am, mid-task, when they hit the thing your post solves.

Test: imagine the reader hitting your problem. What 4-6 words do they type into Google? If those words (or close synonyms) aren't in your title, the title is too clever.

This is complementary to the I-believe-that claim test. A title can pass one and fail the other. Example: "AI rules drift. Shell scripts don't." passes the claim test but fails the search test (nobody types "AI rules drift"). "Don't let your AI decide which rules to follow" passes both: it's a falsifiable claim, AND it contains the words a frustrated reader would type when their AI assistant is ignoring their rules.

The search test matters more in emerging spaces and decays as the space matures. AI-eng in 2026 is search-driven; settled categories (React, Postgres) are browse-driven and clever titles work fine there.

**Sentence case, not title case.** Every elite AI-eng blogger (Willison, Goedecke, Karpathy, Yan, Huyen, Boykis, swyx) writes in sentence case. Title case reads as SEO-optimized marketing or legacy publishing in 2026.

**Five shapes that work in this niche right now**, ranked by fit:

1. **Declarative claim with hidden reversal.** "Don't let your AI decide which rules to follow" / "Hallucinations in code are the least dangerous form of LLM mistakes" (Willison).
2. **Personal proof-of-work discovery.** "How I replaced 40 lines of CLAUDE.md with 3 shell hooks" / "How I ship projects at big tech companies" (Goedecke).
3. **Named pattern / coinage / reframe.** "The 70% Problem: Hard Truths About AI-Assisted Coding" (Osmani) / "AI Observability is Just Application Observability" (Carter).
4. **Earned-metric specificity.** "What I learned from looking at 900 most popular open source AI tools" (Huyen). The number is a proof of work, not a listicle promise.
5. **Situational reframe ("X is Y").** "Functional programming is the libertarianism of software engineering" (Bernhardsson).

**Banned title shapes** (any one of these → rewrite):

- `5 ways to...` / `7 things...` / `10 tips...` (listicle = AI-shaped, reflex-downvoted on HN)
- `The ultimate guide to...` / `A complete guide to...` (corporate SEO shape)
- `[X] in 2026` as the only differentiator (year-as-freshness = saturation signal now)
- **`Stop [X]. Start [Y].`** Period-separated two-sentence imperative. Saturated at Medium/dev.to tier, absent from elite-tier (Willison, Goedecke, Karpathy, Yan, Huyen, swyx; zero across ~200 sampled titles). Reads as motivational-poster shape before reader knows topic. If imperative is the right move, use one sentence and make the X genuinely surprising (80%-nod test: if 80% of target readers would already agree with "Stop X" before opening, X is obvious and title fails).
- `Why X is the future of Y` (thought-leader vagueness)
- `Everything you need to know about X`
- `[X] will change everything` / `X is a game-changer`
- `What nobody tells you about X` (was energizing 2020-2022; now soft clickbait)
- Em-dashes in titles
- Questions (usually). Exception: investigative-with-stakes ("Is chain-of-thought AI reasoning a mirage?").

**Title test:** remove the subject and see if the predicate is still interesting. "Shell scripts are a better abstraction for AI behavior than rules" passes. "Stop writing AI rules" fails because "stop writing" is the whole payload.

**Process note.** If you can't state the call in one sentence before you write the body, the prescription isn't sharp yet. Write the title first. The post follows from the claim, not the other way around.

## Description (frontmatter)

Orient a reader who doesn't already know your tools. Hard cap **160 characters** (Google's meta description display limit). State the problem, name the fix.

- Good: "I wrote 80+ rules to shape my AI coding assistant. It ignored them mid-task. Shell-script gates were the only layer that stuck."
- Bad: "Most posts about Claude Code stop at CLAUDE.md, the easy part. The harder problem is enforcement."

This is also the OG card, the Twitter card, the RSS blurb, and the meta description all at once. It has to stand on its own outside the post.

## Tags

Three tags, one per zoom level:

1. **Broad bucket** (`ai-tools`, `infra`, `building`), the category, for navigation
2. **Specific tool or surface** (`claude-code`, `astro`, `1password`), what this post is actually about
3. **Substantive concept** (`automation`, `enforcement`, `observability`), the idea, not the noun

Avoid:

- Vague concepts as standalone tags (`hooks`, `workflow`, `productivity`). Ambiguous, don't help navigation.
- Over-specific tags (`claude-code-hooks`). Let the post body carry specifics.
- One-off tags that only ever match this one post. If you can't imagine a second post under the tag, rename.

## Opening

Open with **the moment that made you write this**, not the conclusion. An anomaly, a question, a friction you couldn't ignore. The post starts where your thinking started.

Orient the outsider **in the first sentence**, not the second paragraph. Bake context into the claim, don't lead with a paragraph of background.

- Good (DHH): "Two years ago, we got the audacious idea to take on Google, Microsoft, and Verizon."
- Good (Hamel): "I've seen many AI products fail because..."
- Good (Graham): "A few days ago I finally figured out something I've wondered about for 25 years."
- Bad: "Most posts about configuring X stop at Y." (announces the topic, defers the claim)
- Bad: "In today's rapidly evolving AI landscape..." (AI-shaped, no specific moment)

**Three-sentence test:** can a stranger reading only the first three sentences answer (a) is this for someone like me? and (b) what do I get if I keep reading? If no, the opening doesn't earn the rest.

## Voice

Pro register. Sentence-level voice rules live in `~/.me/voice.md`. Post-level highlights:

**Pronouns: hybrid I/we, not all-or-nothing.** This is the durable pattern across DHH, Fried, Graham, Spolsky, Collison.

- **"I"** for personal conviction, observation, lived experience. "I noticed I was skipping the review step." "I tried that. It didn't hold."
- **"we"** for company decisions, team actions, collective commitment. "At OneOnMe we ship Claude Code in every engineer's workflow." "We chose hooks over more rules because..."
- **Reader is "you"** when called to action. "If you're scaling your AI workflow..."

Anti-pattern: **"we" used to mean "I, inflated."** Readers feel it and it creates distance, not credibility. Never use "we" to amplify a personal opinion. Never use "I" to dodge a company decision. The byline stays "James Mensch"; the voice inside is hybrid.

**Tone calibration: "I know my shit" + empathetic + sincere.**

Confidence comes from **specificity, not volume**. Narrow claims age better.

- Good: "At OneOnMe we found that..." / "I spent six months on X and the pattern that held was Y."
- Bad: "Founders should..." / "The industry needs to..."
- Good (Graham): qualifies aggressively ("in my experience," "I suspect," "for my purposes")
- Good (Spolsky): "highly irresponsible, sloppy" admission before presenting his system
- Bad: broad prescriptions about "leadership" or "culture" without a specific moment that earned them

Empathy comes from **named tradeoffs**, not phantom-empathy closes. Don't end with "we know this is hard" without having named the actual hard part in the post.

Sincerity comes from **naming what you didn't know yet**, not retrospective inevitability. Avoid "looking back, this was the inflection point that changed everything." Milestone-framing on recent events reads as brand narrative.

**Other voice rules:**

- **No em-dashes.** Comma + connective, parens, or sentence break.
- **Confident, not stiff.** "Hooks are not advice. They're gates." not "Hooks could be considered a form of enforcement."
- **Contractions kept.** Pro register uses `it's`, `isn't`, `don't` properly. Lowercase-i and no-apostrophe shapes are iMessage register, not blog register.

## Kill list

Three categories. Strip on sight.

**AI-speak tells.** These mark text as LLM-generated in 2026:

- `delve`, `robust`, `seamless`, `unlock`, `transform`, `revolutionize`, `game-changer`, `empower`, `leverage`, `utilize`, `unprecedented`, `comprehensive`, `streamline`, `harness`, `landscape` (metaphorical), `realm`, `tapestry`
- Transition patterns: `Moreover,`, `Furthermore,`, `Crucially,`, `Notably,`, `Importantly,`, `Fundamentally,`, `The bottom line,`
- Contrast-elevation: `It's not just X, it's Y`, `This isn't about X, it's about Y`, `Whether you're X or Y`
- Openers: `Certainly!`, `Great question!`, `In today's fast-paced world`, `In today's rapidly evolving`, `Let's first understand`, `Let's dive in`
- Closers: `In summary`, `In conclusion`, summarizing what was already said

**Vagueness / clarity kills.** Distinct from AI-speak. These erode precision:

- `simply` (almost always deletable), `just` (filler), `essentially`, `nuanced`
- `in order to` → `to`, `allows you to` → `lets you`, `utilize` → `use`
- `currently` (implies the reader knows the old state), `as of this writing` (dates the post)
- `a lot` → quantify, `etc.` → `including`
- `there is/are` at sentence starts → restructure
- `functionality` → `features`, `impact` as verb → `affects`

**Gatekeeping (insults reader intelligence).** Assumes the reader already knows what they're reading to learn:

- `obviously`, `of course`, `clearly`, `everyone knows`, `as you know`

## Length

Two working ranges, with a known dead zone in the middle.

- **Short and dense (~600-1200 words).** Closest fit for JM's first post. Works when every paragraph carries weight. Examples: Phillip Carter, Shreya Shankar, Karpathy's bear.blog posts.
- **Reference depth (~3000-5000 words).** Works when the post becomes the canonical resource on its topic, the one engineers bookmark and return to. Examples: Hamel Husain's evals FAQ, Eugene Yan's patterns post.
- **Dead zone (~1200-3000 words).** Too long to be sharp, too short to be a reference. Most unmemorable posts live here. If a draft lands here, either cut to 1000 or expand to make it the canonical post on the topic.

Floor: "I had something I couldn't stop myself from saying." Ceiling: the argument still holds after the last example. Cut when the point is made. Don't pad to expected length.

## Closing

Close on **implication, not instruction**.

Direct CTAs ("subscribe!", "follow me on X!") signal that the writing served a business goal rather than a reader one. The most-cited posts in the founder-voice corpus close on understatement or forward energy:

- DHH "RECONSIDER": "Curb your ambition. Live happily ever after."
- Spolsky "Law of Leaky Abstractions": notes programmers will be needed who understand the layers below (a diagnosis, not a directive)
- DHH "Legacy without Nostalgia": "keep going, keep thinking, keep prodding, keep provoking"

Acceptable closing shapes:

- A single pointed prescription tied to the post's specific claim
- A named open question ("the thing I haven't solved is X")
- An honest admission of what's still unknown

Banned: summary-then-defer ("there are many ways to think about this; what matters most is finding what works for your team"). The hedge erases the conviction the post built.

## Code blocks, diagrams, links

**Code as punctuation, not as content.** 1-4 code blocks max per post. The argument lives in the prose; code grounds a specific claim and signals "this is real." One complete working shell script or hook config beats five partial snippets.

**Conceptual diagrams beat system architecture diagrams.** The 2x2 framework, the flywheel, the named axis; these get screenshot and reshared. System architecture diagrams are used for credibility but rarely reshared.

**Linking standard:**

- First-person experience is sufficient authority for process claims
- External links required for empirical claims (data, prevalence, measurements)
- Don't link to sources you haven't read
- Every post should have at least two external links (signals web-connected, creates reshare incentive for linked parties)
- Starting at post #3: link to one prior post by slug. Internal-link graph matters for topical authority and reader retention. Link naturally in prose, don't manufacture "related posts" sections.

## Frontmatter shape

Required: `author`, `pubDatetime`, `title`, `description`, `tags`.

Optional: `featured` (one or two highlight posts at a time, max), `draft`, `modDatetime`, `ogImage`, `canonicalURL`.

Don't add fields the schema doesn't define (see `src/content.config.ts`). Astro Content Collections rejects unknown fields and the build fails.

Filename is the slug. Use kebab-case, match the post's substance not its punctuation (`stop-writing-ai-rules.md` for "Stop writing AI rules. Start writing shell scripts.").

**`modDatetime` discipline.** The RSS feed uses `modDatetime ?? pubDatetime` as the item's `pubDate`, so setting `modDatetime` re-fires the post in subscribers' feed readers as if it's new content. Reserve for substantive updates only. Note what changed.

**`canonicalURL` discipline.** Set only when cross-posting (post goes elsewhere first or in parallel). For posts that live only on jamesmensch.com, the auto-computed canonical is correct; leave the field unset.

## Distribution

After a post ships, in order:

1. **Bluesky thread** the day of publish. 2-3 native posts (key claim, key mechanism, hard-won lesson), link in the final post. Not a link-dump.
2. **TLDR AI submission** (low-variance, non-penalized).
3. **HN self-submit** during the optimal window (Tue-Thu 8-10am Pacific, or Sun 6-9pm Pacific). Never solicit upvotes; ring detection is aggressive. One shot per post; don't resubmit.
4. **dev.to cross-post** with `canonicalURL` set to the jamesmensch.com URL. Don't cross-post to Medium (paywall + AI-shape suppression). Skip Hashnode unless audience-shift signals change.
5. **LinkedIn:** short native post (key argument, no link), link in first comment. Or LinkedIn Article as truncated teaser → full version at jamesmensch.com.

"I posted it on X" is not distribution. The above is.

## Final pass (ABCD + checklist)

Before publishing, run through:

**Rule-compliance:**

1. Does the title make a claim (passes the "I believe that \_\_\_" test), not announce a topic?
2. Is the title in sentence case?
3. Is the description under 160 characters?
4. Are the three tags one-of-each-zoom?
5. Does the opening start with the moment that made you write this, not the conclusion?
6. Three-sentence test: can a stranger answer "is this for me?" and "what do I get?" from the first three sentences?
7. Pronouns: "I" for claims, "we" for actions, no "we to mean I, inflated"?
8. Is there one recommendation, not a survey?
9. Em-dash grep on the body, none?
10. Kill-list grep: AI-speak tells, vagueness kills, gatekeeping?
11. At least two external links? Internal link to a prior post (if this is post #3+)?
12. Closing on implication, not instruction or summary?

**Reader-experience (ABCD, via swyx):**

13. **Awesome:** what's the single best line or insight in the post? If there isn't one, the post is filler.
14. **Boring:** which paragraph would a skeptical reader skip? Cut it.
15. **Confusing:** where would a non-insider get lost? Tighten or add one concrete example.
16. **Didn't believe:** which claim is asserted without evidence? Add a specific moment or cut the claim.
