// src/pages/rss.xml.ts
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context: any) {
  const posts = await getCollection("blog");

  return rss({
    title: "Pilot Instructional Center Blog",
    description:
      "Latest insights on flight training, aviation education, and pilot career development",
    site: context.site || "https://pilotinstructionalcenter.com",
    items: posts.map((post) => {
      const slug =
        post.id
          .replace(/\.(md|mdx)$/, "")
          .split("/")
          .pop() || post.id;

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        updated: post.data.updated || post.data.pubDate,
        link: `/blog/${slug}/`,
        author: post.data.author || "Pilot Instructional Center",
        categories: post.data.tags || [],
      };
    }),
    customData: `
      <language>en-us</language>
      <copyright>${new Date().getFullYear()} Pilot Instructional Center</copyright>
      <atom:link href="${
        context.site || "https://pilotinstructionalcenter.com"
      }rss.xml" rel="self" type="application/rss+xml" />
      <image>
        <url>${
          context.site || "https://pilotinstructionalcenter.com"
        }/favicon.svg</url>
        <title>Pilot Instructional Center</title>
        <link>${context.site || "https://pilotinstructionalcenter.com"}</link>
      </image>
    `,
  });
}
