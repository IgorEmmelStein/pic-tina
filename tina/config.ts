import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
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
      {
        name: "blog",
        label: "Blog",
        path: "src/content/blog",
        format: "md",
        fields: [
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
            label: "Description",
            ui: { component: "textarea" },
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "role",
            label: "Author Role",
          },
          {
            type: "image",
            name: "authorImage",
            label: "Author Image",
          },
          {
            type: "string",
            name: "authorImageAlt",
            label: "Author Image Alt",
          },
          {
            type: "image",
            name: "cardImage",
            label: "Card Image",
          },
          {
            type: "string",
            name: "cardImageAlt",
            label: "Card Image Alt",
          },
          {
            type: "number",
            name: "readTime",
            label: "Read Time",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            options: [
              "Pilot News",
              "International Aviation",
              "Aviation Safety",
              "Community",
              "Aviation Training",
              "Pilot Training and Certification",
              "Career Change",
              "Aircraft Guides",
              "Pilot Guides",
              "Commercial Pilot",
              "Flight Training",
              "Pilot Career Guides",
              "Uncategorized",
              "Pilot Mindset",
              "Pilot's Way of Life",
              "Design",
              "Flight School Comparison",
              "Private Pilot Flight School",
              "Aviation Technology",
            ],
          },
          {
            type: "object",
            name: "contents",
            label: "Contents",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            isBody: true,
          },
        ],
      },
      {
        name: "faqs",
        label: "FAQs",
        path: "src/content/faqs",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "upperHeading",
            label: "Upper Heading",
          },
          {
            type: "string",
            name: "paragraphs",
            label: "Paragraphs",
            list: true,
          },
          {
            type: "string",
            name: "ctaUrl",
            label: "CTA URL",
          },
          {
            type: "string",
            name: "ctaTitle",
            label: "CTA Title",
          },
          {
            type: "object",
            name: "faqs",
            label: "FAQ Items",
            list: true,
            fields: [
              { type: "string", name: "question", label: "Question" },
              { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});