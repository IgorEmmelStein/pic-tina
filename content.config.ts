import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    contents: z.array(
      z.object({
        title: z.string().optional(),
        paragraph: z.string(),
      }),
    ).optional(),
    author: z.string().optional(),
    role: z.string().optional(),
    authorImage: z.string().optional(),
    authorImageAlt: z.string().optional(),
    pubDate: z.coerce.date(),
    cardImage: z.string().optional(),
    cardImageAlt: z.string().optional(),
    readTime: z.number().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
  }),
});

const fleetCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/fleet" }),
  schema: z.object({
    id: z.string().optional(),
    upperHeader: z.string().optional(),
    title: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    descriptions: z.array(z.string()).default([]),
    bullets: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
    ).default([]),
    features: z.array(z.string()).default([]),
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
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/faqs" }),
  schema: z.object({
    upperHeading: z.string().optional(),
    title: z.string(),
    paragraphs: z.array(z.string()).default([]),
    ctaUrl: z.string().optional(),
    ctaTitle: z.string().optional(),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  "pilot-training": pilotTraining,
  faqs: faqsCollection,
  fleet: fleetCollection,
};