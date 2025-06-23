import { getCategories } from "@/action/Category.action";
import Breadcrumb from "@/app/_component/BreadCread";
import ProductFilterTailwind from "./ProductFilter";
import { Suspense } from "react";

const CategoryByProduct = async () => {
  const categories = await getCategories();
  return (
    <div className="my-60 md:my-56 lg:my-46">
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

      <Suspense>
        <ProductFilterTailwind categories={categories} />
      </Suspense>
    </div>
  );
};

export default CategoryByProduct;
