import fs from "fs";
import path from "path";
import { glob } from "glob";
import * as cheerio from "cheerio";
/*
 -------- Setup -------- 
  ## Installation
  ```
      npm install --save-dev cheerio glob
  ```

  ## Execution
  ``` 
    node scripts/inspect-seo.js
  ```
*/

const DIST_DIR = path.resolve("dist");
const OUTPUT_JSON = "./reports/seo-report.json";
const OUTPUT_CSV = "./reports/seo-report.csv";

const files = await glob(`${DIST_DIR}/**/*.html`);

const results = files.map((file) => {
  const html = fs.readFileSync(file, "utf-8");
  const $ = cheerio.load(html);

  const title = $("title").text().trim();
  const description =
    $('meta[name="description"]').attr("content")?.trim() || "";
  const keywords = $('meta[name="keywords"]').attr("content")?.trim() || "";
  const h1 = $("h1").first().text().trim();
  const multipleH1 = $("h1").length > 1;

  const page =
    "/" +
    path
      .relative(DIST_DIR, file)
      .replace(/index\.html$/, "")
      .replace(/\\/g, "/");

  return {
    page,
    title,
    description,
    keywords,
    h1,
    hasTitle: Boolean(title),
    hasDescription: Boolean(description),
    hasKeywords: Boolean(keywords),
    hasH1: Boolean(h1),
    hasMultipleH1: multipleH1,
  };
});

/* -------- Summary Report -------- */
const summary = {
  totalPages: results.length,
  missingTitle: results.filter((r) => !r.hasTitle).length,
  missingDescription: results.filter((r) => !r.hasDescription).length,
  missingKeywords: results.filter((r) => !r.hasKeywords).length,
  missingH1: results.filter((r) => !r.hasH1).length,
  multipleH1: results.filter((r) => r.hasMultipleH1).length,
};

console.log("\n📊 SEO SUMMARY");
console.log("==============");
console.log(`Total pages:           ${summary.totalPages}`);
console.log(`Missing <title>:       ${summary.missingTitle}`);
console.log(`Missing description:   ${summary.missingDescription}`);
console.log(`Missing keywords:      ${summary.missingKeywords}`);
console.log(`Missing <h1>:          ${summary.missingH1}`);
console.log(`Multiple <h1>:         ${summary.multipleH1}`);

/* -------- Console table -------- */
console.log("\n📄 PAGE DETAILS");
console.table(
  results.map(({ page, title, description, keywords, h1 }) => ({
    page,
    title,
    description,
    keywords,
    h1,
  })),
);

/* -------- Save JSON -------- */
fs.writeFileSync(
  OUTPUT_JSON,
  JSON.stringify({ summary, pages: results }, null, 2),
  "utf-8",
);

/* -------- Save CSV -------- */
const csvHeader = "page,title,description,keywords,h1\n";
const csvRows = results
  .map(({ page, title, description, keywords, h1 }) =>
    [page, title, description, keywords, h1]
      .map((v) => `"${(v || "").replace(/"/g, '""')}"`)
      .join(","),
  )
  .join("\n");

fs.writeFileSync(OUTPUT_CSV, csvHeader + csvRows, "utf-8");

console.log(`\n✅ Reports saved:`);
console.log(`- ${OUTPUT_JSON}`);
console.log(`- ${OUTPUT_CSV}`);
