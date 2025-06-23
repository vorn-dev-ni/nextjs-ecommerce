"use client";
import AppImage from "@/app/_component/AppImage";
import { ProductAttributes } from "@/types";

const ProductItem = ({ product }: { product: ProductAttributes }) => {
  return (
    <div
      className="group relative gap-4 bg-white shadow-sm rounded-lg pb-2"
      onClick={() => {
        window.open(`/product/${product.slug}`, "_blank");
      }}
    >
      <AppImage
        imageUrl={product?.images?.data?.attributes?.url ?? ""}
        styles="aspect-square w-full object-cover lg:aspect-auto lg:h-80"
      />
      <div className="flex flex-col justify-between h-[100px]">
        <div className="mt-4 flex justify-between items-center gap-5  w-full px-3">
          <div className="">
            <h5 className="text-lg md:text-lg lg:text-lg  font-medium line-clamp-1">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h5>
          </div>
        </div>
        <div className=" items-center justify-between w-full px-3 ">
          <p className="text-lg font-bold text-black">
            ${product.salePrice?.toFixed(2)}
          </p>
          <p className="text-sm font-bold text-red-300  line-through ">
            ${product.price?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
