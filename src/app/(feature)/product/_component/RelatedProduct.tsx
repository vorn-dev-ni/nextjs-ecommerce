"use client";

import ProductItem from "@/components/ProductItem";
import { useProductSimilar } from "@/hook/useProduct";
import Skeleton from "react-loading-skeleton";

const RelatedProduct = ({
  category,
  currProductName,
}: {
  category: string;
  currProductName: string;
}) => {
  const {
    data: similarProducts,
    isError,
    isLoading,
    isPending,
  } = useProductSimilar({
    queryKey: "similar-products",
    category,
    currentProductName: currProductName,
  });

  if (isLoading || !similarProducts?.data?.length || isError) {
    return null;
  }

  return (
    <div className=" col-span-full">
      <h6 className="text-lg font-medium text-center my-12">
        You may also like
      </h6>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 xl:gap-x-8">
        {isLoading || isPending
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton height={200} />
                <div className="mt-4">
                  <Skeleton height={20} width={`80%`} />
                  <Skeleton height={20} width={`60%`} />
                </div>
              </div>
            ))
          : similarProducts?.data.map((product, index) => (
              <ProductItem product={product.attributes} key={index} />
            ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
