import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function parseArgs(values) {
  const result = {
    file: "",
    company: "",
    repoRoot: process.cwd(),
    blogDir: "",
    fix: false,
  };

  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];

    if (value === "--fix") {
      result.fix = true;
    } else if (value === "--company") {
      result.company = values[i + 1] || "";
      i += 1;
    } else if (value === "--repo-root") {
      result.repoRoot = values[i + 1] || result.repoRoot;
      i += 1;
    } else if (value === "--blog-dir") {
      result.blogDir = values[i + 1] || "";
      i += 1;
    } else if (value === "--file") {
      result.file = values[i + 1] || "";
      i += 1;
    } else if (!result.file) {
      result.file = value;
    }
  }

  return result;
}

function fail(message) {
  console.error(message);
  process.exit(2);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

function frontmatterBody(head) {
  if (!head) {
    return "";
  }

  return head.replace(/^---\r?\n/, "").replace(/\r?\n---\r?\n?$/, "");
}

function getFrontmatterStringField(head, fieldName) {
  const frontmatter = frontmatterBody(head);
  const pattern = new RegExp(`^${fieldName}\\s*:\\s*(.*)$`, "im");
  const match = frontmatter.match(pattern);

  if (!match) {
    return "";
  }

  return match[1].trim().replace(/^['"]|['"]$/g, "").trim();
}

function titleFromPath(src) {
  const cleanSrc = src.split(/[?#]/)[0];
  const basename = path.basename(cleanSrc, path.extname(cleanSrc));
  const words = basename.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return words || "Training image";
}

function getAttribute(value, name) {
  const pattern = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");
  const match = value.match(pattern);
  return match ? match[2] || match[3] || match[4] || "" : "";
}

function setAttribute(value, name, nextValue) {
  const safeValue = escapeHtml(nextValue);
  const pattern = new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");

  if (pattern.test(value)) {
    return value.replace(pattern, ` ${name}="${safeValue}"`);
  }

  return value.replace(/>$/, ` ${name}="${safeValue}">`);
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function isExternalUrl(value) {
  return /^https?:\/\//i.test(value);
}

function htmlLinkFromMarkdown(label, href) {
  return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

function relHasSafeNewTabTokens(value) {
  const tokens = value.toLowerCase().split(/\s+/).filter(Boolean);
  return tokens.includes("noopener") && tokens.includes("noreferrer");
}

function expectedCaption(text, company) {
  const suffix = `(Source: ${company} media archive)`;
  const cleanText = stripTags(text).replace(/\s*\(Source:\s*[^)]*media archive\)\s*$/i, "").trim();
  return `${cleanText || "Training image"} ${suffix}`;
}

function figureFromImage(src, alt, company) {
  const safeSrc = escapeHtml(src);
  const safeAlt = escapeHtml(alt || titleFromPath(src));
  const caption = escapeHtml(expectedCaption(alt || titleFromPath(src), company));
  return `<figure>
  <img src="${safeSrc}" alt="${safeAlt}" />
  <figcaption>${caption}</figcaption>
</figure>`;
}

function isInsideFigure(body, index) {
  const before = body.slice(0, index).toLowerCase();
  return before.lastIndexOf("<figure") > before.lastIndexOf("</figure>");
}

function fixBody(body, company) {
  const fixes = [];
  let nextBody = body.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, alt, src) => {
    fixes.push(`Converted Markdown image ${src} to <figure>.`);
    return figureFromImage(src, alt, company);
  });

  nextBody = nextBody.replace(/<img\b[^>]*>/gi, (match, offset) => {
    if (isInsideFigure(nextBody, offset)) {
      return match;
    }

    const src = getAttribute(match, "src");
    const alt = getAttribute(match, "alt") || titleFromPath(src);

    if (!src) {
      return match;
    }

    fixes.push(`Wrapped loose image ${src} in <figure>.`);
    return figureFromImage(src, alt, company);
  });

  nextBody = nextBody.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, (figure) => {
    const imageMatch = figure.match(/<img\b[^>]*>/i);

    if (!imageMatch) {
      return figure;
    }

    const src = getAttribute(imageMatch[0], "src");
    const alt = getAttribute(imageMatch[0], "alt") || titleFromPath(src);
    const captionMatch = figure.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);

    if (!captionMatch) {
      fixes.push(`Added figcaption for ${src}.`);
      return figure.replace(/<\/figure>/i, `  <figcaption>${escapeHtml(expectedCaption(alt, company))}</figcaption>\n</figure>`);
    }

    const wanted = expectedCaption(captionMatch[1], company);
    const current = stripTags(captionMatch[1]);

    if (current === wanted) {
      return figure;
    }

    fixes.push(`Normalized figcaption source for ${src}.`);
    return figure.replace(/<figcaption\b[^>]*>[\s\S]*?<\/figcaption>/i, `<figcaption>${escapeHtml(wanted)}</figcaption>`);
  });

  nextBody = nextBody.replace(/(^|[^!])\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)(?:\s+"[^"]*")?\)/gi, (match, prefix, label, href) => {
    fixes.push(`Converted external Markdown link ${href} to a new-tab <a> tag.`);
    return `${prefix}${htmlLinkFromMarkdown(label, href)}`;
  });

  nextBody = nextBody.replace(/<a\b[^>]*>/gi, (match) => {
    const href = getAttribute(match, "href");

    if (!isExternalUrl(href)) {
      return match;
    }

    let nextLink = match;

    if (getAttribute(nextLink, "target") !== "_blank") {
      nextLink = setAttribute(nextLink, "target", "_blank");
    }

    if (!relHasSafeNewTabTokens(getAttribute(nextLink, "rel"))) {
      nextLink = setAttribute(nextLink, "rel", "noopener noreferrer");
    }

    if (nextLink !== match) {
      fixes.push(`Normalized external link ${href} for new-tab behavior.`);
    }

    return nextLink;
  });

  return { body: nextBody, fixes };
}

function bodyLineNumber(body, index) {
  return body.slice(0, index).split(/\r?\n/).length;
}

function publicPathStatus(src, repoRoot) {
  const publicRoot = path.resolve(repoRoot, "public");
  const cleanSrc = src.split(/[?#]/)[0];

  if (!cleanSrc.startsWith("/") || cleanSrc.startsWith("//")) {
    return { ok: false, reason: "must start with one public URL slash, such as /blog/example.jpg" };
  }

  if (/\/?src\/assets\//i.test(cleanSrc) || /^\.\.?\//.test(cleanSrc)) {
    return { ok: false, reason: "must not reference src/assets, relative assets, or imported asset paths" };
  }

  const parts = cleanSrc.slice(1).split("/").filter(Boolean);

  if (parts.length < 2) {
    return { ok: false, reason: "must point to a file inside a public subfolder, such as /blog/example.jpg" };
  }

  const resolved = path.resolve(publicRoot, ...parts);

  if (!resolved.startsWith(`${publicRoot}${path.sep}`)) {
    return { ok: false, reason: "must stay inside the public folder" };
  }

  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    return { ok: false, reason: `must resolve to an existing file at ${path.relative(repoRoot, resolved)}` };
  }

  return { ok: true, reason: "" };
}

function validateBody(body, company, repoRoot) {
  const issues = [];
  const rawImages = [...body.matchAll(/<img\b[^>]*>/gi)];
  const markdownImages = [...body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)];
  const markdownExternalLinks = [...body.matchAll(/(^|[^!])\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)(?:\s+"[^"]*")?\)/gi)];
  const rawLinks = [...body.matchAll(/<a\b[^>]*>/gi)];
  const figureMatches = [...body.matchAll(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi)];
  const figureImages = [];
  const externalLinks = [];

  for (const match of figureMatches) {
    const figure = match[0];
    const imageMatch = figure.match(/<img\b[^>]*>/i);

    if (!imageMatch) {
      issues.push(`Line ${bodyLineNumber(body, match.index)}: <figure> is missing an <img>.`);
      continue;
    }

    const src = getAttribute(imageMatch[0], "src");
    const captionMatch = figure.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
    figureImages.push({ src, index: match.index });

    if (!captionMatch) {
      issues.push(`Line ${bodyLineNumber(body, match.index)}: <figure> with ${src || "missing src"} is missing <figcaption>.`);
    } else {
      const caption = stripTags(captionMatch[1]);
      const suffix = `(Source: ${company} media archive)`;

      if (!caption.endsWith(suffix)) {
        issues.push(`Line ${bodyLineNumber(body, match.index)}: figcaption for ${src || "missing src"} must end with ${suffix}.`);
      }
    }

    if (!src) {
      issues.push(`Line ${bodyLineNumber(body, match.index)}: figure image is missing src.`);
    } else {
      const pathStatus = publicPathStatus(src, repoRoot);

      if (!pathStatus.ok) {
        issues.push(`Line ${bodyLineNumber(body, match.index)}: ${src} ${pathStatus.reason}.`);
      }
    }
  }

  for (const match of rawImages) {
    if (!isInsideFigure(body, match.index)) {
      issues.push(`Line ${bodyLineNumber(body, match.index)}: <img> must be wrapped in <figure> with <figcaption>.`);
    }
  }

  for (const match of markdownImages) {
    issues.push(`Line ${bodyLineNumber(body, match.index)}: Markdown image ${match[2]} must be an HTML <figure> with <figcaption>.`);
  }

  for (const match of markdownExternalLinks) {
    const index = match.index + match[1].length;
    issues.push(`Line ${bodyLineNumber(body, index)}: External Markdown link ${match[3]} must be an HTML <a> tag with target="_blank" and rel="noopener noreferrer".`);
  }

  for (const match of rawLinks) {
    const href = getAttribute(match[0], "href");

    if (!isExternalUrl(href)) {
      continue;
    }

    externalLinks.push({ href, index: match.index });

    if (getAttribute(match[0], "target") !== "_blank") {
      issues.push(`Line ${bodyLineNumber(body, match.index)}: External link ${href} must include target="_blank".`);
    }

    if (!relHasSafeNewTabTokens(getAttribute(match[0], "rel"))) {
      issues.push(`Line ${bodyLineNumber(body, match.index)}: External link ${href} must include rel="noopener noreferrer".`);
    }
  }

  if (figureImages.length < 3) {
    issues.push(`Body content must include at least 3 figure images. Found ${figureImages.length}.`);
  }

  return {
    issues,
    figureCount: figureImages.length,
    externalLinkCount: externalLinks.length,
  };
}

function walkMarkdownFiles(dir) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return [];
  }

  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(entryPath));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

function findBlogDir(filePath, repoRoot, blogDirOption) {
  if (blogDirOption) {
    return path.resolve(blogDirOption);
  }

  const resolvedFilePath = path.resolve(filePath);
  const resolvedRepoRoot = path.resolve(repoRoot);
  const relativeParts = path.relative(resolvedRepoRoot, resolvedFilePath).split(path.sep);
  const blogIndex = relativeParts.findIndex((part) => part.toLowerCase() === "blog");

  if (blogIndex >= 0) {
    return path.resolve(resolvedRepoRoot, ...relativeParts.slice(0, blogIndex + 1));
  }

  return path.dirname(resolvedFilePath);
}

function validateHeroImage(head, filePath, repoRoot, blogDirOption) {
  const issues = [];
  const heroImage = getFrontmatterStringField(head, "heroImage");

  if (!heroImage) {
    return { issues, heroImage };
  }

  const blogDir = findBlogDir(filePath, repoRoot, blogDirOption);
  const markdownFiles = walkMarkdownFiles(blogDir);

  for (const otherFile of markdownFiles) {
    if (path.resolve(otherFile) === path.resolve(filePath)) {
      continue;
    }

    const otherContent = fs.readFileSync(otherFile, "utf8");
    const otherMarkdown = splitMarkdown(otherContent);
    const otherHeroImage = getFrontmatterStringField(otherMarkdown.head, "heroImage");

    if (otherHeroImage && otherHeroImage === heroImage) {
      issues.push(`heroImage ${heroImage} is already used by ${path.relative(blogDir, otherFile)}.`);
    }
  }

  return { issues, heroImage };
}

const options = parseArgs(args);

if (!options.file) {
  fail("Usage: node validate-blog-body-images.mjs <post.md> --company \"Company Name\" [--fix] [--repo-root <repo>] [--blog-dir <blog content folder>]");
}

if (!options.company) {
  fail("--company is required.");
}

const filePath = path.resolve(options.file);
const repoRoot = path.resolve(options.repoRoot);

if (!fs.existsSync(filePath)) {
  fail(`File not found: ${filePath}`);
}

const original = fs.readFileSync(filePath, "utf8");
const markdown = splitMarkdown(original);
let body = markdown.body;
let fixes = [];

if (options.fix) {
  const fixed = fixBody(body, options.company);
  body = fixed.body;
  fixes = fixed.fixes;

  if (body !== markdown.body) {
    fs.writeFileSync(filePath, `${markdown.head}${body}`);
  }
}

const result = validateBody(body, options.company, repoRoot);
const heroImageResult = validateHeroImage(markdown.head, filePath, repoRoot, options.blogDir);

if (fixes.length > 0) {
  for (const fix of fixes) {
    console.log(`Fixed: ${fix}`);
  }
}

const issues = [...result.issues, ...heroImageResult.issues];

if (issues.length > 0) {
  console.error(`Blog validation failed for ${path.relative(repoRoot, filePath)}.`);

  for (const issue of issues) {
    console.error(`- ${issue}`);
  }

  process.exit(1);
}

const heroImageMessage = heroImageResult.heroImage ? ` and unique heroImage ${heroImageResult.heroImage}` : "";
console.log(`Blog body validation passed for ${path.relative(repoRoot, filePath)} with ${result.figureCount} figure images, ${result.externalLinkCount} external links${heroImageMessage}.`);
