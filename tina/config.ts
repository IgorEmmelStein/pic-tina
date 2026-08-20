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
                required: true,
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "descriptions",
            label: "Detailed Paragraphs",
            list: true,
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "bullets",
            label: "Feature / Specification Cards",
            list: true,
            required: true,
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
            required: true,
          },
        ],
      },
      {
        name: "team",
        label: "Team Members",
        path: "src/content/team",
        format: "md",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
          itemProps: (item) => ({ label: item?.name || "Team Member" }),
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Full Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "role",
            label: "Role / Position (e.g. Founder & CEO / Advanced Flight Instructor)",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Team Category",
            required: true,
            options: [
              {
                label: "Leadership",
                value: "leadership",
              },
              {
                label: "CFI",
                value: "cfi",
              },
            ],
          },
          {
            type: "string",
            name: "credentials",
            label: "Credentials (e.g. CFI, CFII, MEI)",
            required: true,
          },
          {
            type: "string",
            name: "bio",
            label: "Biography Paragraphs",
            list: true,
            required: true,
            ui: {
              component: "textarea",
            },
          }, {
            type: "object",
            name: "image",
            label: "Instructor Photo",
            required: true,
            fields: [
              {
                type: "image",
                name: "src",
                label: "Image File",
                required: true,
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text",
                required: true,
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
            create: true,
            delete: true,
          },
        },
        fields: [
          { type: "string", name: "siteTitle", label: "SEO Title", required: true },
          { type: "string", name: "siteDescription", label: "SEO Description", ui: { component: "textarea" }, required: true },
          { type: "string", name: "siteKeywords", label: "SEO Keywords", required: true },
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
                required: true,
                fields: [
                  { type: "image", name: "src", label: "Image Source", required: true },
                  { type: "string", name: "alt", label: "Alt Text", required: true },
                ],
              },
              {
                type: "object",
                name: "buttons",
                label: "Hero Buttons",
                list: true,
                required: true,
                fields: [
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Button Link", required: true },
                  { type: "string", name: "style", label: "Button Style", required: true },
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
              { type: "string", name: "upperHeader", label: "Upper Header", required: true },
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" }, required: true },
              {
                type: "object",
                name: "image",
                label: "Overview Image",
                required: true,
                fields: [
                  { type: "image", name: "src", label: "Image Source", required: true },
                  { type: "string", name: "alt", label: "Alt Text", required: true },
                ],
              },
              { type: "string", name: "descriptions", label: "Detailed Paragraphs", list: true, required: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "bullets",
                label: "Feature Bullets",
                list: true,
                required: true,
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
                required: true,
                fields: [
                  { type: "string", name: "text", label: "Button Text", required: true },
                  { type: "string", name: "href", label: "Button Link", required: true },
                  { type: "string", name: "style", label: "Button Style", required: true },
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
              { type: "string", name: "upperHeader", label: "System Status / Eyebrow", required: true },
              { type: "string", name: "title", label: "Section Title", required: true },
              { type: "string", name: "description", label: "Quote Description", ui: { component: "textarea" }, required: true },
              { type: "string", name: "descriptions", label: "Paragraphs", list: true, required: true, ui: { component: "textarea" } },
              {
                type: "object",
                name: "stats",
                label: "Stats Cards",
                list: true,
                required: true,
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
                required: true,
                ui: { itemProps: (item) => ({ label: item?.alt || "Slider Image" }) },
                fields: [
                  { type: "image", name: "src", label: "Image Source", required: true },
                  { type: "string", name: "alt", label: "Alt Text", required: true },
                ],
              },
              { type: "string", name: "faaCredit", label: "FAA Loggable Credits", list: true, required: true },
              { type: "string", name: "configurations", label: "Configurations", list: true, required: true },
              {
                type: "object",
                name: "bullets",
                label: "Numbered Bullet Cards",
                list: true,
                required: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Bullet Item" }) },
                fields: [
                  { type: "string", name: "title", label: "Card Title", required: true },
                  { type: "string", name: "description", label: "Card Description", ui: { component: "textarea" }, required: true },
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
                required: true,
                fields: [
                  { type: "string", name: "upperHeader", label: "Upper Header", required: true },
                  { type: "string", name: "title", label: "Title", required: true },
                  { type: "string", name: "descriptions", label: "Description", ui: { component: "textarea" }, required: true },
                  {
                    type: "object",
                    name: "cards",
                    label: "Metric Cards",
                    list: true,
                    required: true,
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
                required: true,
                fields: [
                  {
                    type: "object",
                    name: "image",
                    label: "Main Image",
                    required: true,
                    fields: [
                      { type: "image", name: "src", label: "Image Source", required: true },
                      { type: "string", name: "alt", label: "Alt Text", required: true },
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
                    required: true,
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
                    required: true,
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
                required: true,
                fields: [
                  { type: "image", name: "src", label: "Image Source", required: true },
                  { type: "string", name: "alt", label: "Alt Text", required: true },
                ],
              },
              {
                type: "object",
                name: "button",
                label: "Primary Button",
                required: true,
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