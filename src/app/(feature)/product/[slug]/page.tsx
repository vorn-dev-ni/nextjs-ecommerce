import { getProductBySlug } from "@/action/Product.action";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ProductVariantV1 from "../_component/ProductVariant";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const previousMetadata = await parent;
  const previousImages = previousMetadata.openGraph?.images || [];
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  const singleProduct = product?.data[0]?.attributes;
  return {
    title: singleProduct?.name,
    description: singleProduct?.description,
    keywords: singleProduct?.name,
    openGraph: {
      title: singleProduct?.name,
      description: singleProduct?.description ?? "",
      type: "website",
      images: [
        {
          url: singleProduct?.images?.data?.attributes?.url ?? "",
          width: 1200,
          height: 630,
          alt: `product-${singleProduct?.name}`,
        },
        ...previousImages,
      ],
    },
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const filterProducts = await getProductBySlug(slug);
  if (!filterProducts) {
    return notFound();
  }
  const product = filterProducts?.data[0];
  const productVariants = product?.attributes?.product_variants?.data;

  return (
    <section className=" bg-white  py-14   dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        {product && productVariants && (
          <ProductVariantV1
            product={product}
            productVariants={productVariants!}
          />
        )}
      </div>
    </section>
  );
};

export default Page;
