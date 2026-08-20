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
      mediaRoot: "uploads",
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
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "upperHeader",
            label: "Upper Eyebrow Header",
            required: true,
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
            required: true,
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
              itemProps: (item) => ({
                label: item?.title ? item.title : "Specification Item",
              }),
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "features",
            label: "Features Checklist",
            list: true,
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
            delete: true,
          },
        },
        fields: [
          { type: "string", name: "siteTitle", label: "SEO Title", required: true },
          { type: "string", name: "siteDescription", label: "SEO Description", ui: { component: "textarea" }, required: true },
          { type: "string", name: "siteKeywords", label: "SEO Keywords", required: true },

          // Header Hero
          {
            type: "object",
            name: "header",
            label: "Header Hero Section",
            fields: [
              { type: "string", name: "upperHeader", label: "Upper Eyebrow Header", required: true },
              { type: "string", name: "title", label: "Hero Title", required: true },
              { type: "string", name: "description", label: "Hero Description", ui: { component: "textarea" }, required: true },
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
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Button Link", required: true },
                  { type: "string", name: "style", label: "Button Style" },
                ],
              },
            ],
          },

          // Overview
          {
            type: "object",
            name: "overview",
            label: "Overview Section",
            fields: [
              { type: "string", name: "upperHeader", label: "Upper Header", required: true },
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" }, required: true },
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
                ui: { itemProps: (item) => ({ label: item?.title || "Feature Bullet" }) },
                fields: [
                  { type: "string", name: "title", label: "Title", required: true },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" }, required: true },
                  { type: "string", name: "icon", label: "Icon (SVG Path)", required: true },
                ],
              },
              {
                type: "object",
                name: "button",
                label: "Call to Action Button",
                fields: [
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Button Link", required: true },
                  { type: "string", name: "style", label: "Button Style" },
                ],
              },
            ],
          },

          // Offer CTA
          {
            type: "object",
            name: "offerCta",
            label: "Offer CTA (Specs & Slider)",
            fields: [
              { type: "string", name: "upperHeader", label: "System Status / Eyebrow", required: true },
              { type: "string", name: "title", label: "Section Title", required: true },
              { type: "string", name: "description", label: "Quote Description", ui: { component: "textarea" }, required: true },
              { type: "string", name: "descriptions", label: "Paragraphs", list: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "stats",
                label: "Stats Cards",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label || "Stat Item" }) },
                fields: [
                  { type: "string", name: "value", label: "Value", required: true },
                  { type: "string", name: "unit", label: "Unit", required: true },
                  { type: "string", name: "label", label: "Label", required: true },
                ],
              },
              {
                type: "object",
                name: "images",
                label: "Slider Images",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.alt || "Slider Image" }) },
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
                ui: { itemProps: (item) => ({ label: item?.title || "Bullet Item" }) },
                fields: [
                  { type: "string", name: "title", label: "Card Title", required: true },
                  { type: "string", name: "description", label: "Card Description", ui: { component: "textarea" }, required: true },
                ],
              },
            ],
          },

          // Image Section
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
                  { type: "string", name: "upperHeader", label: "Upper Header", required: true },
                  { type: "string", name: "title", label: "Title", required: true },
                  { type: "string", name: "descriptions", label: "Description", ui: { component: "textarea" }, required: true },
                  {
                    type: "object",
                    name: "cards",
                    label: "Metric Cards",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title || "Metric Card" }) },
                    fields: [
                      { type: "string", name: "title", label: "Card Title", required: true },
                      { type: "string", name: "description", label: "Card Description", ui: { component: "textarea" }, required: true },
                      { type: "string", name: "path", label: "Link URL", required: true },
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
                  { type: "string", name: "path", label: "Target URL", required: true },
                  { type: "string", name: "quote", label: "Pull Quote", ui: { component: "textarea" }, required: true },
                  { type: "string", name: "title", label: "Promo Card Title", required: true },
                  {
                    type: "object",
                    name: "offers",
                    label: "Offers List",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title || "Offer Item" }) },
                    fields: [
                      { type: "string", name: "title", label: "Title", required: true },
                      { type: "string", name: "description", label: "Description", required: true },
                    ],
                  },
                  {
                    type: "object",
                    name: "advantages",
                    label: "Advantages Strip",
                    fields: [
                      { type: "string", name: "costReduction", label: "Cost Reduction Text", required: true },
                      { type: "string", name: "label", label: "Button Label", required: true },
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
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" }, required: true },
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
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Button URL", required: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});