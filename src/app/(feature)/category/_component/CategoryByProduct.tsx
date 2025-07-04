import { getCategories } from "@/action/Category.action";
import Breadcrumb from "@/app/_component/BreadCread";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import ProductFiltering from "./ProductFilter";

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

      <Suspense
        fallback={
          <div className="w-full flex justify-center min-h-96  items-center">
            <LoaderIcon
              className="animate-spin"
              size={48}
              strokeWidth={2}
              color="#2563eb"
            />
          </div>
        }
      >
        <ProductFiltering categories={categories} />
      </Suspense>
    </div>
  );
};

export default CategoryByProduct;
