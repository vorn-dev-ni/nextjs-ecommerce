import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_WEBSITEURL + "/",
      priority: 3,
    },
    {
      url: process.env.NEXT_PUBLIC_WEBSITEURL + "/login",
      priority: 1,
    },
    {
      url: process.env.NEXT_PUBLIC_WEBSITEURL + "/register",
      priority: 1,
    },
    {
      url: process.env.NEXT_PUBLIC_WEBSITEURL + "/category",
      priority: 2,
    },
  ];
}
