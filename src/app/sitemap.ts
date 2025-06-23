import { getCategories } from "@/action/Category.action";
import { getBestProducts } from "@/action/Product.action";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const topProducts = await getBestProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: process.env.NEXT_PUBLIC_WEBSITEURL + "/", priority: 3 },
    { url: process.env.NEXT_PUBLIC_WEBSITEURL + "/login", priority: 1 },
    { url: process.env.NEXT_PUBLIC_WEBSITEURL + "/register", priority: 1 },
    { url: process.env.NEXT_PUBLIC_WEBSITEURL + "/about", priority: 2 },
    { url: process.env.NEXT_PUBLIC_WEBSITEURL + "/contact", priority: 2 },
    { url: process.env.NEXT_PUBLIC_WEBSITEURL + "/meet-team", priority: 2 },
    { url: process.env.NEXT_PUBLIC_WEBSITEURL + "/category", priority: 2 },
  ];
  const categoryRoutes: MetadataRoute.Sitemap = categories.data?.map(
    (slug) => ({
      url: `${process.env.NEXT_PUBLIC_WEBSITEURL}/category?name=${slug?.attributes?.name}`,
      priority: 2,
    })
  );

  const productRoutes: MetadataRoute.Sitemap = topProducts.data?.map(
    (prod) => ({
      url: `${process.env.NEXT_PUBLIC_WEBSITEURL}/product/${prod?.attributes?.name}`,
      priority: 2,
    })
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
