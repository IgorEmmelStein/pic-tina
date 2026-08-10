import type { APIRoute } from "astro";

const getRobotsTxt = (siteURL: string) => `
# Pilot Instructional Center - Robots.txt
# Generated: ${new Date().toISOString()}

# ============================================
# DEFAULT CRAWLING RULES
# ============================================
User-agent: *
Allow: /

# ============================================
# SEARCH ENGINES
# ============================================
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: YandexBot
Allow: /

# ============================================
# SOCIAL MEDIA CRAWLERS
# ============================================
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# ============================================
# SECURITY & PRIVACY
# ============================================
Disallow: /admin/
Disallow: /private/
Disallow: /dashboard/
Disallow: /api/
Disallow: /auth/
Disallow: /_astro/
Disallow: /.well-known/
Disallow: /tmp/
Disallow: /cache/
Disallow: /backup/

# ============================================
# QUERY PARAMETER CONTROL (CRAWL BUDGET)
# ============================================
Disallow: /*?*utm_
Disallow: /*?*ref=
Disallow: /*?*source=
Disallow: /*?*campaign=

# ============================================
# CONVERSION & SYSTEM PAGES
# ============================================
Disallow: /*-confirmation
Disallow: /*-confirmation/
Disallow: /thank-you*
Disallow: /thankyou*
Disallow: /success*
Disallow: /submit*
Disallow: /process*
Disallow: /handler*

# ============================================
# INDEXABLE CONTENT
# ============================================
Allow: /blog/
Allow: /webinars/
Allow: /podcasts/
Allow: /resources/
Allow: /our-flight-schools/
Allow: /about/
Allow: /contact
Allow: /locations/
Allow: /flight-crew/
Allow: /flight-school-seo/
Allow: /flight-school-website-design/
Allow: /marketing-system/
Allow: /schedule-call/
Allow: /services/

# ============================================
# STATIC ASSETS
# ============================================
Allow: /*.css$
Allow: /*.js$
Allow: /*.woff$
Allow: /*.woff2$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.webp$
Allow: /*.svg$
Allow: /*.gif$
Allow: /*.ico$

# ============================================
# ALL BOTS ALLOWED
# ============================================

User-agent: *
Allow: /

# ============================================
# CRAWL DELAYS FOR AGGRESSIVE BOTS
# ============================================

User-agent: AhrefsBot
Crawl-delay: 5

User-agent: SemrushBot
Crawl-delay: 5

User-agent: MJ12bot
Crawl-delay: 10

User-agent: DotBot
Crawl-delay: 5

# ============================================
# SITEMAPS
# ============================================
Sitemap: ${new URL("sitemap-index.xml", siteURL).href}
Sitemap: ${new URL("sitemap-0.xml", siteURL).href}
Sitemap: ${new URL("rss.xml", siteURL).href}
`;

export const GET: APIRoute = ({ site }) => {
  const base = site ?? "https://pilotinstructionalcenter.com";

  return new Response(getRobotsTxt(base.toString()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
