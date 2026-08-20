import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Shared Schemas
const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
  })
  .optional();

const buttonSchema = z
  .object({
    text: z.string(),
    href: z.string(),
    style: z.string().optional(),
  })
  .optional();

// 1. BLOG COLLECTION
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    contents: z
      .array(
        z.object({
          title: z.string().optional(),
          paragraph: z.string(),
        })
      )
      .optional(),
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

// 2. FLEET COLLECTION
const fleetCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/fleet" }),
  schema: z.object({
    upperHeader: z.string().optional(),
    title: z.string(),
    description: z.string(),
    imageSrc: z.string(),
    imageAlt: z.string(),
    descriptions: z.array(z.string()).default([]),
    bullets: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    coming: z.string().optional(),
    path: z.string().optional(),
  }),
});

// 3. TEAM COLLECTION
const teamCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    category: z.enum(["leadership", "cfi"]),
    credentials: z.string(),
    bio: z.array(z.string()).default([]),
    imageSrc: z.string(),
    imageAlt: z.string(),
  }),
});

// 4. SIMULATOR COLLECTION
const simulator = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/simulator" }),
  schema: z.object({
    id: z.string(),
    upperHeader: z.string(),
    title: z.string(),
    description: z.string(),
    descriptions: z.array(z.string()),
    stats: z.array(
      z.object({
        value: z.string(),
        unit: z.string(),
        label: z.string(),
      })
    ),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      })
    ),
    faaCredit: z.array(z.string()),
    configurations: z.array(z.string()),
    bullets: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
});

// 5. PILOT TRAINING COLLECTION
const pilotTraining = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/pilot-training",
  }),
  schema: z.object({
    siteTitle: z.string().optional(),
    siteDescription: z.string().optional(),
    siteKeywords: z.string().optional(),
    city: z.string().optional(),
    stateShort: z.string().optional(),
    stateLong: z.string().optional(),
    keyPlace1: z.string().optional(),
    keyPlace2: z.string().optional(),
    distance: z.string().optional(),
    headlines: z.array(z.string()).default([]),
    header: z
      .object({
        upperHeader: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        buttons: z
          .array(
            z.object({
              text: z.string(),
              href: z.string(),
              style: z.string().optional(),
            })
          )
          .default([]),
      })
      .optional(),
    whyUs: z
      .object({
        upperHeading: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        descriptions: z.array(z.string()).default([]),
        bullets: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
            })
          )
          .default([]),
        buttons: z
          .array(
            z.object({
              text: z.string(),
              href: z.string(),
              style: z.string().optional(),
            })
          )
          .default([]),
      })
      .optional(),
    advantages: z
      .object({
        upperHeading: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        descriptions: z.array(z.string()).default([]),
        bullets: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
            })
          )
          .default([]),
        buttons: z
          .array(
            z.object({
              text: z.string(),
              href: z.string(),
              style: z.string().optional(),
            })
          )
          .default([]),
        advantages: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
              bullets: z
                .array(
                  z.object({
                    title: z.string(),
                    description: z.string(),
                  })
                )
                .default([]),
            })
          )
          .default([]),
      })
      .optional(),
    benefits: z
      .object({
        upperHeading: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        descriptions: z.array(z.string()).default([]),
        benefits: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
              bullets: z
                .array(
                  z.object({
                    icon: z.string().optional(),
                    title: z.string(),
                    description: z.string(),
                  })
                )
                .default([]),
            })
          )
          .default([]),
      })
      .optional(),
    faqs: z
      .object({
        upperHeading: z.string().optional(),
        title: z.string().optional(),
        items: z
          .array(
            z.object({
              question: z.string(),
              answer: z.string(),
            })
          )
          .default([]),
      })
      .optional(),
    ctas: z
      .array(
        z.object({
          upperHeading: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          button: z.object({
            href: z.string(),
            text: z.string(),
            style: z.string().optional(),
          }),
        })
      )
      .default([]),
  }),
});

// 6. FAQS COLLECTION
const faqsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/faqs" }),
  schema: z.object({
    upperHeading: z.string().optional(),
    title: z.string(),
    paragraphs: z.array(z.string()).default([]),
    ctaUrl: z.string().optional(),
    ctaTitle: z.string().optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  "pilot-training": pilotTraining,
  faqs: faqsCollection,
  fleet: fleetCollection,
  simulator: simulatorCollection,
  team: teamCollection,
};