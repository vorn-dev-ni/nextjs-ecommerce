export const dynamic = "force-dynamic";

import { getProduct } from "@/action/Product.action";
import ProductItem from "./ProductItem";

export default async function ProductMainSection() {
  const products = await getProduct();
  return (
    <section className="py-4 bg-white w-full">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
        New Arrivals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 xl:gap-x-8">
        {products?.data.map((product, index) => (
          <ProductItem product={product.attributes} key={index} />
        ))}
      </div>
    </section>
  );
}
