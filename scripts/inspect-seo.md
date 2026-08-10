# SEO Inspector Script

This script analyzes the generated HTML files inside the `dist/` directory and produces SEO reports.

It inspects metadata, heading structure, keyword usage, and word frequency across all pages.

The goal is to quickly detect SEO issues and evaluate keyword coverage across the website.

---

# Features

The script analyzes every HTML page in the `dist/` folder and generates the following insights.

## Metadata Analysis

- Page title detection
- Meta description detection
- Meta description length validation
- Multiple meta description detection

Recommended length rules:

| Element          | Min | Max            |
| ---------------- | --- | -------------- |
| Meta Description | 50  | 160 characters |
| H1 / H2          | 20  | 70 characters  |

---

## Heading Structure Validation

The script verifies:

- Presence of H1
- Multiple H1 detection
- Presence of H2
- Invalid heading hierarchy

Example of invalid hierarchy:

    H1
    H3   ❌ skipped H2

---

## Keyword Analysis

The script analyzes predefined SEO keywords and measures:

- Keyword occurrences per page
- Keyword density
- Keyword presence in:
  - Title
  - H1
  - H2

Example keywords:

    pilot
    flight school
    pilot training
    private pilot
    commercial pilot

---

## Word Frequency Analysis

The script extracts visible text from each page and computes:

- Total word count
- Word frequency
- Top 50 most common words across the website

---

# Generated Reports

After execution, the script generates reports inside the `reports/` folder.

    reports/
       seo-report.json
       seo-report.csv
       keyword-report.csv

---

# Report Descriptions

## seo-report.json

Full structured SEO analysis.

Contains:

- SEO summary
- Global keyword statistics
- Top words across the website
- Detailed analysis per page

Example structure:

    {
      "summary": {
        "totalPages": 38,
        "missingTitle": 0,
        "missingMetaDescription": 1
      },
      "topWords": [
        ["pilot", 412],
        ["flight", 310],
        ["training", 288]
      ]
    }

---

## seo-report.csv

Page-level SEO metrics.

Columns:

| Column                 | Description                     |
| ---------------------- | ------------------------------- |
| page                   | Page URL                        |
| title                  | Page title                      |
| description            | Meta description                |
| metaDescriptionLength  | Length of meta description      |
| metaDescriptionCount   | Number of meta description tags |
| h1Count                | Number of H1 tags               |
| h2Count                | Number of H2 tags               |
| totalWords             | Word count                      |
| hasInvalidHeadingOrder | Heading hierarchy issues        |

---

## keyword-report.csv

Keyword performance per page.

Columns:

| Column  | Description              |
| ------- | ------------------------ |
| page    | Page URL                 |
| keyword | SEO keyword              |
| count   | Number of occurrences    |
| density | Keyword density (%)      |
| inTitle | Keyword present in title |
| inH1    | Keyword present in H1    |
| inH2    | Keyword present in H2    |

Example:

    page,keyword,count,density,inTitle,inH1,inH2
    /pilot-training,pilot,22,2.41,true,true,true
    /private-pilot,private pilot,10,1.22,true,true,true

---

# Installation

Install required dependencies:

    npm install glob cheerio

---

# Running the Script

From the project root:

    node scripts/inspect-seo-3.js

---

# Recommended npm Script

Add a shortcut to `package.json`:

    "scripts": {
      "seo": "node scripts/inspect-seo-3.js"
    }

Run with:

    npm run seo

---

# Recommended Workflow

For static sites, run the SEO inspection after building the site.

Example workflow:

    1. Build site
    2. Generate dist/
    3. Run SEO inspector
    4. Review reports

Example command:

    npm run build && npm run seo

---

# How Keyword Density Works

Keyword density is calculated using:

    keywordDensity = (keywordCount / totalWords) * 100

Example:

    pilot occurrences: 22
    total words: 980

    density = 2.24%

Typical SEO density targets:

| Density | Interpretation            |
| ------- | ------------------------- |
| < 1%    | Low usage                 |
| 1–2%    | Good                      |
| 2–3%    | Strong                    |
| > 4%    | Possible keyword stuffing |

---

# Limitations

The script:

- Only analyzes static HTML files
- Does not crawl external links
- Does not evaluate Core Web Vitals
- Does not evaluate backlinks

It is designed as a static site SEO auditing tool.

---

# Possible Future Improvements

Potential enhancements:

- Keyword cannibalization detection
- Internal linking analysis
- First paragraph keyword detection
- Word cloud generation
- SEO dashboard with charts
- Duplicate content detection
- Reading level analysis

---

# Purpose

This script acts as a lightweight SEO auditing tool similar to large SEO analysis tools but focused on static site analysis.
