import { getCategories } from "@/action/Category.action";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import ProductFiltering from "./ProductFilter";

const CategoryByProduct = async () => {
  const categories = await getCategories();
  return (
    <div>
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
