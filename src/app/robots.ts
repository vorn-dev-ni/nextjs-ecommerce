import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/order-history"],
    },
    sitemap: process.env.NEXT_PUBLIC_WEBSITEURL + "/sitemap.xml",
  };
}
