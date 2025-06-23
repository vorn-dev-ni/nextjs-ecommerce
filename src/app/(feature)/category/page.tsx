import { getCategoriesBySlug } from "@/action/Category.action";
import { Metadata } from "next";
import CategoryByProduct from "./_component/CategoryByProduct";
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCategoriesBySlug(slug);
  const category = result?.[0];

  return {
    title: `GenzCommerce | ${category?.attributes?.name ?? "Category"}`,
    description: `Browse genz ecommerce under category ${
      category?.attributes?.name ?? "Category"
    }. Find the best deals and offers.`,
    keywords: ["ecommerce", "genz", "category", "search"],
    openGraph: {
      title: `GenzCommerce | ${category?.attributes?.name ?? "Category"}`,
      description: `Browse genz ecommerce under category ${
        category?.attributes?.name ?? "Category"
      }. Find the best deals and offers.`,
    },
  };
}

const Page = async () => {
  return <CategoryByProduct />;
};

export default Page;
