// Base Configs

import path from "path";
import { glob } from "glob";

export const DIST_DIR = path.resolve("dist");

export const OUTPUT_JSON = "./reports/seo-report.json";
export const OUTPUT_CSV = "./reports/seo-report.csv";

export const META_TITLE_MIN = 50;
export const META_TITLE_MAX = 100;

export const META_MIN = 50;
export const META_MAX = 160;

export const H_MIN = 20;
export const H_MAX = 70;

// file scanner

export async function getHtmlFiles(): Promise<string[]> {
  return glob(`${DIST_DIR}/**/*.html`);
}

// Types

export interface PageSEOResult {
  page: string;

  title: string;
  description: string;

  hasTitle: boolean;

  metaDescription: string;
  metaDescriptionCount: number;
  hasMetaDescription: boolean;
  hasSingleMetaDescription: boolean;
  metaDescriptionLength: number;

  titleValidLength: boolean;
  metaDescriptionValidLength: boolean;

  h1: string;
  h1Count: number;
  hasH1: boolean;
  hasSingleH1: boolean;
  h1ValidLength: boolean;

  h2Count: number;
  hasH2: boolean;
  invalidH2Lengths: string[];

  hasInvalidHeadingOrder: boolean;
}

export interface SEOSummary {
  totalPages: number;

  missingTitle: number;
  invalidTitleLength: number;

  missingMetaDescription: number;
  multipleMetaDescriptions: number;
  invalidMetaDescriptionLength: number;

  missingH1: number;
  multipleH1: number;
  invalidH1Length: number;

  missingH2: number;
  invalidHeadingOrder: number;
}

export interface SEOReport {
  summary: SEOSummary;
  pages: PageSEOResult[];
}
