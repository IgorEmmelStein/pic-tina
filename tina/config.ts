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
            type: "image",
            name: "imageSrc",
            label: "Main Aircraft Image",
            required: true,
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image Alt Text",
            required: true,
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
            type: "string",
            name: "bullets",
            label: "Feature / Specification Cards",
            list: true,
            required: true,
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

      // =======================================================================
      // 2. TEAM MEMBERS COLLECTION
      // =======================================================================
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
          itemProps: (item) => ({ label: item?.name ? `${item.name} (${item.category || 'Team'})` : "Team Member" }),
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
            label: "Team Grouping",
            required: true,
            options: [
              { label: "Leadership", value: "leadership" },
              { label: "CFI", value: "cfi" },
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
          },
          {
            type: "image",
            name: "imageSrc",
            label: "Image File",
            required: true,
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Image description (will not show on page, just on code for SEO)",
            required: true,
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
        format: "md",
        fields: [
          {
            type: "string",
            name: "upperHeader",
            label: "Upper Header",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Main Description",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "string",
            name: "descriptions",
            label: "Paragraph Descriptions",
            list: true,
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "object",
            name: "stats",
            label: "Stats Cards",
            list: true,
            required: true,
            fields: [
              { type: "string", name: "value", label: "Value", required: true },
              { type: "string", name: "unit", label: "Unit", required: true },
              { type: "string", name: "label", label: "Label", required: true },
            ],
          },
          {
            type: "object",
            name: "images",
            label: "Gallery Images",
            list: true,
            required: true,
            fields: [
              { type: "image", name: "src", label: "Image Source", required: true },
              { type: "string", name: "alt", label: "Alt Text", required: true },
            ],
          },
          {
            type: "string",
            name: "faaCredit",
            label: "FAA Loggable Credits",
            list: true,
            required: true,
          },
          {
            type: "string",
            name: "configurations",
            label: "Available Configurations",
            list: true,
            required: true,
          },
          {
            type: "object",
            name: "bullets",
            label: "Feature Bullets",
            list: true,
            required: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title ? item.title : "Feature Bullet",
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Card Title", required: true },
              {
                type: "string",
                name: "description",
                label: "Card Description",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});