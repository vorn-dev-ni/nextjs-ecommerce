"use client";
import NotFoundProduct from "./cart/NotFoundProduct";

const CategoryProduct = () => {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-24 lg:my-12">
      {/* <ProductItem  product={}/> */}

      <NotFoundProduct />
    </ul>
  );
};

export default CategoryProduct;
