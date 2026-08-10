---
name: rrm-blog-copywriter
description: Write and improve schema-valid markdown blog post files for flight school clients using the canonical Right Rudder Marketing brand guide, approved aviation fact-check context, repo content, and per-post SEO planning. Use when asked to draft, revise, optimize, or create a .md blog post for an aviation or flight school client, especially in Astro content collections with a content config blog schema. This skill is blog-only and should not write landing pages, service pages, ads, emails, social posts, homepage copy, or general website copy.
---

# RRM Blog Copywriter

Use this skill only for blog posts. It turns the canonical brand guide, approved aviation facts, repo context, and per-post SEO planning into useful, search-intent-matched flight school articles that sound like a real flight school team wrote them. The final output is a `.md` file that matches the target repo's blog content schema.

## Workflow

1. Determine the blog job: new educational post, comparison post, cost/timeline guide, certification/rating explainer, career-path post, or existing blog improvement.
2. If the request is not a blog post, say this skill is blog-only and do not produce the requested copy.
3. Gather or locate the required inputs:
   - Canonical brand guide at `.agents/right-rudder-marketing/shared/outputs/brand-guide.md`
   - Aviation fact-check report from `rrm-aviation-industry-expert`
   - Target keyword or topic from the prompt or the fact-check report `Topic Context`
   - Author context or byline notes from the prompt, information dump, brand guide, or existing repo posts
   - Target audience and CTA, if not clear from the brand guide or prompt
4. Read the relevant references:
   - `references/blog-writing-workflow.md`
   - `references/blog-research-and-outline.md`
   - `references/blog-copy-quality-rules.md`
   - `references/blog-seo-structure-rules.md`
   - `references/astro-content-collection-output.md`
   - `references/blog-output-contracts.md`
   - `references/blog-quality-gate.md`
   - `references/blog-style-patterns.md`
5. Research and plan before drafting. Own the per-post SEO title, metadata, angle, human hook, reader stakes, author/byline handling, company point of view, outline, internal links, CTA, and claims-to-check decisions. Use provided SERP notes, SEO exports, existing posts, and repo content when available; use web research only when the environment allows it or the user requests it.
6. Inspect the target repo's content schema, existing blog posts, company name, program page URLs, internal-link inventory, existing `heroImage` values, and image path conventions before writing the `.md` file.
7. Translate evidence into company voice before drafting. Fact-check reports, repo pages, source notes, transcripts, and information dumps are internal evidence, not language to expose in the post.
8. Draft and write the post using only approved claims and clearly sourced context, but do not let fact safety flatten the voice. Use scenes, student situations, concrete mechanisms, and confident company perspective when the sources support them.
9. Write from the company's seat. Use the client name where it helps SEO or first-reference clarity, then use `we`, `our`, and `us` for company-specific facts. Keep `you` and `your` more frequent than company pronouns.
10. Handle bylines deliberately. For a team byline, write like school staff. For a named author, use source-backed role, military, airline, instructor, or operations cues only when useful and light. If the author has no usable background source, keep the author credit and use the team voice. Do not invent credentials, service history, airline experience, personal anecdotes, or first-person memories.
11. Do not use first-person singular unless the repo's existing authored posts or the prompt clearly support it.
12. Never publish outside-reviewer or source-audit phrases such as `our rentals page lists`, `our website says`, `the current page shows`, `the fleet page shows`, `listed in the repo`, `the episode notes describe`, `ask [company] how`, `ask the school if`, `the exact current count should be confirmed`, `do not assume`, `not a promise`, or `not a default path`.
13. If a detail needs client confirmation, do not turn that uncertainty into final-copy caveats. Omit the detail, use a supported broader statement, or write a natural company-voice next step such as `Contact us to confirm current availability` when the reader genuinely needs that information.
14. Confirm final blog output requirements: every table mention of a program name links to that program's individual page, every section has at least one relevant internal backlink, financing is mentioned at least once, each section uses bold emphasis when relevant, the current `heroImage` has not been used by another existing blog post, headings promise reader value, the opening creates a reason to care, and the final CTA has one primary next step.
15. Run `node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/validate-blog-body-images.mjs <post.md> --company "<Company Name>" --fix` from the target repo root to validate body images, external links, and `heroImage` reuse, revise if any issues remain, then run it once more without `--fix`.
16. Run `node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/lint-blog-human-voice.mjs <post.md>` from the target repo root. Revise until it passes. Do not deliver while the human voice lint fails.
17. Save drafts under `.agents/right-rudder-marketing/shared/outputs/blog-drafts/` only when the user asks for an agency draft artifact. Otherwise, write to the repo's resolved blog content folder.

## Blog Types Supported

- Educational how-to and what-is posts
- Flight training cost and timeline guides
- Certificate and rating explainers
- Comparison posts
- Career-path and decision-support posts
- Improvements to existing blog posts

## Out Of Scope

Do not use this skill for:
- Landing pages
- Service pages
- Homepage copy
- Email sequences
- Ad copy
- Social posts
- General brand messaging
- Non-aviation blog posts unless the user explicitly wants to reuse the structure outside the aviation niche

## Quality Standard

The post must be more than structurally correct. It must give the reader decision-making value and emotional momentum: specific tradeoffs, grounded examples, clear next steps, accurate aviation context, and a voice that feels like someone from the company is helping the reader choose well. If the brand guide, repo content, or fact-checking context does not support that level of value, ask for the missing strategy or fact-checking artifact.

Use the "last click" test from the reference skill: after reading the post, the target reader should not need another generic article to understand the decision. They may still need a client sales call, FAA source, or enrollment page, but not a better explanation of the topic.

Use the "human company voice" test: after reading the post, the reader should feel aviation is serious, exciting, and attainable. The post should not read like a fact-check report, legal memo, or generic SEO outline.

Use the "company seat" test: if a sentence would sound strange coming from the school in a conversation with a prospective student, rewrite it. `Our fleet currently includes...` is company voice. `The current fleet page shows...` is source-audit voice. `Contact us to confirm current availability` is a company next step. `The exact current aircraft count should be confirmed before using a number in your own planning` is not final blog copy.

Use the "byline honesty" test: if the credited author could not truthfully say the sentence from sourced background, make it team voice. `As a former airline captain...` requires a source. `Here at [School], we help students compare...` works for team voice and for named authors without usable bios.
