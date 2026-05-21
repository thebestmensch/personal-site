# Blog decisions log

Decisions made, open questions, and research history. Lives alongside `_guide.md` and the posts. Excluded from the content collection by the `**/[^_]*.md` glob.

This is the durable substrate for iterating on the blog: when a question gets answered, move it from "Open" to "Decided" with a one-line rationale. When a rule lands in `_guide.md`, note here why.

## Decided

- **Pronouns: hybrid I/we, not all-or-nothing.** ⚠️ **Supersedes the 2026-05-21 "collective we" decision.** Founder-voice corpus research (DHH, Fried, Graham, Spolsky, Collison) shows the durable pattern: "I" for personal conviction/observation/lived experience, "we" for company decisions/team actions. Anti-pattern explicitly named: "'we' to mean 'I, inflated', readers feel it and it creates distance, not credibility." Byline stays "James Mensch"; voice inside is hybrid. Reader is "you" when called to action. (2026-05-21, revised same day post-research)
- **Tone calibration: confidence comes from specificity, not volume.** Narrow claims age. "At OneOnMe we found that..." beats "founders should..." (Graham, Spolsky, Fried, DHH all qualify aggressively). Empathy lands through named tradeoffs; sincerity lands through admitting what you didn't know yet. (2026-05-21)
- **Title posture: claim, not topic announcement.** Falsifiable, sentence case, plain English. Five working shapes documented in `_guide.md`. (2026-05-21)
- **Title case: sentence case, not Title Case.** Matches every elite AI-eng blogger surveyed (Willison, Goedecke, Karpathy, Yan, Huyen, Boykis, swyx) plus Google/Stripe/Notion/Linear style guides. Title case reads as SEO-marketing in 2026. (2026-05-21)
- **`Stop X. Start Y.` title formula: avoid.** Period-separated two-sentence imperative is saturated at Medium/dev.to tier, absent from elite-tier (zero across ~200 sampled titles). Reads as motivational-poster shape. The live post's title falls into this trap; retitle pending JM's call (see Open question 13). (2026-05-21)
- **Tags: three, one per zoom level.** Broad bucket + specific tool + substantive concept. (2026-05-21)
- **Em-dashes: banned.** Comma + connective, parens, or sentence break. (2026-05-21)
- **Kill list extended.** AI-speak + vagueness/clarity + gatekeeping categories now in `_guide.md`. Sourced from Google's developer style guide, The Blogsmith, Blake Stockton, and corpus observation. (2026-05-21)
- **Length: ~600-1200 (short and dense) OR ~3000-5000 (reference depth). Avoid the 1200-3000 dead zone.** Per AI-eng blog corpus. (2026-05-21)
- **Closing: implication, not instruction.** No summary closes, no direct CTAs as the load-bearing close. Per founder-voice corpus (DHH, Spolsky, Fried). (2026-05-21)
- **Opening: start with the moment, not the conclusion.** Orient outsider in the first sentence, not a background paragraph. Three-sentence test: "is this for me?" + "what do I get?" answerable from the first three sentences alone. (2026-05-21)
- **Description hard cap: 160 characters.** Per Google's meta description display limit. Current live post is 169, slightly over; fix on next edit. (2026-05-21)
- **Distribution sequence post-publish:** Bluesky thread same day → TLDR AI submission → HN self-submit (Tue-Thu 8-10am PT or Sun 6-9pm PT) → dev.to cross-post with canonicalURL. No Medium (paywall + AI-suppression). No Hashnode. (2026-05-21)
- **Style guide stays private (colocated in repo).** No major AI-eng blogger publishes a voice guide publicly. The novel-content play is writing a post **about** the colocated-guide pattern, linking to the raw file. Guide itself stays here as living artifact. (2026-05-21)
- **Hold off on a blog-writer slash command / agent.** Rules live in three places already (`_guide.md`, `/jm-voice`, `/jm-pr`). Build the slash command when we feel real friction after 2-3 more posts, not before. (2026-05-21)
- **OneOnMe brand alignment scan: skip.** This is JM's personal blog, not OneOnMe's. "We at OneOnMe" appears because most tech posts will be OneOnMe-learnings, not because the blog is positioned as a OneOnMe channel. (2026-05-21)

## Open questions

Numbered for easy answering. When answered, move to "Decided" with the call + one-line rationale.

1. **Sitewide voice.** Posts use hybrid I/we; does the bio / hero / `SITE.desc` / OG card also shift to hybrid, or stay first-person-singular? Site config currently says `"I build for the human side of tech..."`.
2. **Topic scope.** AI + engineering only, or open to product / company-building / leadership / life? Affects whether tag bucket #1 stays narrow (`ai-tools`, `infra`) or widens (`building`, `craft`).
3. **Posting cadence target.** "When something lands" (per founder-voice corpus default), weekly, biweekly? Determines tag richness and `featured` rotation.
4. **Cross-posting + canonical.** Stays on jamesmensch.com only, or cross-post to dev.to (recommended over Medium/Hashnode by research)? If cross-post, jamesmensch.com is canonical.
5. **CTA at end.** Newsletter signup, OneOnMe link, "follow on Bluesky/X", nothing? Founder-voice corpus says implication-not-instruction; doesn't preclude a single quiet link.
6. **Drafting workflow.** Drafts as `draft: true` in same repo, separate scratch repo, Linear ticket per draft?
7. **Update protocol.** When a post turns out wrong: edit + bump `modDatetime` (re-fires RSS), write a follow-up, or both?
8. **Image policy.** Every post gets a custom `ogImage`, or rely on the existing dynamic Satori-generated per-post PNG?
9. **Series convention.** Multi-post series, tag like `series:hooks`, suffix in title (`Hooks, part 1`), neither?
10. **Featured post limit.** Schema allows multi `featured`. Cap at 1, 2, no cap?
11. **Comments / discussion.** Site has none. Add (giscus, utterances)? Send people to Bluesky / HN?
12. **Code block conventions.** How long is too long for inline? When to extract to a gist or repo? Highlight theme? (Research says 1-4 blocks max per post as punctuation, not content.)
13. **Retitle the live post?** Research says "Stop X. Start Y." is saturated. Candidate retitles (pick or veto):
    - (a) "AI rules drift. Shell scripts don't." (declarative contrast, one sentence)
    - (b) "The problem with AI rules is they're just prompts" (names the insight)
    - (c) "How I replaced my Claude rules with shell hooks" (personal proof-of-work)
    - (d) "Your AI rules are just prompts. Here's what to use instead." (claim, not command)
    - (e) Keep current title (the formula is worn but the argument is fresh; you may judge it survives the saturation)
14. **Revise the live post to hybrid I/we?** The current version is all-"we" (per the 2026-05-21 directive). Founder-voice corpus suggests reverting personal-observation sentences ("noticed myself skipping", "wrote 80+ rules across sessions") to "I" while keeping team-execution sentences (the commit gauntlet, "we use Claude Code at OneOnMe") as "we". Yes / no / specific guidance?

## Site-level fixes surfaced by distribution audit (not blog-rule decisions, but worth tracking)

These came out of the distribution + discovery research. Tracked here so they don't get lost. None are urgent; sequencing TBD.

- RSS feed serves only the description blurb, not full post content. Fix: switch to `@astrojs/rss` with `content` + `sanitizeHtml`. Feedly/Inoreader subscribers currently can't read posts in-reader.
- `public/og.png` is 2.7 MB (~13x typical social-card sizes). Re-encode to under 200 KB.
- `og:type` meta missing on posts (should be `article`) and home page (should be `website`). LinkedIn and Facebook downgrade link previews without it.
- `article:author` meta missing. LinkedIn uses it to enrich previews with author profile.
- `twitter:creator` missing (`@thebestmensch`).
- No Bluesky share button in `SHARE_LINKS` (`constants.ts`). Bluesky is the primary AI-eng audience platform in 2026.
- No `llms.txt` file. Not urgent but emerging standard for LLM answer engines (Perplexity, ChatGPT search).
- No Bluesky `did:web` verification. 15-minute DNS addition; lets `@jamesmensch.com` be the Bluesky handle and is a credibility signal in the AI-eng community.
- RSS feed `<title>` is just "James Mensch" (less scannable in feed-reader lists than "James Mensch · Writing").
- Pagefind index in `public/pagefind/` is a stale build artifact in the source tree. Should be gitignored.

## Research history (completed 2026-05-21)

All five agents returned. Raw findings live in the agent task outputs (transient); synthesis is folded into `_guide.md` and the Decided list above.

1. **Founder-voice corpus scan.** DHH, Fried, Graham, Spolsky, Collison, Lütke, McCabe. **Most load-bearing finding:** I/we is hybrid, not all-or-nothing. Tone calibration: specificity = confidence. Open with the moment, close on implication.
2. **AI-engineering blog scan.** Willison, Husain, Yan, Shankar, Carter, Boykis, Huyen, Bernhardsson, swyx, Karpathy. **Most load-bearing:** length bimodal (~600-1200 OR ~3000-5000, avoid middle); insider-first opening dominates the corpus (slight conflict with JM's "orient outsider" preference. Guide reconciles by keeping orient but doing it in the first sentence, not a paragraph). Closest comparables to JM's first post: Hamel Husain (#1), Phillip Carter, Karpathy bear.blog, Shreya Shankar, Erik Bernhardsson.
3. **Distribution + discovery audit.** Local Astro audit + reader-acquisition paths. **Most load-bearing:** Bluesky is the AI-eng audience platform in 2026 (3x engagement on technical content vs X). Ranked path: Bluesky thread → TLDR AI → HN self-submit → dev.to. Anti-pattern: Medium (paywall + AI-shape suppression).
4. **Title format research.** HN front pages + elite-tier corpus across 6 months. **Most load-bearing:** "Stop X. Start Y." is saturated at Medium-tier, absent from elite-tier (zero across ~200 titles). Live post's title is a candidate retitle (Open question 13). Five working title shapes documented in `_guide.md`.
5. **Style-guide adoption pattern.** Mailchimp, Google, 18F, Draft.dev, Blogsmith + indie/founder/AI-eng surveys. **Most load-bearing:** no AI-eng blogger publishes a style guide. JM's `_guide.md` is genuinely outlier. Verdict: keep private, but the **post about the pattern** would be novel content.

## How to use this file

- When a research pass returns, synthesize into `_guide.md` rules and log the takeaway under "Research history" with the load-bearing finding.
- When JM answers an open question, move it up to "Decided" with the one-line rationale.
- When you notice a new question mid-work, add to "Open questions" so it doesn't get lost.
- Keep entries dated (YYYY-MM-DD) so the rationale stays interpretable a year out.
- The site-level fixes section is separate from blog-rule decisions on purpose. They're infrastructure tasks, not editorial calls; sequence them when JM picks them up.
