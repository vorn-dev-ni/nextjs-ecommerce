"use client";
import AppImage from "@/app/_component/AppImage";
import { ProductAttributes } from "@/types";

const ProductItem = ({ product }: { product: ProductAttributes }) => {
  return (
    <div
      className="group relative gap-4"
      onClick={() => {
        window.open(`/product/${product.slug}`, "_blank");
      }}
    >
      <AppImage
        imageUrl={product?.images?.data?.attributes?.url ?? ""}
        styles="aspect-square w-full rounded-md object-cover lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between items-center gap-5">
        <div>
          <h3 className="text-sm md:text-lg lg:text-xl text-gray-700 font-bold">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-between my-2">
        <p className="text-xl font-bold text-gray-900">${product.salePrice}</p>
        <p className="text-md font-medium text-gray-400  line-through">
          ${product.price}
        </p>
      </div>
      {product.qty < 10 && (
        <p className="text-sm font-bold text-red-500">
          Only {product.qty} left
        </p>
      )}
    </div>
  );
};

export default ProductItem;
