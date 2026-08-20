import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "src/assets",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  schema: {
    collections: [
      // =======================================================================
      // 1. FLEET COLLECTION
      // =======================================================================
      {
        name: "fleet",
        label: "Our Fleet",
        path: "src/content/fleet",
        format: "md",
        fields: [
          {
            type: "string",
            name: "upperHeader",
            label: "Upper Eyebrow Header",
          },
          {
            type: "string",
            name: "title",
            label: "Aircraft Name / Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "image",
            label: "Main Aircraft Image",
            fields: [
              {
                type: "image",
                name: "src",
                label: "Image File",
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text",
              },
            ],
          },
          {
            type: "string",
            name: "descriptions",
            label: "Detailed Paragraphs",
            list: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "bullets",
            label: "Feature / Specification Cards",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Feature Item" }),
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "icon",
                label: "Icon (SVG Path or Icon Name)",
              },
            ],
          },
          {
            type: "string",
            name: "features",
            label: "Features Checklist",
            list: true,
          },
          {
            type: "string",
            name: "configurations",
            label: "Available Panel Configurations",
            list: true,
          },
        ],
      },

      // =======================================================================
      // 2. PILOT TRAINING COLLECTION
      // =======================================================================
      {
        name: "pilotTraining",
        label: "Pilot Training Pages",
        path: "src/content/pilot-training",
        format: "md",
        fields: [
          // SEO & Geo-Location
          {
            type: "string",
            name: "siteTitle",
            label: "SEO Title",
            required: true,
          },
          {
            type: "string",
            name: "siteDescription",
            label: "SEO Description (Max 155 chars)",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "siteKeywords",
            label: "SEO Keywords",
            required: true,
          },
          {
            type: "string",
            name: "city",
            label: "City (e.g. Kansas City)",
            required: true,
          },
          {
            type: "string",
            name: "stateShort",
            label: "State Abbreviation (e.g. KS / MO)",
            required: true,
          },
          {
            type: "string",
            name: "stateLong",
            label: "Full State Name (e.g. Missouri)",
            required: true,
          },
          {
            type: "string",
            name: "keyPlace1",
            label: "Key Landmark / Reference Point 1",
            required: true,
          },
          {
            type: "string",
            name: "keyPlace2",
            label: "Key Landmark / Reference Point 2",
            required: true,
          },
          {
            type: "string",
            name: "distance",
            label: "Travel Distance / Time (e.g. 20 minutes)",
            required: true,
          },
          {
            type: "string",
            name: "headlines",
            label: "Page Headlines / Key Highlights",
            list: true,
          },

          // 1. Hero Header Section
          {
            type: "object",
            name: "header",
            label: "Hero Header Section",
            fields: [
              { type: "string", name: "upperHeader", label: "Upper Eyebrow Header", required: true },
              { type: "string", name: "title", label: "Hero Title", required: true },
              { type: "string", name: "description", label: "Hero Description", ui: { component: "textarea" }, required: true },
              {
                type: "object",
                name: "buttons",
                label: "Header Action Buttons",
                list: true,
                fields: [
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Button Link", required: true },
                  { type: "string", name: "style", label: "Button Style (e.g. btn-secondary, btn-transparent)" },
                ],
              },
            ],
          },

          // 2. Why Choose Us Section
          {
            type: "object",
            name: "whyUs",
            label: "Why Choose PIC Section",
            fields: [
              { type: "string", name: "upperHeading", label: "Upper Eyebrow Heading", required: true },
              { type: "string", name: "title", label: "Section Title", required: true },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" }, required: true },
              { type: "string", name: "descriptions", label: "Detailed Paragraphs", list: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "bullets",
                label: "Feature Cards",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Feature Item" }) },
                fields: [
                  { type: "string", name: "title", label: "Card Title", required: true },
                  { type: "string", name: "description", label: "Card Description", ui: { component: "textarea" }, required: true },
                ],
              },
              {
                type: "object",
                name: "buttons",
                label: "Action Buttons",
                list: true,
                fields: [
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Button Link", required: true },
                  { type: "string", name: "style", label: "Button Style" },
                ],
              },
            ],
          },

          // 3. Advantages Section
          {
            type: "object",
            name: "advantages",
            label: "Training Advantages Section",
            fields: [
              { type: "string", name: "upperHeading", label: "Upper Eyebrow Heading", required: true },
              { type: "string", name: "title", label: "Section Title", required: true },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" }, required: true },
              { type: "string", name: "descriptions", label: "Detailed Paragraphs", list: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "bullets",
                label: "Overview Bullets",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Bullet Title", required: true },
                  { type: "string", name: "description", label: "Bullet Description", ui: { component: "textarea" }, required: true },
                ],
              },
              {
                type: "object",
                name: "buttons",
                label: "Action Buttons",
                list: true,
                fields: [
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Button Link", required: true },
                  { type: "string", name: "style", label: "Button Style" },
                ],
              },
              {
                type: "object",
                name: "advantages",
                label: "Advantage Cards with Sub-points",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Advantage Card" }) },
                fields: [
                  { type: "string", name: "title", label: "Advantage Title", required: true },
                  { type: "string", name: "description", label: "Advantage Description", ui: { component: "textarea" }, required: true },
                  {
                    type: "object",
                    name: "bullets",
                    label: "Sub-points",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Sub-point Title", required: true },
                      { type: "string", name: "description", label: "Sub-point Description", ui: { component: "textarea" }, required: true },
                    ],
                  },
                ],
              },
            ],
          },

          // 4. Benefits Section
          {
            type: "object",
            name: "benefits",
            label: "Program Benefits Section",
            fields: [
              { type: "string", name: "upperHeading", label: "Upper Eyebrow Heading", required: true },
              { type: "string", name: "title", label: "Section Title", required: true },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" }, required: true },
              { type: "string", name: "descriptions", label: "Detailed Paragraphs", list: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "benefits",
                label: "Benefit Blocks",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Benefit Block" }) },
                fields: [
                  { type: "string", name: "title", label: "Benefit Title", required: true },
                  { type: "string", name: "description", label: "Benefit Description", ui: { component: "textarea" }, required: true },
                  {
                    type: "object",
                    name: "bullets",
                    label: "Icon Bullets",
                    list: true,
                    fields: [
                      { type: "string", name: "icon", label: "Icon (SVG Path)", required: true },
                      { type: "string", name: "title", label: "Bullet Title", required: true },
                      { type: "string", name: "description", label: "Bullet Description", ui: { component: "textarea" }, required: true },
                    ],
                  },
                ],
              },
            ],
          },

          // 5. FAQs Section
          {
            type: "object",
            name: "faqs",
            label: "Location FAQs Section",
            fields: [
              { type: "string", name: "upperHeading", label: "Upper Eyebrow Heading", required: true },
              { type: "string", name: "title", label: "Section Title", required: true },
              {
                type: "object",
                name: "items",
                label: "Questions & Answers",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.question || "FAQ Item" }) },
                fields: [
                  { type: "string", name: "question", label: "Question", required: true },
                  { type: "string", name: "answer", label: "Answer (Supports HTML)", ui: { component: "textarea" }, required: true },
                ],
              },
            ],
          },

          // 6. CTAs Section
          {
            type: "object",
            name: "ctas",
            label: "Call-to-Action (CTA) Blocks",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "CTA Block" }) },
            fields: [
              { type: "string", name: "upperHeading", label: "Upper Eyebrow Heading", required: true },
              { type: "string", name: "title", label: "CTA Title", required: true },
              { type: "string", name: "description", label: "CTA Description", ui: { component: "textarea" }, required: true },
              {
                type: "object",
                name: "button",
                label: "CTA Button",
                fields: [
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Target Link URL", required: true },
                  { type: "string", name: "style", label: "Button Style (e.g. btn-secondary)" },
                ],
              },
            ],
          },
        ],
      },

      // =======================================================================
      // 3. SIMULATOR COLLECTION
      // =======================================================================
      {
        name: "simulator",
        label: "Simulator",
        path: "src/content/simulator",
        match: {
          include: "simulator-redbird-fmx-full-motion-aatd",
        },
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "string", name: "siteTitle", label: "SEO Title" },
          { type: "string", name: "siteDescription", label: "SEO Description", ui: { component: "textarea" } },
          { type: "string", name: "siteKeywords", label: "SEO Keywords" },

          // Header Hero
          {
            type: "object",
            name: "header",
            label: "Header Hero Section",
            fields: [
              { type: "string", name: "upperHeader", label: "Upper Eyebrow Header" },
              { type: "string", name: "title", label: "Hero Title" },
              { type: "string", name: "description", label: "Hero Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "image",
                label: "Header Image",
                fields: [
                  { type: "image", name: "src", label: "Image Source" },
                  { type: "string", name: "alt", label: "Alt Text" },
                ],
              },
              {
                type: "object",
                name: "buttons",
                label: "Hero Buttons",
                list: true,
                fields: [
                  { type: "string", name: "text", label: "Button Text" },
                  { type: "string", name: "href", label: "Button Link" },
                  { type: "string", name: "style", label: "Button Style" },
                ],
              },
            ],
          },

          // Overview Section
          {
            type: "object",
            name: "overview",
            label: "Overview Section",
            fields: [
              { type: "string", name: "upperHeader", label: "Upper Header" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "image",
                label: "Overview Image",
                fields: [
                  { type: "image", name: "src", label: "Image Source" },
                  { type: "string", name: "alt", label: "Alt Text" },
                ],
              },
              { type: "string", name: "descriptions", label: "Detailed Paragraphs", list: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "bullets",
                label: "Feature Bullets",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },

          // Offer CTA Section
          {
            type: "object",
            name: "offerCta",
            label: "Offer CTA (Specs & Slider)",
            fields: [
              { type: "string", name: "upperHeader", label: "System Status / Eyebrow" },
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "description", label: "Quote Description", ui: { component: "textarea" } },
              { type: "string", name: "descriptions", label: "Paragraphs", list: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "stats",
                label: "Stats Cards",
                list: true,
                fields: [
                  { type: "string", name: "value", label: "Value (e.g. 6, $60)" },
                  { type: "string", name: "unit", label: "Unit (e.g. -axis, /hr)" },
                  { type: "string", name: "label", label: "Label" },
                ],
              },
              {
                type: "object",
                name: "images",
                label: "Slider Images",
                list: true,
                fields: [
                  { type: "image", name: "src", label: "Image Source" },
                  { type: "string", name: "alt", label: "Alt Text" },
                ],
              },
              { type: "string", name: "faaCredit", label: "FAA Loggable Credits", list: true },
              { type: "string", name: "configurations", label: "Configurations", list: true },
              {
                type: "object",
                name: "bullets",
                label: "Numbered Bullet Cards",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Card Title" },
                  { type: "string", name: "description", label: "Card Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },

          // Image / Advantage Section
          {
            type: "object",
            name: "imageSection",
            label: "Simulator Advantage Section",
            fields: [
              {
                type: "object",
                name: "content",
                label: "Header Content & Cards",
                fields: [
                  { type: "string", name: "upperHeader", label: "Upper Header" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "descriptions", label: "Description", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "cards",
                    label: "Metric Cards",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Card Title" },
                      { type: "string", name: "description", label: "Card Description", ui: { component: "textarea" } },
                      { type: "string", name: "path", label: "Link URL" },
                    ],
                  },
                ],
              },
              {
                type: "object",
                name: "offerSection",
                label: "Promo Card & Image",
                fields: [
                  {
                    type: "object",
                    name: "image",
                    label: "Main Image",
                    fields: [
                      { type: "image", name: "src", label: "Image Source" },
                      { type: "string", name: "alt", label: "Alt Text" },
                    ],
                  },
                  { type: "string", name: "path", label: "Target URL" },
                  { type: "string", name: "quote", label: "Pull Quote", ui: { component: "textarea" } },
                  { type: "string", name: "title", label: "Promo Card Title" },
                  {
                    type: "object",
                    name: "offers",
                    label: "Offers List",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "description", label: "Description" },
                    ],
                  },
                  {
                    type: "object",
                    name: "advantages",
                    label: "Advantages Strip",
                    fields: [
                      { type: "string", name: "costReduction", label: "Cost Reduction Text" },
                      { type: "string", name: "label", label: "Button Label" },
                    ],
                  },
                ],
              },
            ],
          },

          // Airline Pilot Track CTA
          {
            type: "object",
            name: "airlineTrackCTA",
            label: "Airline Pilot Track CTA",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "image",
                label: "Image",
                fields: [
                  { type: "image", name: "src", label: "Image Source" },
                  { type: "string", name: "alt", label: "Alt Text" },
                ],
              },
              {
                type: "object",
                name: "button",
                label: "Primary Button",
                fields: [
                  { type: "string", name: "text", label: "Button Text" },
                  { type: "string", name: "href", label: "Button URL" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});