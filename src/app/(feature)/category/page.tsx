import { getCategoriesBySlug } from "@/action/Category.action";
import { Metadata } from "next";
import CategoryByProduct from "./_component/CategoryByProduct";
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const searchParamsObj = await searchParams;
  const categorySlug = searchParamsObj.name ?? "all";

  const result =
    categorySlug != "all"
      ? await getCategoriesBySlug(categorySlug as string)
      : null;
  const name = result?.[0]?.attributes?.name ?? "General";
  return {
    title: `GenzCommerce | ${name}`,
    description: `Browse genz ecommerce under category ${name}. Find the best deals and offers.`,
    keywords: ["ecommerce", "genz", "category", "search"],
    openGraph: {
      title: `GenzCommerce | ${name}`,
      description: `Browse genz ecommerce under category ${name}. Find the best deals and offers.`,
    },
  };
}

const Page = async () => {
  return <CategoryByProduct />;
};

export default Page;
