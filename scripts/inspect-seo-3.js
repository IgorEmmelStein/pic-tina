import fs from "fs";
import path from "path";
import { glob } from "glob";
import * as cheerio from "cheerio";

const DIST_DIR = path.resolve("dist");

const OUTPUT_JSON = "./reports/seo-report.json";
const OUTPUT_CSV = "./reports/seo-report.csv";
const OUTPUT_KEYWORD_CSV = "./reports/keyword-report.csv";

const META_MIN = 50;
const META_MAX = 160;
const H_MIN = 20;
const H_MAX = 70;

const KEYWORDS = [
  "pilot",
  "flight school",
  "pilot training",
  "private pilot",
  "commercial pilot",
];

const files = await glob(`${DIST_DIR}/**/*.html`);

const results = files.map((file) => {
  const html = fs.readFileSync(file, "utf-8");
  const $ = cheerio.load(html);

  /* -------- Page path -------- */
  const page =
    "/" +
    path
      .relative(DIST_DIR, file)
      .replace(/index\.html$/, "")
      .replace(/\\/g, "/");

  /* -------- Meta -------- */
  const title = $("title").text().trim();
  const metaDescriptions = $('meta[name="description"]');

  const metaDescriptionCount = metaDescriptions.length;
  const description = metaDescriptions.first().attr("content")?.trim() || "";
  const metaDescriptionLength = description.length;

  /* -------- Headers -------- */

  const h1s = $("h1");
  const h2s = $("h2");

  const h1Text = h1s.first().text().trim();
  const h1Length = h1Text.length;

  const h2Texts = h2s.map((_, el) => $(el).text().trim()).get();

  const invalidH2Lengths = h2Texts.filter(
    (h) => h.length < H_MIN || h.length > H_MAX,
  );

  /* -------- Heading order -------- */

  const headingLevels = $(":header")
    .map((_, el) => Number(el.tagName.substring(1)))
    .get();

  let hasInvalidHeadingOrder = false;

  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] - headingLevels[i - 1] > 1) {
      hasInvalidHeadingOrder = true;
      break;
    }
  }

  /* -------- Page Text / Words Count -------- */

  $("script, style, noscript").remove();

  const pageText = $("body").text().replace(/\s+/g, " ").toLowerCase();

  const words = pageText.match(/\b[a-z]+\b/g) || [];
  const keywordFrequency = {};
  const wordFrequency = {};

  const STOP_WORDS = new Set([
    "the",
    "and",
    "a",
    "an",
    "of",
    "to",
    "in",
    "for",
    "on",
    "at",
    "by",
    "with",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "this",
    "that",
    "these",
    "those",
    "it",
    "its",
    "as",
    "from",
    "or",
    "but",
    "about",
    "into",
    "over",
    "after",
  ]);

  words.forEach((word) => {
    keywordFrequency[word] = (keywordFrequency[word] || 0) + 1;
  });

  words.forEach((word) => {
    if (STOP_WORDS.has(word)) return;

    if (word.length < 3) return;

    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  /* -------- Keyword Metrics -------- */

  const keywordMetrics = {};

  KEYWORDS.forEach((keyword) => {
    const regex = new RegExp(keyword, "gi");

    const matches = pageText.match(regex);

    const count = matches ? matches.length : 0;

    const density = words.length ? (count / words.length) * 100 : 0;

    keywordMetrics[keyword] = {
      count,
      density: Number(density.toFixed(2)),
      inTitle: title.toLowerCase().includes(keyword),
      inH1: h1Text.toLowerCase().includes(keyword),
      inH2: h2Texts.some((h) => h.toLowerCase().includes(keyword)),
    };
  });

  return {
    page,

    /* -------- Word Data -------- */

    totalWords: words.length,
    wordFrequency,
    keywordFrequency,

    keywordMetrics,

    /* -------- Meta -------- */

    title,
    description,

    hasTitle: Boolean(title),

    metaDescription: description,

    metaDescriptionCount,

    hasMetaDescription: metaDescriptionCount > 0,

    hasSingleMetaDescription: metaDescriptionCount === 1,

    metaDescriptionLength,

    metaDescriptionValidLength:
      metaDescriptionLength >= META_MIN && metaDescriptionLength <= META_MAX,

    /* -------- Headers -------- */

    h1: h1Text,

    h1Count: h1s.length,

    hasH1: h1s.length > 0,

    hasSingleH1: h1s.length === 1,

    h1ValidLength: h1Length >= H_MIN && h1Length <= H_MAX,

    h2Count: h2s.length,

    hasH2: h2s.length > 0,

    invalidH2Lengths,

    hasInvalidHeadingOrder,
  };
});

/* -------- Global Word Frequency -------- */

const globalWordFrequency = {};

results.forEach((page) => {
  Object.entries(page.wordFrequency).forEach(([word, count]) => {
    globalWordFrequency[word] = (globalWordFrequency[word] || 0) + count;
  });
});

const topWords = Object.entries(globalWordFrequency)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 50);

/* -------- Global Keyword Metrics -------- */

const globalKeywordStats = {};

KEYWORDS.forEach((keyword) => {
  globalKeywordStats[keyword] = {
    totalCount: 0,
    pagesWithKeyword: 0,
  };
});

results.forEach((page) => {
  KEYWORDS.forEach((keyword) => {
    const count = page.keywordMetrics[keyword].count;

    globalKeywordStats[keyword].totalCount += count;

    if (count > 0) {
      globalKeywordStats[keyword].pagesWithKeyword += 1;
    }
  });
});

const topPageWords = Object.entries(wordFrequency)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

/* -------- Summary -------- */

const summary = {
  totalPages: results.length,

  missingTitle: results.filter((r) => !r.hasTitle).length,

  missingMetaDescription: results.filter((r) => !r.hasMetaDescription).length,

  multipleMetaDescriptions: results.filter((r) => !r.hasSingleMetaDescription)
    .length,

  invalidMetaDescriptionLength: results.filter(
    (r) => r.hasMetaDescription && !r.metaDescriptionValidLength,
  ).length,

  missingH1: results.filter((r) => !r.hasH1).length,

  multipleH1: results.filter((r) => !r.hasSingleH1).length,

  invalidH1Length: results.filter((r) => r.hasH1 && !r.h1ValidLength).length,

  missingH2: results.filter((r) => !r.hasH2).length,

  invalidHeadingOrder: results.filter((r) => r.hasInvalidHeadingOrder).length,
};

/* -------- Console Summary -------- */

console.log("\n📊 SEO SUMMARY");
console.log("==============");

Object.entries(summary).forEach(([key, value]) =>
  console.log(`${key.padEnd(30)} ${value}`),
);

/* -------- Save JSON -------- */

fs.writeFileSync(
  OUTPUT_JSON,
  JSON.stringify(
    {
      summary,
      globalKeywordStats,
      topWords,
      pages: results,
    },
    null,
    2,
  ),
  "utf-8",
);

/* -------- Page SEO CSV -------- */

const csvHeader = [
  "page",
  "title",
  "description",
  "metaDescriptionLength",
  "metaDescriptionCount",
  "h1Count",
  "h2Count",
  "totalWords",
  "hasInvalidHeadingOrder",
].join(",");

const csvRows = results
  .map((r) =>
    [
      r.page,
      r.title,
      r.description,
      r.metaDescriptionLength,
      r.metaDescriptionCount,
      r.h1Count,
      r.h2Count,
      r.totalWords,
      r.hasInvalidHeadingOrder,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(","),
  )
  .join("\n");

fs.writeFileSync(OUTPUT_CSV, csvHeader + "\n" + csvRows, "utf-8");

/* -------- Keyword Chart CSV -------- */

const keywordHeader = [
  "page",
  "keyword",
  "count",
  "density",
  "inTitle",
  "inH1",
  "inH2",
].join(",");

const keywordRows = [];

results.forEach((page) => {
  Object.entries(page.keywordMetrics).forEach(([keyword, metrics]) => {
    keywordRows.push(
      [
        page.page,
        keyword,
        metrics.count,
        metrics.density,
        metrics.inTitle,
        metrics.inH1,
        metrics.inH2,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
  });
});

fs.writeFileSync(
  OUTPUT_KEYWORD_CSV,
  keywordHeader + "\n" + keywordRows.join("\n"),
  "utf-8",
);

console.log("\n✅ Reports saved:");
console.log(`- ${OUTPUT_JSON}`);
console.log(`- ${OUTPUT_CSV}`);
console.log(`- ${OUTPUT_KEYWORD_CSV}`);
