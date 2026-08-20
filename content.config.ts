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

const simulatorCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/simulator" }),
  schema: z.object({
    // SEO
    siteTitle: z.string().optional(),
    siteDescription: z.string().optional(),
    siteKeywords: z.union([z.string(), z.array(z.string())]).optional(),

    // Base Information
    id: z.string().optional(),
    upperHeader: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema,
    descriptions: z.array(z.string()).default([]),
    bullets: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
        })
      )
      .default([]),
    features: z.array(z.string()).default([]),

    // Header Hero
    header: z
      .object({
        upperHeader: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        image: imageSchema,
        buttons: z.array(buttonSchema).default([]),
      })
      .optional(),

    // Overview Section (TextIcons)
    overview: z
      .object({
        upperHeader: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        image: imageSchema,
        descriptions: z.array(z.string()).default([]),
        bullets: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
              icon: z.string().optional(),
            })
          )
          .default([]),
        button: z
          .object({
            text: z.string(),
            href: z.string(),
          })
          .optional(),
      })
      .optional(),

    // Specs Section
    specs: z
      .object({
        upperHeader: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        bullets: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
            })
          )
          .default([]),
        faaCredits: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
            })
          )
          .default([]),
        features: z.array(z.string()).default([]),
      })
      .optional(),

    // SimulatorOfferCTA
    offerCta: z
      .object({
        id: z.string().optional(),
        upperHeader: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        descriptions: z.array(z.string()).default([]),
        stats: z
          .array(
            z.object({
              value: z.string(),
              unit: z.string(),
              label: z.string(),
            })
          )
          .default([]),
        images: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
        faaCredit: z.array(z.string()).default([]),
        configurations: z.array(z.string()).default([]),
        bullets: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
            })
          )
          .default([]),
      })
      .optional(),

    // SimulatorImageSection
    imageSection: z
      .object({
        simInventory: z
          .array(
            z.object({
              model: z.string(),
              spec: z.string(),
              useCase: z.string(),
              description: z.string(),
            })
          )
          .default([]),
        content: z
          .object({
            upperHeader: z.string().optional(),
            title: z.string().optional(),
            descriptions: z.string().optional(),
            cards: z
              .array(
                z.object({
                  title: z.string(),
                  description: z.string(),
                  path: z.string().optional(),
                })
              )
              .default([]),
          })
          .optional(),
        offerSection: z
          .object({
            image: imageSchema,
            path: z.string().optional(),
            quote: z.string().optional(),
            title: z.string().optional(),
            offers: z
              .array(
                z.object({
                  title: z.string(),
                  description: z.string(),
                  path: z.string().optional(),
                })
              )
              .default([]),
            advantages: z
              .object({
                costReduction: z.string().optional(),
                label: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
        cta: z
          .object({
            title: z.string().optional(),
            path: z.string().optional(),
          })
          .optional(),
      })
      .optional(),

    // CTA Airline Track
    airlineTrackCTA: z
      .object({
        image: imageSchema,
        title: z.string().optional(),
        description: z.string().optional(),
        button: buttonSchema,
      })
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

const teamCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    category: z.enum(["leadership", "cfi"]),
    credentials: z.string(),
    bio: z.array(z.string()).min(1, "At least one bio paragraph is required."),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

export const collections = {
  blog: blogCollection,
  "pilot-training": pilotTraining,
  faqs: faqsCollection,
  fleet: fleetCollection,
  simulator: simulatorCollection,
  team: teamCollection
};