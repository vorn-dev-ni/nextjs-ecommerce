"use client";
import ProductZoomImage from "@/app/_component/ImageZoom";

const ProductDetailImage = ({
  selectedImageUrl,
}: {
  selectedImageUrl: string;
}) => {
  return (
    <div className="  md:max-w-md mx-auto">
      <ProductZoomImage imageUrl={selectedImageUrl ?? ""} />
    </div>
  );
};

export default ProductDetailImage;
