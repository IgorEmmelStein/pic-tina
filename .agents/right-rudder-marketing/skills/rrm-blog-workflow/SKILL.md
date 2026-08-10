---
name: rrm-blog-workflow
description: Orchestrate the full Right Rudder Marketing blog creation workflow from one prompt. Use when Codex needs to create one final flight school blog post from a user's blog idea or title and relevant keywords while coordinating brand strategy, aviation fact-checking, blog writing, schema validation, image/link validation, and human voice linting.
---

# RRM Blog Workflow

Use this skill to turn one user prompt into one final repo-ready flight school blog post. This is an orchestration layer, not a replacement for the specialist skills.

## Input Contract

Accept a loose prompt or this structured shape:

```yaml
brandGuideMode: auto
blogIdea: ""
relevantKeywords:
  - ""
authorContext: ""
informationDump: ""
```

`brandGuideMode` controls the brand guide step:
- `auto`: default. Create the brand guide if missing. Update it only when repo source material changes positioning, offers, pricing, proof, claims, audience, conversion paths, or voice.
- `force-update`: always run the brand strategy skill and update the guide before fact-checking.
- `reuse-existing`: use the current brand guide without updating. If it is missing, stop and explain that `auto` or `force-update` is required.

If `brandGuideMode` is omitted, use `auto`. Do not ask the user which mode to use unless their prompt conflicts with itself.

`authorContext` is optional. Use it for byline notes, such as `School Name Team`, a named staff author, author image, role, instructor background, military background, airline background, or a note that no named author should be used. If omitted, infer author conventions from the brand guide and existing repo posts.

`informationDump` is optional. Use it for facts that are not discoverable through repo or web research, such as video contents, transcript notes, call notes, client-only context, author notes, quotes, event details, or rough observations. Treat it as user-provided source material, not as independently verified public research.

## Workflow

1. Build a blog job packet from the user prompt:
   - Raw idea, title, or theme
   - Relevant keywords, when provided
   - Optional author context or byline notes, when provided
   - Optional information dump, when provided
   - Brand guide mode

2. Resolve the repo context:
   - Confirm the working repo has `.agents/right-rudder-marketing/skills/`
   - Locate `.agents/right-rudder-marketing/shared/outputs/brand-guide.md`
   - Locate likely blog content folders and Astro content config if present
   - Keep all outputs inside the client repo, not this reusable source-base repo unless the user is explicitly editing the kit

3. Run the brand strategy layer:
   - Read and follow `.agents/right-rudder-marketing/skills/rrm-brand-strategy-specialist/SKILL.md`
   - In `auto`, create the guide if missing; otherwise perform the sparse update check only when the job packet or repo sources indicate material brand changes, including author credit, author voice, byline mode, or team voice
   - In `force-update`, update the guide from repo and extra-information sources
   - In `reuse-existing`, use the guide as-is and fail fast if it does not exist
   - Preserve `.agents/right-rudder-marketing/shared/outputs/brand-guide.md` as the durable strategy artifact

4. Run the aviation fact-check layer:
   - Read and follow `.agents/right-rudder-marketing/skills/rrm-aviation-industry-expert/SKILL.md`
   - Fact-check the claims needed for the blog idea using the blog job packet, optional author context, optional information dump, brand guide, and repo sources
   - Save the report under `.agents/right-rudder-marketing/shared/outputs/fact-checks/`
   - The report must include `Topic Context`, approved language, safe vivid framing, avoid language, required qualifiers, and the topic to use for blog planning
   - Label information-dump facts as user-provided context when they cannot be independently verified from repo or authoritative sources

5. Run the blog writing layer:
   - Read and follow `.agents/right-rudder-marketing/skills/rrm-blog-copywriter/SKILL.md`
   - Use the current brand guide and the new fact-check report
   - Use the author voice and byline strategy from the brand guide, explicit author context, or existing repo convention
   - Create exactly one schema-valid `.md` blog post in the resolved blog content folder
   - Keep the human voice requirements: human hook, reader stakes, company POV, sourced scene/example, precise qualifier strategy, editorial headings, and one primary CTA
   - Force a perspective translation before drafting: fact-check reports, repo pages, information dumps, transcripts, and source notes are evidence for the writer, not final-copy language
   - Write from the company's seat. Use the client name for SEO clarity when needed, but use `we`, `our`, and `us` for company-specific facts instead of writing like an outside evaluator describing the company
   - For a team byline, write as warm school staff. For a named author, use only light, source-backed persona cues when relevant; if no usable author background exists, keep the byline and use the team voice
   - When a fact needs client confirmation, do not paste the uncertainty into the post as source-audit copy. Either omit the detail, generalize it, or make the next step a natural contact-us sentence when the reader truly needs that confirmation

6. Validate before delivery:
   - Run `node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/validate-blog-body-images.mjs <post.md> --company "<Company Name>" --fix`
   - Run the same validator again without `--fix`
   - Run `node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/lint-blog-human-voice.mjs <post.md>`
   - Revise until all required checks pass

## Guardrails

- Do not skip the fact-check artifact to save time.
- Do not let the final writer invent aviation claims, client proof, pricing, outcomes, safety records, or career guarantees.
- Do not invent named-author credentials, service history, airline experience, personal anecdotes, or first-person memories.
- Do not rewrite the brand guide in `reuse-existing` mode.
- Do not create tactical blog briefs unless the user explicitly asks for one.
- Do not create landing pages, emails, ads, homepage copy, or service pages with this skill.
- Do not expand the input contract beyond the core fields plus optional `authorContext` and `informationDump`. Infer the rest from the brand guide, repo, blog idea, author context, and information dump. Still classify aviation, pricing, outcome, safety, and career claims before writing.
- Do not deliver final blog language that says or implies `our rentals page lists`, `our website says`, `the current page shows`, `the fleet page shows`, `listed in the repo`, `the episode notes describe`, `ask [company] how`, `the exact current count should be confirmed`, `do not assume`, `not a promise`, or similar outside-reviewer/source-audit phrasing.

## Final Response

Report:
- Brand guide mode used
- Brand guide path and whether it was created, updated, reviewed, or reused
- Fact-check report path
- Final blog post path
- Final title and slug
- Byline mode and credited author used
- Validator results
- Human voice lint result
- Any claims excluded or client confirmations still needed
