import type { PageSEOResult, SEOSummary } from "./config.js";

export function generateSummary(results: PageSEOResult[]): SEOSummary {
  return {
    totalPages: results.length,

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
}
