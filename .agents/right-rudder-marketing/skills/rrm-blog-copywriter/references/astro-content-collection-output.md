# Astro Content Collection Output

Use this reference when the target repo uses Astro content collections.

## Required Discovery

Before writing the final `.md` file:
- Locate `src/content/config.ts`, `src/content.config.ts`, or another Astro content config file.
- Find the `blog` collection schema.
- Inspect at least 2 existing files in the resolved blog content folder.
- Inventory existing `heroImage` values before choosing the new post's `heroImage`.
- Match the schema and local frontmatter conventions exactly.

Do not use an old prompt-pack schema if it disagrees with the live content config.

## Example Blog Schema Shape

Many Astro flight school repos use a blog collection shaped like this, but treat this as an example only:

```yaml
---
title: ""
description: ""
author: ""
authorImage: ""
tags:
  - ""
categories:
  - "Flight Training"
keywords: ""
readingTime: 0
pubDate: "YYYY-MM-DD"
updDate: "YYYY-MM-DD"
heroImage: ""
---
```

`updatedDate`, `heroImage`, and `keywords` are common optional fields. The live repo schema always wins.

## Category Rules

Use only categories allowed by the live schema. Common flight school category examples include:

- Announcements
- Flight Training
- Events
- News
- Pilot Training and Certification
- Aviation Safety
- Aviation Technology
- Aircraft
- Financing
- Pilot Resources
- Pilot Career Guides
- Career Change
- Private Pilot
- Instrument Rating
- Commercial Pilot
- Multi-Engine Rating
- Certified Flight Instructor
- Certified Flight Instructor Instruments
- Multi-Engine Instructor
- Accelerated CFI Course
- Community
- Experiences

If no category is obvious, use the closest allowed category from the brand guide, topic plan, or existing repo convention. Do not invent categories.

## Field Rules

- `title`: final post title.
- `description`: meta description.
- `author`: prefer explicit author context, then the brand guide Author Voice And Byline Strategy, then existing repo author conventions.
- `authorImage`: prefer explicit author context, then the brand guide Author Voice And Byline Strategy, then reuse an existing valid author image path when required by the live schema.
- `tags`: use keyword and topic labels as a YAML array.
- `categories`: use an allowed category array.
- `keywords`: use a comma-separated string when the repo convention uses it.
- `readingTime`: estimate from final body word count and round to a whole number.
- `pubDate`: publication date as `YYYY-MM-DD`.
- `updDate`: same as `pubDate` for new posts unless the user provides a different update date.
- `heroImage`: include only when a valid repo image path is available, and choose a path that has not already been used as another blog post's `heroImage`.

If a required field cannot be filled from the brand guide, prompt, topic plan, or existing repo conventions, ask before writing the final file.

## Body Figure Image Rules

Use these rules for images inside the Markdown body.

- Every final blog post body must include at least 3 image figures.
- Every body image must use raw HTML `<figure>` with an `<img>` and `<figcaption>`. Do not use Markdown image syntax for body images.
- Body images are rendered by the browser from public URLs. Use files that exist under the repo's `public` folder.
- Write the body image `src` as the public URL path, without the `public` prefix. Example: `public/blog/example.jpg` becomes `/blog/example.jpg`.
- Use images inside a subfolder of `public`, such as `public/blog/example.jpg`; do not reference files directly in the `public` root.
- Never use `/src/assets/...`, `src/assets/...`, `../assets/...`, or imported asset paths inside a body `<figure>` or Markdown body image.
- Before writing the final file, verify every body image path resolves to an existing file under `public`. For `/blog/example.jpg`, check `public/blog/example.jpg`.
- If the desired image only exists under `src/assets`, copy it into an appropriate `public` subfolder before referencing it in the body, or choose a different existing `public` image.
- Keep `alt` text specific to what the image shows and relevant to the section.
- Every `<figcaption>` must end with `(Source: {COMPANY_NAME} media archive)`, replacing `{COMPANY_NAME}` with the exact client company name from the brand guide or repo context.
- Before delivery, run `node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/validate-blog-body-images.mjs <post.md> --company "<Company Name>" --fix` from the target repo root, then run the same command without `--fix`. Do not deliver the post while this validator fails.

Frontmatter images may follow the repo's existing content schema and component conventions. This body-image rule is specifically for images embedded in the Markdown body.

## Hero Image Reuse Rule

When the live schema includes `heroImage`, choose an image path that is valid for the repo and not already used in another blog post's frontmatter. Inspect existing `.md` and `.mdx` posts in the resolved blog content folder before writing. If every suitable image has already been used, ask for another image or document the blocker instead of reusing one silently.

## Body External Link Rules

Use these rules for external links inside the Markdown body.

- External body links with `href` values that start with `http` or `https` must use raw HTML `<a>` tags.
- Every external body `<a>` link must include `target="_blank"` so it opens in a new tab.
- Every external body `<a>` link must include `rel="noopener noreferrer"`.
- Do not use Markdown link syntax for external body links.
- Internal links may continue to use the target repo's existing Markdown or HTML convention.
- Before delivery, run `node .agents/right-rudder-marketing/skills/rrm-blog-copywriter/scripts/validate-blog-body-images.mjs <post.md> --company "<Company Name>" --fix` from the target repo root, then run the same command without `--fix`. Do not deliver the post while this validator fails.
