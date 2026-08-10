---
name: rrm-brand-strategy-specialist
description: Create and sparsely update the canonical Right Rudder Marketing brand guide for aviation and flight school clients. Use when Codex needs to analyze a client repo, website content, extra-information files, SEO data, interviews, author or staff bios, or source docs to extract or refresh UVP, ICP, personas, positioning, offers, objections, proof points, safe claims, risky claims, voice, author/byline strategy, conversion paths, evergreen internal-link strategy, and durable blog opportunities before content is written.
---

# RRM Brand Strategy Specialist

Use this skill as the durable brand strategy layer for flight school content. Do not draft blog posts. Produce or update one source-grounded brand guide that other RRM skills can consume.

## Workflow

1. Locate `.agents/right-rudder-marketing/shared/outputs/brand-guide.md`.
2. Inspect the client repo and `.agents/right-rudder-marketing/extra-information/` before asking questions.
3. Read the relevant references:
   - `references/repo-discovery.md`
   - `references/brand-brief-output-contract.md`
   - `references/proof-and-claims-extraction.md`
   - `references/voice-and-message-map.md`
   - Use the other references when the task needs UVP, ICP, offer, objection, or voice work.
4. Extract claims only from source material. Mark unsupported but useful ideas as gaps, not facts.
5. If no brand guide exists, create `.agents/right-rudder-marketing/shared/outputs/brand-guide.md`.
6. If a brand guide exists, compare the source inventory and update only when positioning, offers, pricing, proof, claims, audience, conversion paths, voice, author credit, or byline strategy have changed.
7. Do not create tactical blog briefs by default. If the user explicitly asks for a topic brief, explain that per-post planning belongs in `rrm-blog-copywriter` and only produce a separate brief when the user still requests it.

## Source Rules

- Prefer client-owned repo content and extra-information files over model memory.
- Preserve file paths or source labels for every concrete claim, number, offer detail, timeline, location, and differentiator.
- Separate what the client says from what the strategist infers.
- Do not use aviation regulatory claims as verified facts unless the `rrm-aviation-industry-expert` has checked them or the source is explicitly provided.
- If sources are thin, produce a useful partial brief and a short gap list.

## Deliverables

For the canonical brand guide, include:
- Brand snapshot
- UVP and positioning
- ICP and personas
- Offers and conversion paths
- Pain points, objections, and decision criteria
- Proof points and safe claims
- Risky claims and missing evidence
- Author voice and byline strategy
- Voice, message map, company voice sourcebook, safe excitement boundaries, and internal link opportunities
- Evergreen blog opportunities and topic families

## Quality Gate

Before delivering, verify:
- Every hard claim has a source path or is clearly labeled as an inference.
- The UVP is specific enough that a competitor could not easily say the same thing.
- The ICP is behavior-based, not just demographic.
- The voice guidance includes phrases, scenes, testimonials, reader aspirations, reader fears, author/byline strategy, company-seat rewrites, confirmation phrasing, and banned robotic/source-audit patterns that future blog posts can reuse.
- Named-author guidance is source-backed. If a credited author has no usable bio or background source, the guide keeps the byline but tells writers to use team/staff voice instead of inventing personality.
- The guide is durable enough to support multiple future blog posts without re-running brand strategy.
- Update decisions are explicit: created, updated with reasons, or no update needed.
- Aviation claims are flagged for `rrm-aviation-industry-expert` when they touch FAA rules, certificates, ratings, checkrides, medicals, costs, timelines, safety, or aircraft operations.
