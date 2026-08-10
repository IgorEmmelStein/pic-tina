import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import {
  DIST_DIR,
  META_TITLE_MIN,
  META_TITLE_MAX,
  META_MIN,
  META_MAX,
  H_MIN,
  H_MAX,
} from "./config.js";

import type { PageSEOResult } from "./config.js";

export function analyzePage(file: string): PageSEOResult {
  const html = fs.readFileSync(file, "utf-8");
  const $ = cheerio.load(html);

  const page =
    "/" +
    path
      .relative(DIST_DIR, file)
      .replace(/index\.html$/, "")
      .replace(/\\/g, "/");

  const title = $("title").text().trim();

  const metaDescriptions = $('meta[name="description"]');
  const description = metaDescriptions.first().attr("content")?.trim() || "";

  const h1s = $("h1");
  const h2s = $("h2");

  const h1Text = h1s.first().text().trim();
  const h1Length = h1Text.length;

  const h2Texts = h2s.map((_, el) => $(el).text().trim()).get();

  const invalidH2Lengths = h2Texts.filter(
    (h) => h.length < H_MIN || h.length > H_MAX,
  );

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

  const metaDescriptionLength = description.length;

  return {
    page,

    title,
    description,

    hasTitle: Boolean(title),

    metaDescription: description,
    metaDescriptionCount: metaDescriptions.length,
    hasMetaDescription: metaDescriptions.length > 0,
    hasSingleMetaDescription: metaDescriptions.length === 1,
    metaDescriptionLength,

    titleValidLength:
      title.length >= META_TITLE_MIN && title.length <= META_TITLE_MAX,

    metaDescriptionValidLength:
      metaDescriptionLength >= META_MIN && metaDescriptionLength <= META_MAX,

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
}
