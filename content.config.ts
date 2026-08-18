// https://docs.astro.build/en/guides/content-collections/#defining-collections

import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { text } from "stream/consumers";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      contents: z.array(
        z.object({
          title: z.string().optional(),
          paragraph: z.string(),
        }),
      ),
      author: z.string(),
      role: z.string().optional(),
      authorImage: z.string(),
      authorImageAlt: z.string().optional(),
      pubDate: z.date(),
      cardImage: z.string(),
      cardImageAlt: z.string().optional(),
      readTime: z.number(),
      tags: z.array(z.string()).optional(),
      categories: z
        .array(
          z.enum([
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
            "Career Change",
            "Uncategorized",
            "Pilot Mindset",
            "Pilot's Way of Life",
            "Design",
            "Flight School Comparison",
            "Private Pilot Flight School",
            "Aviation Technology",
          ]),
        )
        .optional(),
    }),
});

const pilotTraining = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/pilot-training",
  }),
  schema: () =>
    z.object({
      siteTitle: z.string(),
      siteDescription: z.string().length(155),
      siteKeywords: z.string(),
      city: z.string(),
      stateShort: z.string(),
      stateLong: z.string(),
      keyPlace1: z.string(),
      keyPlace2: z.string(),
      distance: z.string(),
      headlines: z.array(z.string()),
      header: z.object({
        upperHeader: z.string(),
        title: z.string(),
        description: z.string(),
        buttons: z.array(
          z
            .object({
              text: z.string(),
              href: z.string(),
              style: z.string().optional(),
            })
            .optional(),
        ),
      }),
      whyUs: z.object({
        upperHeading: z.string(),
        title: z.string(),
        description: z.string(),
        descriptions: z.array(z.string()),
        bullets: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        ),
        buttons: z.array(
          z.object({
            text: z.string(),
            href: z.string(),
            style: z.string().optional(),
          }),
        ),
      }),
      advantages: z.object({
        upperHeading: z.string(),
        title: z.string(),
        description: z.string(),
        descriptions: z.array(z.string()),
        bullets: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
          }),
        ),
        buttons: z.array(
          z.object({
            text: z.string(),
            href: z.string(),
            style: z.string().optional(),
          }),
        ),
        advantages: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            bullets: z.array(
              z.object({
                title: z.string(),
                description: z.string(),
              }),
            ),
          }),
        ),
      }),
      benefits: z.object({
        upperHeading: z.string(),
        title: z.string(),
        description: z.string(),
        descriptions: z.array(z.string()),
        benefits: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            bullets: z.array(
              z.object({
                icon: z.string(),
                title: z.string(),
                description: z.string(),
              }),
            ),
          }),
        ),
      }), faqs: z.object({
        upperHeading: z.string(),
        title: z.string(),
        items: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        ),
      }).optional(),
      ctas: z.array(
        z.object({
          upperHeading: z.string(),
          title: z.string(),
          description: z.string(),
          button: z.object({
            href: z.string(),
            text: z.string(),
            style: z.string().optional(),
          }),
        }),
      ),
    }),
});

const faqsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    upperHeading: z.string().optional(),
    title: z.string(),
    paragraphs: z.array(z.string()).default([]),
    ctaUrl: z.string().optional(),
    ctaTitle: z.string().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
});

export const collections = {
  blog: blogCollection,
  "pilot-training": pilotTraining,
  faqs: faqsCollection,
};
