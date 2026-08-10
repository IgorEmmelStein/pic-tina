# Blog Output Contracts

The default output is one schema-valid `.md` blog post file. Use chat draft output only when the user explicitly asks for draft-only content.

## Chat Draft

```markdown
# [Blog Title]

## SEO Metadata
- Raw topic/title:
- SEO title:
- H1/title:
- Description:
- Slug:
- Primary keyword:
- Secondary keywords:
- Search intent:
- Byline mode:
- Credited author:
- Author evidence:
- Permitted persona cues:
- Personalization level:
- Fallback voice:
- Content angle:
- Human hook:
- Reader stakes:
- Company POV:
- Company-seat phrasing:
- Sourced scene or example:
- Qualifier strategy:
- Client-confirmation handling:
- Source-audit phrases excluded:
- CTA:

## Draft
[Full blog post]

## Internal Links Used
- [url/path]: [anchor]

## Notes
- Assumptions:
- Claims excluded:
```

## Repo File

Before writing a repo file, inspect:
- Content schema or frontmatter validation
- Existing blog post frontmatter
- Existing `heroImage` values across blog posts
- Existing image conventions
- Public-folder image paths for any body figures
- External body link conventions for `http` and `https` links
- Program page URLs and other internal pages relevant to the topic
- Client company name for body figure source captions
- Author context, author image, and byline conventions from explicit prompt notes, the brand guide, and existing posts
- Existing category/tag values
- Existing URL/slug conventions

Do not hardcode one framework's schema across all repos. Match the target repo.

Resolve the output folder in this order:
- Existing `src/content/blog`
- Existing `content/blog`
- Existing `contents/blog`
- A blog content folder clearly indicated by the repo's content config

Create exactly one `.md` file. Use a filename that is the normalized-title slug:
- Base it on the final SEO title or H1/title.
- Preserve all meaningful title words in order.
- Use lowercase kebab-case.
- Remove punctuation, unsafe URL characters, and filler words only when needed.
- Do not shorten the filename to an incomplete keyword phrase unless the repo already has a conflicting URL convention.

Example: `Instrument Rating Cost in [Target State]: 2026 Guide` becomes `instrument-rating-cost-in-target-state-2026-guide.md`, not `instrument-rating-cost.md`.

Before delivery, run:

```text
node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/validate-blog-body-images.mjs <post.md> --company "<Company Name>" --fix
node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/validate-blog-body-images.mjs <post.md> --company "<Company Name>"
node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/lint-blog-human-voice.mjs <post.md>
```

Final blog body requirements:
- Every table mention of a program name must link to that program's individual page when a matching internal page exists.
- Every section must include at least one relevant internal backlink to the client's pages or posts.
- Financing must be mentioned at least once, with wording supported by the brand guide, repo, or fact-check context.
- Each section should include bolded words or phrases when they genuinely help scannability; do not bold random keywords.
- The frontmatter `heroImage`, when present, must not reuse a `heroImage` already used by another existing blog post.
- The opening must create a reason to care through reader stakes, a concrete aviation situation, or a clear decision risk.
- H2s must be editorial promises or useful lessons, not generic labels.
- Qualifiers must be precise and not repeated until the copy feels overly cautious.
- Company-specific facts must sound like the company is speaking, not like a third-party source audit.
- Team bylines must sound like school staff. Named authors must use only light, sourced persona cues, and named authors without usable background must fall back to team voice.
- Final copy must not expose repo/source phrasing such as `our rentals page lists`, `our website says`, `listed in the repo`, `the current page shows`, `the fleet page shows`, `the episode notes describe`, `ask [company] how`, or `the exact current count should be confirmed`.
- The final CTA must have one primary next step.

After writing, report:
- Created or updated path
- Final title
- Filename/slug used
- Byline mode and credited author used
- Schema assumptions
- Internal-link, financing, bold-emphasis, and heroImage uniqueness checks
- Human voice lint result
- Any claims excluded

## Improvement Output

For existing post improvements, include:
- What changed
- Why it changed
- Updated draft or file path
- Remaining risks
