"use client";
import ProductZoomImage from "@/app/_component/ImageZoom";

const ProductDetailImage = ({
  selectedImageUrl,
}: {
  selectedImageUrl: string;
}) => {
  return <ProductZoomImage imageUrl={selectedImageUrl ?? ""} />;
};

export default ProductDetailImage;
