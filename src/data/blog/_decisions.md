# Blog decisions log

Decisions made, open questions, and research dispatched. Lives alongside `_guide.md` and the posts. Excluded from the content collection by the `**/[^_]*.md` glob.

This is the durable substrate for iterating on the blog: when a question gets answered, move it from "open" to "decided" with a one-line rationale. When a rule lands in `_guide.md`, note here why.

## Decided

- **Voice: collective "we at OneOnMe", not "I".** Even on a personal-domain blog. Most tech posts will be OneOnMe-learnings, so "we" is honest. The byline stays `James Mensch`. (2026-05-21)
- **Reader is "you" in calls to action.** Direct address, not editorial-we-includes-reader. (2026-05-21)
- **Tone signals: "I know my shit" + empathetic + sincere.** Confidence without arrogance, warmth without hedging. Sourced from `~/.me/voice.md`. To be encoded as concrete rules in `_guide.md` after research lands. (2026-05-21)
- **Title posture: prescriptive.** Title names the call, not the topic. ("Stop writing AI rules. Start writing shell scripts.", not "Memory doesn't survive momentum".) Confirm against title-format research before locking the exact shape. (2026-05-21)
- **Tags: three, one per zoom level.** Broad bucket + specific tool + substantive concept. (2026-05-21)
- **Em-dashes: banned.** Comma + connective, parens, or sentence break. (2026-05-21)
- **Hold off on a blog-writer slash command / agent.** Rules live in three places already (`_guide.md`, `/jm-voice`, `/jm-pr`). Build the slash command when we feel real friction after 2-3 more posts, not before. (2026-05-21)
- **OneOnMe brand alignment scan: skip.** This is JM's personal blog, not OneOnMe's. "We at OneOnMe" appears because most tech posts will be OneOnMe-learnings, not because the blog is positioned as a OneOnMe channel. (2026-05-21)

## Open questions

Numbered for easy answering. When answered, move to "Decided" with the call + one-line rationale.

1. **Sitewide voice.** Posts in "we", does the bio / hero / `SITE.desc` / OG card also shift, or stay first-person? Site config currently says `"I build for the human side of tech..."`.
2. **Topic scope.** AI + engineering only, or open to product / company-building / leadership / life? Affects whether tag bucket #1 stays narrow (`ai-tools`, `infra`) or widens (`building`, `craft`).
3. **Posting cadence target.** Weekly, biweekly, "when something lands"? Determines whether tags should be lean (3-5 broad) or rich (15-20 specific) and whether `featured` should rotate.
4. **Cross-posting + canonical.** Stays on jamesmensch.com only, or cross-post to oneonme.com/blog, Substack, dev.to? If cross-post, who's the canonical URL?
5. **CTA at end.** Newsletter signup, OneOnMe link, "follow on X", nothing?
6. **Drafting workflow.** Drafts as `draft: true` in same repo, separate scratch repo, Linear ticket per draft?
7. **Update protocol.** When a post turns out wrong: edit + bump `modDatetime`, write a follow-up, or both?
8. **Image policy.** Every post gets a custom `ogImage`, or use the generic monogram fallback for all?
9. **Series convention.** Multi-post series, tag like `series:hooks`, suffix in title (`Hooks, part 1`), neither?
10. **Featured post limit.** Schema allows multi `featured`. Cap at 1, 2, no cap?
11. **Comments / discussion.** Site has none. Add (giscus, utterances)? Send people to Twitter / HN / Bluesky?
12. **Code block conventions.** How long is too long for inline? When to extract to a gist or repo? Highlight theme?

## Research in flight

Dispatched 2026-05-21. Findings get synthesized into `_guide.md` (rules) and noted in "Decided" above (decisions).

1. **Founder-voice corpus scan.** dhh, Patrick Collison, Paul Graham, Jason Fried, 37signals. How they handle personal-domain-with-company-voice tension. Tone calibration for "I know my shit" without arrogance.
2. **AI-engineering blog scan.** Simon Willison, Hamel Husain, Eugene Yan, Shreya Shankar, Phillip Carter, Vicki Boykis, Chip Huyen, Erik Bernhardsson, swyx, Karpathy. Format, length, cadence, voice, distribution, what's getting shared in 2026.
3. **Distribution + discovery audit.** Local site audit (RSS, sitemap, OG, JSON-LD, canonical) plus reader-acquisition path scan (HN, Bluesky, newsletter aggregators, RSS readers).
4. **Title format research.** What title shapes get clicked in 2026 AI-eng / dev-tools? Is "Stop X. Start Y." fresh, dated, or saturated?
5. **Style-guide adoption pattern.** Do other indie/founder bloggers publish or maintain explicit style guides? Public vs private. What's in them.

## How to use this file

- When a research agent returns, synthesize into `_guide.md` rules + log the takeaway here.
- When JM answers an open question, move it up to "Decided" with the one-line rationale.
- When you notice a new question, add to "Open questions" so it doesn't get lost.
- Keep entries dated (YYYY-MM-DD) so the rationale stays interpretable a year out.
