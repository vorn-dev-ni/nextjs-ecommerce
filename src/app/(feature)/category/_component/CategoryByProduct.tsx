import Breadcrumb from "@/app/_component/BreadCread";
import NotFoundProduct from "@/app/_component/cart/NotFoundProduct";
import ProductItem from "@/components/ProductItem";
import { ProductData } from "@/types";

const CategoryByProduct = ({ products }: { products: ProductData[] }) => {
  return (
    <div className="my-36">
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg lg:text-3xl font-semibold mb-2">
              Category Products
            </h1>
            <nav className="text-sm text-gray-600">
              <Breadcrumb />
            </nav>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {!products?.length ? (
          <NotFoundProduct />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products?.map((product) => (
              <ProductItem key={product.id} product={product?.attributes} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryByProduct;
