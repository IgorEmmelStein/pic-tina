import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function fail(message) {
  console.error(message);
  process.exit(2);
}

function parseArgs(values) {
  const options = {
    file: "",
  };

  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];

    if (value === "--file") {
      options.file = values[i + 1] || "";
      i += 1;
    } else if (!options.file) {
      options.file = value;
    }
  }

  return options;
}

function splitMarkdown(content) {
  if (!content.startsWith("---")) {
    return { head: "", body: content };
  }

  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);

  if (!match) {
    return { head: "", body: content };
  }

  return {
    head: match[0],
    body: content.slice(match[0].length),
  };
}

function cleanText(value) {
  return value
    .replace(/<figure\b[\s\S]*?<\/figure>/gi, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(value) {
  const words = cleanText(value).match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?/g);
  return words ? words.length : 0;
}

function countPhrase(value, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`\\b${escaped}\\b`, "gi");
  const matches = value.match(pattern);
  return matches ? matches.length : 0;
}

function getOpening(body) {
  const firstH2 = body.search(/^##\s+/m);
  const opening = firstH2 >= 0 ? body.slice(0, firstH2) : body;
  const words = cleanText(opening).split(/\s+/).filter(Boolean);
  return words.slice(0, 280).join(" ");
}

function getH2Sections(body) {
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : body.length;

    return {
      title: match[1].trim(),
      line: body.slice(0, match.index).split(/\r?\n/).length,
      body: body.slice(start, end),
    };
  });
}

function getLinks(value) {
  const markdownLinks = [...value.matchAll(/\[[^\]\n]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map((match) => match[1]);
  const htmlLinks = [...value.matchAll(/<a\b[^>]*href\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi)].map((match) => match[2] || match[3] || match[4] || "");
  return [...markdownLinks, ...htmlLinks].filter(Boolean);
}

function lineNumberAt(value, index) {
  return value.slice(0, index).split(/\r?\n/).length;
}

function excerpt(value, index, length) {
  return cleanText(value.slice(index, index + length)).slice(0, 140);
}

function checkOpening(body, issues) {
  const opening = getOpening(body);
  const hasReader = /\b(you|your|you're|you'll|you've)\b/i.test(opening);
  const hasAviationMoment = /\b(cockpit|runway|ramp|hangar|headset|radio|tower|preflight|takeoff|landing|simulator|controls|aircraft|airplane|flight deck|airport|checkride|instructor|logbook|crosswind|traffic)\b/i.test(opening);
  const hasStake = /\b(cost|time|schedule|confidence|fear|ready|choose|decision|compare|career|safety|training|goal|finish|start|learn|mistake|risk|progress|commit)\b/i.test(opening);

  if (wordCount(opening) < 45) {
    issues.push("Opening is too thin to build reader stakes before the first H2.");
  }

  if (!hasReader) {
    issues.push("Opening should address the reader directly with you/your language.");
  }

  if (!hasAviationMoment && !hasStake) {
    issues.push("Opening needs a concrete aviation situation, reader stake, or clear decision risk.");
  }
}

function checkCompanyVoicePosture(prose, issues) {
  const words = Math.max(wordCount(prose), 1);
  const companyVoiceCount = (prose.match(/\b(we|our|ours|us)\b/gi) || []).length;
  const readerVoiceCount = (prose.match(/\b(you|your|you're|you'll|you've)\b/gi) || []).length;

  if (words >= 650 && companyVoiceCount === 0) {
    issues.push("Post never uses we/our/us. A company blog should not read like a third-party reviewer wrote it.");
  }

  if (companyVoiceCount > 0 && readerVoiceCount > 0 && companyVoiceCount > readerVoiceCount) {
    issues.push(`Company voice is heavier than reader voice: ${companyVoiceCount} we/our/us uses vs ${readerVoiceCount} you/your uses.`);
  }
}

function checkHeadings(body, issues, lineOffset) {
  const h2s = getH2Sections(body);
  const badHeadings = new Set([
    "overview",
    "summary",
    "introduction",
    "conclusion",
    "final thoughts",
    "what this means",
    "what this means in plain english",
    "what this shows",
    "what the episode shows",
    "what this episode shows",
    "what the report shows",
    "what you need to know",
    "what to know",
  ]);
  const badHeadingStarts = [
    "what this means",
    "what the episode shows",
    "what this episode shows",
    "what this episode should",
    "what this post",
    "what this guide",
    "what this article",
  ];

  for (const section of h2s) {
    const title = normalize(section.title);

    if (/^(faq|frequently asked questions)$/.test(title)) {
      continue;
    }

    if (badHeadings.has(title) || badHeadingStarts.some((start) => title.startsWith(start))) {
      issues.push(`Line ${section.line + lineOffset}: H2 "${section.title}" is a label, not an editorial promise.`);
    }
  }
}

function checkRepeatedPhrases(prose, issues) {
  const rules = [
    ["that matters", 1],
    ["for you", 2],
    ["in plain english", 1],
    ["the key point", 1],
    ["this means", 2],
    ["it does not mean", 1],
    ["that does not mean", 1],
    ["the point is different", 0],
    ["the right question", 1],
  ];

  for (const [phrase, max] of rules) {
    const count = countPhrase(prose, phrase);

    if (count > max) {
      issues.push(`Repeated robotic phrase "${phrase}" appears ${count} times; maximum is ${max}.`);
    }
  }
}

function checkSourceReportTexture(prose, issues) {
  const rules = [
    ["according to", 2],
    ["the episode", 2],
    ["the visit", 2],
    ["the report", 0],
    ["official sources", 0],
    ["official source", 0],
    ["materials", 1],
    ["source material", 0],
    ["source context", 0],
    ["repo", 0],
    ["the page shows", 0],
    ["page lists", 0],
    ["page says", 0],
    ["our website says", 0],
    ["our website shows", 0],
    ["our website lists", 0],
    ["our site says", 0],
    ["our site shows", 0],
    ["our site lists", 0],
    ["the current page shows", 0],
    ["the episode notes", 0],
    ["the visit shows", 1],
    ["the episode shows", 1],
  ];

  let total = 0;

  for (const [phrase, max] of rules) {
    const count = countPhrase(prose, phrase);
    total += count;

    if (count > max) {
      issues.push(`Source-report phrase "${phrase}" appears ${count} times; maximum is ${max}.`);
    }
  }

  if (total > 5) {
    issues.push(`Source-report texture is too heavy with ${total} source-report phrases; maximum is 5.`);
  }
}

function checkOutsideReviewerVoice(body, issues, lineOffset) {
  const emitted = new Set();
  const addIssue = (line, label, text) => {
    const key = `${line}:${label}:${text}`;
    if (!emitted.has(key)) {
      emitted.add(key);
      issues.push(`Line ${line}: ${label}: "${text}"`);
    }
  };
  const rules = [
    {
      pattern: /\bis listed in (?:the )?repo\b/gi,
      label: "raw repo/source wording leaked into final copy",
    },
    {
      pattern: /\bthe current [^.\n]{0,80}\bpage shows\b/gi,
      label: "current-page audit wording should become company voice",
    },
    {
      pattern: /\bour [^.\n]{0,80}\bpage (?:lists|shows|says)\b/gi,
      label: "our-page source wording should become direct company offer language",
    },
    {
      pattern: /\bour (?:website|site) (?:lists|shows|says)\b/gi,
      label: "website source wording should become direct company offer language",
    },
    {
      pattern: /\b(?:exact|current) [^.\n]{0,90}\bshould be confirmed\b/gi,
      label: "confirmation caveat should be omitted, generalized, or moved into a contact-us sentence",
    },
    {
      pattern: /\bshould be confirmed before\b/gi,
      label: "source-audit confirmation phrasing should not appear in the final post",
    },
    {
      pattern: /\b[Aa]sk\s+(?:[A-Z][A-Za-z0-9&'.-]*(?:\s+[A-Z][A-Za-z0-9&'.-]*){1,7}|the school|the company|your flight school)\s+(?:how|if|whether|about|what|when|where)\b/g,
      label: "outside-reviewer ask-the-company phrasing should become contact-us/company voice",
    },
    {
      pattern: /\b[Aa]sk which school\b/g,
      label: "outside-reviewer school-comparison phrasing should become a direct company recommendation",
    },
    {
      pattern: /\bif you are comparing schools,\s*ask\b/gi,
      label: "comparison-guide phrasing should become a direct company recommendation",
    },
    {
      pattern: /\ba good answer should\b/gi,
      label: "outside-evaluator phrasing should become direct guidance",
    },
    {
      pattern: /\blook for a plan that\b/gi,
      label: "generic buyer-guide phrasing should become a company-specific mechanism",
    },
    {
      pattern: /\bthe episode notes describe\b/gi,
      label: "episode-notes sourcing should be translated into narrative copy",
    },
    {
      pattern: /\bthe reason the story belongs here\b/gi,
      label: "editorial scaffolding should be removed from final copy",
    },
    {
      pattern: /\bno single (?:visit|episode|article|post) can prove\b/gi,
      label: "blanket anti-claim caveat should become a precise, useful limit",
    },
    {
      pattern: /\bthat is not a promise\b/gi,
      label: "legalistic anti-promise phrasing should become a precise limitation",
    },
    {
      pattern: /\bnot a default path\b/gi,
      label: "blanket disclaimer phrasing should become a plain next-step explanation",
    },
    {
      pattern: /\bdo not assume\b/gi,
      label: "scolding caveat should become direct company guidance",
    },
  ];

  for (const rule of rules) {
    for (const match of body.matchAll(rule.pattern)) {
      addIssue(lineNumberAt(body, match.index) + lineOffset, rule.label, excerpt(body, match.index, match[0].length + 90));
    }
  }

  const lineRules = [
    {
      pattern: /\bthe current .{0,90}\bpage (?:shows|lists|says)\b/i,
      label: "current-page audit wording should become company voice",
    },
    {
      pattern: /\bthe (?!current\b).{0,90}\bpage (?:shows|lists|says)\b/i,
      label: "page-summary wording should become direct company offer language",
    },
    {
      pattern: /\bour (?:website|site) (?:shows|lists|says)\b/i,
      label: "website source wording should become direct company offer language",
    },
  ];

  const lines = body.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const cleanLine = cleanText(lines[i]);
    const normalizedLine = normalize(lines[i]);
    for (const rule of lineRules) {
      if (rule.pattern.test(normalizedLine)) {
        addIssue(i + 1 + lineOffset, rule.label, cleanLine.slice(0, 140));
      }
    }
  }

  const tableHeader = body.match(/^\|.*\bwhat to ask\b.*\|/im);
  if (tableHeader && typeof tableHeader.index === "number") {
    issues.push(`Line ${lineNumberAt(body, tableHeader.index) + lineOffset}: Table header "What to ask" reads like an outside evaluator; rewrite as a company-voice planning or decision column.`);
  }
}

function checkHedging(prose, issues) {
  const words = Math.max(wordCount(prose), 1);
  const hedgeRules = [
    "may",
    "might",
    "could",
    "depends",
    "varies",
    "unless",
    "does not guarantee",
    "do not guarantee",
    "not guaranteed",
    "ask whether",
    "ask how",
    "ask if",
    "should ask",
    "should confirm",
    "should be confirmed",
    "should first",
    "needs confirmation",
    "when available",
    "if applicable",
    "before using",
    "do not assume",
    "not automatically",
    "not a promise",
    "not a default path",
  ];

  const total = hedgeRules.reduce((sum, phrase) => sum + countPhrase(prose, phrase), 0);
  const perThousand = (total / words) * 1000;

  if (total > 18 || perThousand > 11) {
    issues.push(`Over-hedging density is too high: ${total} hedge phrases across ${words} words (${perThousand.toFixed(1)} per 1,000 words).`);
  }
}

function checkFinalCta(body, issues) {
  const h2s = getH2Sections(body);

  if (h2s.length === 0) {
    issues.push("Post needs a final H2 CTA section with one primary next step.");
    return;
  }

  const finalSection = h2s[h2s.length - 1];
  const finalTitle = normalize(finalSection.title);

  if (/^(faq|frequently asked questions)$/.test(finalTitle)) {
    issues.push("Post ends with FAQ instead of a final CTA section.");
    return;
  }

  const finalText = cleanText(finalSection.body);
  const hasAction = /\b(book|schedule|start|enroll|contact|visit|call|download|apply|request|talk|choose|begin|take the next step|get started|discovery flight|consultation)\b/i.test(finalText);

  if (wordCount(finalText) < 35 || !hasAction) {
    issues.push("Final section needs a clear CTA tied to one primary next step.");
  }

  const ctaLinks = getLinks(finalSection.body).filter((href) => /discovery|enroll|contact|apply|book|schedule|financing|program|course|request|start|consult/i.test(href));

  if (ctaLinks.length > 1) {
    issues.push(`Final CTA has ${ctaLinks.length} competing action links; use one primary next step.`);
  }
}

const options = parseArgs(args);

if (!options.file) {
  fail("Usage: node lint-blog-human-voice.mjs <post.md>");
}

const filePath = path.resolve(options.file);

if (!fs.existsSync(filePath)) {
  fail(`File not found: ${filePath}`);
}

const content = fs.readFileSync(filePath, "utf8");
const { head, body } = splitMarkdown(content);
const prose = cleanText(body).toLowerCase();
const lineOffset = head ? head.split(/\r?\n/).length - 1 : 0;
const issues = [];

checkOpening(body, issues);
checkCompanyVoicePosture(prose, issues);
checkHeadings(body, issues, lineOffset);
checkRepeatedPhrases(prose, issues);
checkSourceReportTexture(prose, issues);
checkOutsideReviewerVoice(body, issues, lineOffset);
checkHedging(prose, issues);
checkFinalCta(body, issues);

if (issues.length > 0) {
  console.error(`Human voice lint failed for ${path.relative(process.cwd(), filePath)}.`);

  for (const issue of issues) {
    console.error(`- ${issue}`);
  }

  process.exit(1);
}

console.log(`Human voice lint passed for ${path.relative(process.cwd(), filePath)}.`);
