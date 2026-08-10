# Blog Quality Gate

Check every post before delivery.

## Scope

- The output is a blog post, not a landing page or other copy format.
- The output is a `.md` file unless the user explicitly asked for draft-only output.

## Last Click Test

- The opening answers the reader's main question.
- The opening creates a reason to care through reader stakes, a concrete aviation situation, or a clear decision risk.
- The reader has enough context to understand the decision, risk, or next step.
- The post adds original value from the brand guide, repo proof, or aviation expertise instead of restating generic search results.

## E-E-A-T And Trust

- Experience: The post uses client-specific proof, training environment details, student scenarios, or operational context where available.
- Experience: Named-author persona cues, if used, are sourced from author context, bios, repo content, or the brand guide.
- Expertise: Aviation terminology, FAA-adjacent claims, certificates, ratings, costs, timelines, and career-path claims are accurate and plain-English.
- Authoritativeness: Important aviation claims are supported by the brand guide, repo sources, fact-check report, or authoritative external sources when needed.
- Trust: The post labels uncertainty, avoids guarantees, qualifies risky claims, and does not invent credentials, safety records, results, rankings, or outcomes.
- Trust does not mean fear. Verified facts should sound confident, and qualifiers should be precise instead of repeated as blanket caveats.
- Hard claims come from the brand guide, repo source, or fact-check report.
- Aviation claims match the fact-check report.
- Risky claims are qualified or removed.
- The post uses specific examples, mechanisms, scenarios, or client proof where available.
- No unsupported superlatives or guarantees appear.

## On-Page SEO

- Title tag includes the primary keyword or close variant when natural.
- Raw topic/title was converted into an SEO-ready title before drafting.
- SEO title is 50 to 60 characters when possible and does not exceed 65 unless the repo convention requires it.
- SEO title is benefit-led and click-worthy without clickbait, vague hype, or unsupported urgency.
- Question-format titles are used only for question-based intent.
- Current-year titles are used only for time-sensitive topics or freshness-driven SERPs.
- Meta description gives a reason to click and is around 120 to 160 characters when possible.
- Filename and slug are a normalized-title version of the final SEO title or H1/title.
- Filename and slug preserve all meaningful title words instead of using an incomplete shortened phrase.
- Primary keyword appears early without stuffing.
- H2s reflect real reader questions or decision points.
- H2s are editorial promises or useful lessons, not generic labels.
- Internal links are relevant and use descriptive anchor text.
- Every section has at least one relevant internal backlink to a client page or post.
- When a table names a program, each program name links to its individual program page when that page exists.
- External body links that start with `http` or `https` use raw HTML `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`.
- Image alt text is descriptive when images are used.
- Body content includes at least 3 image figures.
- Every body image uses `<figure>`, `<img>`, and `<figcaption>`, not Markdown image syntax.
- Every body figure caption ends with `(Source: {COMPANY_NAME} media archive)` using the exact client company name.
- Body figure images use public URL paths that resolve to existing files under a `public` subfolder.

## Copy Quality

- The post has a clear angle and does not read like generic SEO content.
- The post sounds like a knowledgeable company team member wrote it.
- The byline is handled honestly: team byline uses staff voice; named author uses only light, sourced persona cues; named author without usable background falls back to team voice.
- Company-specific facts use company-seat language after the first clear client-name reference. The post does not talk about the client as if the writer is outside the company.
- The post uses scenes, reader stakes, student situations, or concrete mechanisms where sources support them.
- The post makes aviation feel serious, exciting, and attainable without unsupported hype.
- The post does not read like a fact-check report, legal memo, or source summary.
- The post does not expose internal source language such as `repo`, `source material`, `our rentals page lists`, `our website says`, `the current page shows`, `the fleet page shows`, `listed in the repo`, `the episode notes describe`, or `official materials`.
- The post does not tell the reader to `ask [company]` or `ask the school` about the company's own offer. Use company-voice contact language only when a next step is needed.
- Client-confirmation gaps are handled by omission, supported generalization, or one natural contact-us sentence, not by source-audit caveats.
- Each section adds decision-making value.
- Paragraphs are short and scannable.
- Tables are used when they clarify comparisons, timelines, costs, or steps.
- Financing is mentioned at least once, using qualified wording when the available facts require it.
- Each section uses bolded words or phrases when emphasis improves scanning or highlights a decision point.
- FAQ answers buying friction or search follow-up questions.
- CTA matches search intent and does not compete with other final actions.
- The final section has one primary CTA.
- Required qualifiers are placed close to the claims they limit and are not repeated as filler.
- The post passes `node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/lint-blog-human-voice.mjs <post.md>`.

## Schema And File Output

- The live content config was inspected.
- Frontmatter matches the target repo's blog schema.
- Required fields are present.
- Categories, tags, image paths, author fields, dates, and reading time follow existing repo conventions.
- `heroImage`, when present, is a valid repo path and has not already been used by another existing blog post.
- Body `<figure>` and Markdown image paths do not reference `src/assets`.
- The body image, external link, and `heroImage` reuse validator/fixer ran with `--fix`, then passed without `--fix`.
- The human voice lint script passed after the final content revision.
- Existing structured-data helpers are not duplicated.
