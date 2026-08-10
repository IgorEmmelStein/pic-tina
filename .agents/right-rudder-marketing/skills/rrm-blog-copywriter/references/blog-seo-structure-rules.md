# Blog SEO Structure Rules

Use SEO structure to serve the reader, not to pad the post.

## Search Intent Matching

| Intent | Keyword Signals | Blog Approach |
| --- | --- | --- |
| Informational | how to, what is, meaning, requirements | Explain clearly and answer the core question early |
| Commercial investigation | best, vs, comparison, cost, reviews | Help the reader compare options and choose next steps |
| Cost/timeline | cost, price, how long, hours | Use tables and explain variables, inclusions, and risks |
| Local investigation | near me, state, city, region | Use local detail only when the brand guide or repo sources support it |
| Transactional | enroll, apply, pricing, program page | Do not force a blog post unless the angle is educational or comparison-based |

When SERP notes are available, match the format that searchers expect while adding a stronger angle from the brand guide and repo proof.

## Metadata

- Treat the user's raw title or topic as input, not as the final SEO title.
- SEO title: include the primary keyword or close variant near the front when natural.
- SEO title length: target 50 to 60 characters when possible. Avoid going over 65 characters unless the repo has a different hard convention.
- Click intent: make the title benefit-led and click-worthy by promising the reader a clear answer, decision, comparison, cost clarity, or next step. Do not use clickbait, unsupported urgency, or vague hype.
- Question format: use a question only when the query or search intent is question-based, such as "what is," "how long," "how much," "can you," or "do you need."
- Current year: add the current year only for time-sensitive topics such as cost, timeline, rules, requirements, career guides, comparisons, local market posts, or when the input or SERP implies freshness.
- H1/title: may match the SEO title, but can be slightly clearer for readers if the repo uses the frontmatter title as the page H1.
- Meta description: summarize the value, include a click reason, and keep it around 120 to 160 characters when possible.
- Slug and filename: derive both from the final SEO title or H1/title, not from a shortened topic fragment. Preserve all meaningful title words in lowercase kebab-case, removing only stop punctuation, unsafe URL characters, and unnecessary filler words when needed. The `.md` filename should be the same normalized title slug because Astro content collection filenames become the blog URL path.

## Body

- Open with search intent and a direct answer.
- Use H2s for major decision points.
- Use H3s only when a section needs substructure.
- Include the primary keyword in the first 100 words when natural.
- Use related terms naturally after that.
- Include internal links from the brand guide, existing repo posts, and the topic plan.
- Include at least one relevant internal backlink in every section.
- Link program names in tables to their individual program pages whenever matching pages exist.
- Add an authoritative external source only when the brand guide, repo source, or fact-check report supports it.
- External body links that start with `http` or `https` must use raw HTML `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`, not Markdown link syntax.
- For posts over 1500 words, consider a short table of contents only if the repo's style supports it.

## FAQ

Use 5 to 7 questions for substantial posts. Prioritize questions about cost, timeline, eligibility, schedule risk, housing, checkrides, and next steps when relevant.

## CTA

End with one primary CTA that matches the reader's stage. Do not bury multiple competing CTAs in the final section.
