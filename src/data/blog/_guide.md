# Blog post guide

How posts should feel. Apply to every draft before publishing.

This file lives in `src/data/blog/` and is excluded from the collection by the `**/[^_]*.md` glob in `src/content.config.ts` (leading underscore).

## Title

Prescriptive. Names the call, not the topic.

- Good: "Stop writing AI rules. Start writing shell scripts."
- Bad: "Memory doesn't survive momentum"
- Bad: "Thoughts on AI workflow enforcement"

Plain English. If a reader who doesn't know your stack can't parse it, rewrite. Title doesn't need to be cryptic to feel earned, it just needs to be honest about what the post says.

## Description (frontmatter)

Orient a reader who doesn't already know your tools. One or two sentences, max ~180 chars. State the problem, name the fix.

- Good: "I wrote 80+ rules to shape my AI coding assistant. It ignored them mid-task. Shell-script gates were the only layer that stuck."
- Bad: "Most posts about Claude Code stop at CLAUDE.md, the easy part. The harder problem is enforcement."

This is also the OG / link-preview text, so it has to stand on its own outside the post.

## Tags

Three tags. Each at a different zoom:

1. **Broad bucket** (`ai-tools`, `infra`, `building`), the category, for navigation
2. **Specific tool or surface** (`claude-code`, `astro`, `1password`), what this post is actually about
3. **Substantive concept** (`automation`, `enforcement`, `observability`), the idea, not the noun

Avoid:

- Vague concepts as standalone tags (`hooks`, `workflow`, `productivity`). They're ambiguous and don't help navigation.
- Over-specific tags (`claude-code-hooks`). Let the post body carry the specifics.
- One-off tags that only ever match this one post. If you can't imagine a second post under the tag, rename.

## Opening

Orient a non-insider in the first two sentences. Name the tool, the stack, or the problem space before you start critiquing it.

- Bad: "Most posts about configuring X stop at Y."
- Good: "I use X, which is [one-line description]. The published advice says Y."

The reader didn't necessarily land here from inside your bubble. Assume they didn't.

## Posture

Prescriptive. Recommend one path. Tradeoffs and hedges go in a single closing paragraph, not five comparable options. (See `~/.me/memory/feedback_blog_prescriptive_framing.md`.)

If the call turns out wrong later, update the post. Don't pre-hedge.

## Voice

Pro register, applied via `/jm-voice --pro`. The full voice rules live at `~/.me/voice.md`. Highlights that get violated most:

- **Collective "we", not "I".** The blog speaks as "we at OneOnMe", not as James-solo. Even when the specific experience was one engineer's, lift to team-level framing when honest, rephrase when not. Don't claim team-scale facts that are personal-only. The byline stays "James Mensch"; the voice inside the post is "we".
- **Reader is "you".** Address the reader directly when calling them to action: "If you're scaling your AI workflow..."
- **No em-dashes.** Comma + connective, parens, or sentence break.
- **No AI-speak tells.** "It's not just X, it's Y", "Whether you're X or Y", "Crucially,", "Notably,", "delve, robust, seamless, unlock." Strip on sight.
- **No corporate openers.** "Certainly!", "Great question!", "In today's fast-paced world." Don't.
- **Confident, not stiff.** "Hooks are not advice. They're gates." not "Hooks could be considered a form of enforcement."
- **Contractions kept.** Pro register uses `it's`, `isn't`, `don't` properly. Lowercase-i and no-apostrophe shapes are iMessage register, not blog register.

## Frontmatter shape

Required: `author`, `pubDatetime`, `title`, `description`, `tags`.

Optional: `featured` (one or two highlight posts at a time, max), `draft`, `modDatetime`, `ogImage`.

Don't add fields the schema doesn't define (see `src/content.config.ts`). Astro Content Collections will reject unknown fields and the build fails.

Filename is the slug. Use kebab-case, match the post's substance not its punctuation (`stop-writing-ai-rules.md` for "Stop writing AI rules. Start writing shell scripts.").

## Final pass

Before publishing, run through:

1. Does the title name a prescription a non-insider can read?
2. Does the description orient an outsider?
3. Are the three tags one-of-each-zoom?
4. Does the first paragraph name the tool, stack, or problem space?
5. Is there one recommendation, not a survey?
6. Em-dash grep on the body, none?
7. Any AI-speak tells from the voice doc?
