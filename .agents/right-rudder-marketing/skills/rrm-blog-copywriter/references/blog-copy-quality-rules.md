# Blog Copy Quality Rules

Good RRM blog posts should help a prospective flight school student make a better decision.

## Rules

- Lead with the answer in the first 1 to 2 paragraphs.
- Lead with a human reason to care: a reader goal, friction, scene, cockpit moment, cost risk, schedule risk, or career decision.
- Explain aviation terms on first use.
- Convert features into buyer outcomes.
- After every differentiator, answer why it matters to the reader.
- Use concrete mechanisms, examples, student scenarios, and tradeoffs.
- Keep paragraphs short.
- Write like a knowledgeable person from the company is guiding the reader, not like an analyst summarizing source material.
- Use company-seat language for company-specific facts. After the first clear client-name mention, prefer `we`, `our`, and `us` over third-party descriptions of the school, while still using `you` and `your` more often than company pronouns.
- Match the byline honestly. Team bylines should sound like school staff. Named authors may add light, sourced persona cues when relevant, but should fall back to team voice when no usable author background exists.
- Do not use first-person singular unless existing authored posts or provided notes clearly support it.
- Do not invent author credentials, service history, airline experience, instructor history, personal anecdotes, or cockpit memories.
- Make aviation feel serious, exciting, and attainable. Avoid sterile copy that drains the reader's energy.
- Use editorial headings that promise a result, decision, or useful lesson. Avoid label headings such as "Overview," "Conclusion," "What This Means," or "What This Shows."
- Use qualifiers once and cleanly. Do not repeat caveats until the post feels defensive.
- Use tables when comparing programs, costs, timelines, paths, or options.
- In tables, link every program name mention to that program's individual page when the repo has one.
- Mention financing at least once in every final blog post, even when it is a brief caveat or next-step note.
- Add bolded words or phrases to each section when they improve scannability or call attention to a decision point.
- Avoid hype around safety, cost, regulation, and careers.
- Avoid filler openings like "in today's aviation landscape."
- Avoid claims that sound universal when the fact-check report only supports client-specific wording.
- Avoid robotic transitions when they repeat, including "that matters," "for you," "in plain English," "the key point," "this means," "it does not mean," and "the point is different."
- Avoid source-report texture in the body. Do not overuse "according to," "materials," "official sources," "the report," "the episode," or "the visit."
- Never expose source-audit phrasing in final copy: "our rentals page lists," "the fleet page shows," "our website says," "listed in the repo," "the current page shows," "the episode notes describe," "ask [company] how," "ask the school if," "the exact current count should be confirmed," "do not assume," "not a promise," or "not a default path."
- If a fact needs client confirmation, do not make the reader carry the internal uncertainty. Omit the detail, generalize it with supported language, or give one natural company-voice next step such as "Contact us to confirm current availability."
- Do not use tables that make the school sound like an outside evaluator. Avoid columns like "What to ask"; use company-voice planning columns such as "What we help you clarify," "What this helps you plan," or "How this supports your next step."
- End with one primary CTA that matches the reader's stage.

## Value Test

Each section should give the reader at least one of:
- A decision criterion
- A risk to avoid
- A concrete example
- A cost, timeline, or process clarification
- A tradeoff between options
- A next step

## Human Voice Gate

Before delivery, the post must pass `scripts/lint-blog-human-voice.mjs`. If it fails, revise the opening, headings, hedging, repeated phrases, source-report language, or CTA until it passes.
