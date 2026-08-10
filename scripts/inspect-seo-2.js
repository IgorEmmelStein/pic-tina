import fs from "fs";
import path from "path";
import { glob } from "glob";
import * as cheerio from "cheerio";

const DIST_DIR = path.resolve("dist");
const OUTPUT_JSON = "./reports/seo-report.json";
const OUTPUT_CSV = "./reports/seo-report.csv";

/* -------- SEO Rules -------- */
const META_TITLE_MIN = 50;
const META_TITLE_MAX = 100;
const META_MIN = 50;
const META_MAX = 160;
const H_MIN = 20;
const H_MAX = 70;

/* -------- Helpers -------- */
const normalizeUrl = (url) => url.replace(/\/{2,}/g, "/");

const normalizePage = (p) =>
  p
    .replace(/\/index\.html$/, "/")
    .replace(/\.html$/, "/")
    .replace(/\/$/, "");

const parseLink = (href) => {
  const [fullUrl, hash] = href.split("#");
  const cleanUrl = fullUrl.split("?")[0];

  return {
    url: cleanUrl || "",
    hash: hash || null,
  };
};

const resolveRelativeUrl = (href, currentPage) => {
  if (href.startsWith("/") || href.startsWith("http")) return href;
  if (href.startsWith("#")) return href;

  const base = currentPage.endsWith("/") ? currentPage : currentPage + "/";
  return normalizeUrl(base + href);
};

const hasTrailingSlashIssue = (href) => {
  const { url } = parseLink(href);

  if (url === "/" || url === "") return false;
  if (path.extname(url)) return false;

  return !url.endsWith("/");
};

const fixTrailingSlash = (href) => {
  const { url, hash } = parseLink(href);
  if (url.endsWith("/")) return href;
  return url + "/" + (hash ? `#${hash}` : "");
};

const extractPathFromUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.pathname;
  } catch {
    return url;
  }
};

const isErrorPage = (page) =>
  page === "/404.html" ||
  page === "/404/" ||
  page === "/500.html" ||
  page === "/500/";

/* -------- Files -------- */
const files = await glob(`${DIST_DIR}/**/*.html`);

const results = await Promise.all(
  files.map(async (file) => {
    const html = fs.readFileSync(file, "utf-8");
    const $ = cheerio.load(html);

    /* -------- Page path -------- */
    const page =
      "/" +
      path
        .relative(DIST_DIR, file)
        .replace(/index\.html$/, "")
        .replace(/\\/g, "/");

    /* -------- Canonical -------- */
    const canonicalTag = $('link[rel="canonical"]');
    const canonicalHref = canonicalTag.attr("href")?.trim() || null;

    let canonicalPath = null;
    let hasCanonical = Boolean(canonicalHref);
    let canonicalMatches = true;
    let canonicalIssue = null;

    if (isErrorPage(page)) {
      canonicalMatches = true;
      canonicalIssue = null;
    } else if (!canonicalHref) {
      canonicalMatches = false;
      canonicalIssue = { type: "missing-canonical" };
    } else {
      canonicalPath = extractPathFromUrl(canonicalHref);

      const normalizedCanonical = normalizePage(canonicalPath);
      const normalizedPage = normalizePage(page);

      if (normalizedCanonical !== normalizedPage) {
        canonicalMatches = false;
        canonicalIssue = {
          expected: page,
          actual: canonicalPath,
        };
      }
    }

    /* -------- Links -------- */

    const allAnchors = $("a").toArray();

    const rawLinks = [];
    const missingHrefLinks = [];
    const externalLinkTargetIssues = [];
    const externalLinkRelIssues = [];

    for (const el of allAnchors) {
      const href = $(el).attr("href")?.trim();
      const target = $(el).attr("target");
      const rel = $(el).attr("rel");

      // ❗ Missing href
      if (!href) {
        missingHrefLinks.push({
          html: $.html(el),
        });
        continue;
      }

      if (
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        href === "#"
      ) {
        continue;
      }

      // ❗ External link checks
      if (href.startsWith("http")) {
        if (target !== "_blank") {
          externalLinkTargetIssues.push({
            href,
            issue: "missing-target-blank",
          });
        }

        if (target === "_blank") {
          if (
            !rel ||
            !rel.includes("noopener") ||
            !rel.includes("noreferrer")
          ) {
            externalLinkRelIssues.push({
              href,
              issue: "missing-rel-noopener-noreferrer",
            });
          }
        }
      }

      rawLinks.push(href);
    }

    /* --- Detect bad relative links BEFORE resolving --- */
    const relativeLinkIssues = rawLinks
      .filter(
        (href) =>
          !href.startsWith("/") &&
          !href.startsWith("http") &&
          !href.startsWith("#"),
      )
      .map((href) => ({
        href,
        resolved: resolveRelativeUrl(href, page),
      }));

    /* --- Resolve all links --- */
    const links = [
      ...new Set(
        rawLinks.map((l) => normalizeUrl(resolveRelativeUrl(l, page))),
      ),
    ];

    const internalLinks = links.filter((href) => href.startsWith("/"));
    const externalLinks = links.filter((href) => href.startsWith("http"));

    const hasAnchor = (hash) =>
      $(`[id="${hash}"]`).length > 0 || $(`[name="${hash}"]`).length > 0;

    const resolveFilePath = (url) => {
      const normalized = normalizeUrl(url);
      let targetPath = path.join(DIST_DIR, normalized);

      if (targetPath.endsWith(".html")) return targetPath;

      const withIndex = path.join(targetPath, "index.html");
      if (fs.existsSync(withIndex)) return withIndex;

      const withHtml = targetPath + ".html";
      if (fs.existsSync(withHtml)) return withHtml;

      return null;
    };

    const checkInternalLink = (href, currentPage) => {
      const { url, hash } = parseLink(href);
      const normalizedUrl = normalizeUrl(url);

      const isSamePage =
        normalizePage(normalizedUrl) === normalizePage(currentPage) ||
        normalizedUrl === "";

      if (isSamePage && hash) {
        if (!hasAnchor(hash)) {
          return { href, type: "missing-anchor" };
        }
        return null;
      }

      const targetFile = resolveFilePath(normalizedUrl);

      if (!targetFile) {
        return { href, type: "missing-page" };
      }

      if (hash) {
        try {
          const html = fs.readFileSync(targetFile, "utf-8");
          const $$ = cheerio.load(html);
          const targetExists =
            $$(`[id="${hash}"]`).length > 0 ||
            $$(`[name="${hash}"]`).length > 0;

          if (!targetExists) {
            return { href, type: "missing-anchor" };
          }
        } catch {
          return { href, type: "read-error" };
        }
      }

      return null;
    };

    /* -------- Internal link validation -------- */
    const brokenInternalLinks = [];
    const trailingSlashIssues = [];

    for (const href of internalLinks) {
      if (hasTrailingSlashIssue(href)) {
        trailingSlashIssues.push({
          href,
          expected: fixTrailingSlash(href),
        });
      }

      const result = checkInternalLink(href, page);
      if (result) brokenInternalLinks.push(result);
    }

    /* -------- External link validation -------- */
    const externalResults = await Promise.all(
      externalLinks.map(async (url) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        try {
          const res = await fetch(url, {
            method: "HEAD",
            signal: controller.signal,
          });

          clearTimeout(timeout);

          if (res.status === 403) return null;
          if (!res.ok) return { url, status: res.status };

          return null;
        } catch {
          return { url, error: "Request failed" };
        }
      }),
    );

    const brokenExternalLinks = externalResults.filter(Boolean);

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

    return {
      page,

      /* -------- Canonical -------- */
      canonical: canonicalHref,
      canonicalPath,
      hasCanonical,
      canonicalMatches,
      canonicalIssue,

      /* -------- Links -------- */
      links,
      internalLinksCount: internalLinks.length,
      externalLinksCount: externalLinks.length,
      brokenInternalLinks,
      brokenExternalLinks,
      trailingSlashIssues,
      relativeLinkIssues,

      missingHrefLinks,
      externalLinkTargetIssues,
      externalLinkRelIssues,

      hasMissingHrefLinks: missingHrefLinks.length > 0,
      hasExternalTargetIssues: externalLinkTargetIssues.length > 0,
      hasExternalRelIssues: externalLinkRelIssues.length > 0,

      hasTrailingSlashIssues: trailingSlashIssues.length > 0,
      hasRelativeLinkIssues: relativeLinkIssues.length > 0,
      hasInternalBrokenLinks: brokenInternalLinks.length > 0,
      hasExternalBrokenLinks: brokenExternalLinks.length > 0,
      hasBrokenLinks:
        brokenInternalLinks.length > 0 || brokenExternalLinks.length > 0,

      /* -------- Meta -------- */
      title,
      description,
      hasTitle: Boolean(title),
      metaDescription: description,
      metaDescriptionCount,
      hasMetaDescription: metaDescriptionCount > 0,
      hasSingleMetaDescription: metaDescriptionCount === 1,
      metaDescriptionLength,
      titleValidLength:
        title.length >= META_TITLE_MIN && title.length <= META_TITLE_MAX,
      metaDescriptionValidLength:
        metaDescriptionLength >= META_MIN && metaDescriptionLength <= META_MAX,

      /* -------- Headers -------- */
      h1: h1Text,
      h1Length,
      h1Count: h1s.length,
      hasH1: h1s.length > 0,
      hasSingleH1: h1s.length === 1,
      h1ValidLength: h1Length >= H_MIN && h1Length <= H_MAX,

      h2Count: h2s.length,
      hasH2: h2s.length > 0,
      invalidH2Lengths,

      hasInvalidHeadingOrder,
    };
  }),
);

/* -------- Summary -------- */
const summary = {
  totalPages: results.length,
  pagesWithInternalBrokenLinks: results.filter((r) => r.hasInternalBrokenLinks)
    .length,
  pagesWithExternalBrokenLinks: results.filter((r) => r.hasExternalBrokenLinks)
    .length,
  pagesWithTrailingSlashIssues: results.filter((r) => r.hasTrailingSlashIssues)
    .length,
  pagesWithRelativeLinkIssues: results.filter((r) => r.hasRelativeLinkIssues)
    .length,
  pagesWithCanonicalIssues: results.filter((r) => !r.canonicalMatches).length,

  pagesWithMissingHref: results.filter((r) => r.hasMissingHrefLinks).length,
  pagesWithExternalTargetIssues: results.filter(
    (r) => r.hasExternalTargetIssues,
  ).length,
  pagesWithExternalRelIssues: results.filter((r) => r.hasExternalRelIssues)
    .length,

  missingTitle: results.filter((r) => !r.hasTitle).length,
  invalidTitleLength: results.filter((r) => r.hasTitle && !r.titleValidLength)
    .length,

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

console.log("\n📊 SEO SUMMARY");
console.log("==============");
Object.entries(summary).forEach(([key, value]) =>
  console.log(`${key.padEnd(30)} ${value}`),
);

fs.writeFileSync(
  OUTPUT_JSON,
  JSON.stringify({ summary, pages: results }, null, 2),
  "utf-8",
);

console.log("\n✅ Reports saved:");
console.log(`- ${OUTPUT_JSON}`);
