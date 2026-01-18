import { getCategoriesBySlug } from "@/action/Category.action";
import { Metadata } from "next";
import CategoryByProduct from "./_component/CategoryByProduct";
import Breadcrumb from "@/app/_component/BreadCread";
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
  return (
    <main className="my-60 md:my-56 lg:my-46">
      <section className="bg-white py-6 border-b">
        <div>
          <div className="container mx-auto px-4">
            <h1 className="text-lg lg:text-3xl font-semibold mb-2">
              Category Products
            </h1>
            <nav className="text-sm text-gray-600">
              <Breadcrumb />
            </nav>
          </div>
        </div>
      </section>
      <CategoryByProduct />;
    </main>
  );
};

export default Page;
