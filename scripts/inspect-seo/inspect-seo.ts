import { getHtmlFiles } from "./config.js";
import { analyzePage } from "./pageAnalyzer.js";
import { generateSummary } from "./summary.js";
import { saveCSV, saveJSON } from "./reportWriter.js";

async function run() {
  const files = await getHtmlFiles();

  const results = files.map(analyzePage);

  const summary = generateSummary(results);

  const report = {
    summary,
    pages: results,
  };

  console.log("\n📊 SEO SUMMARY");
  console.log("==============");

  Object.entries(summary).forEach(([key, value]) =>
    console.log(`${key.padEnd(30)} ${value}`),
  );

  saveJSON(report);
  saveCSV(report);

  console.log("\n✅ Reports generated");
}

run();
