import { getCategoriesBySlug } from "@/action/Category.action";
import CategoryByProduct from "../_component/CategoryByProduct";
import { Metadata } from "next";
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
    title: `${category?.attributes?.name} | MyShop`,
    description: `Browse products under category ${category?.attributes?.name}. Find the best deals and offers.`,
    openGraph: {
      title: `${category?.attributes?.name} | MyShop`,
      description: `Browse products under category ${category?.attributes?.name}.`,
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const result = await getCategoriesBySlug(slug);

  const products = result.map(
    (product) => product.attributes?.product?.data
  )[0];
  return <CategoryByProduct products={products} />;
};

export default Page;
