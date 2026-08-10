import fs from "fs";
import type { SEOReport } from "./config.js";
import { OUTPUT_JSON, OUTPUT_CSV } from "./config.js";

export function saveJSON(report: SEOReport) {
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(report, null, 2), "utf-8");
}

export function saveCSV(report: SEOReport) {
  const header = ["page", "title", "description", "h1"].join(",");

  const rows = report.pages
    .map((r) =>
      [r.page, r.title, r.description, r.h1]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");

  fs.writeFileSync(OUTPUT_CSV, header + "\n" + rows, "utf-8");
}
