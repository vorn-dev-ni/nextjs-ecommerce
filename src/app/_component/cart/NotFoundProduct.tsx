import { ShoppingBag } from "lucide-react";

const NotFoundProduct = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="mx-auto max-w-screen-sm text-center col-span-3 justify-center items-center self-center content-center place-items-center my-24">
      <ShoppingBag className="w-30 h-30 my-2 " />
      <h1 className="mb-4 text-2xl tracking-tight font-extrabold lg:text-2xl text-primary-600 dark:text-primary-500 ">
        {title || "Not Found"}
      </h1>

      <p className="mb-4 text-md font-light text-gray-500 dark:text-gray-400">
        {description || `Sorry, we can't find that product with the category.`}
      </p>
    </div>
  );
};

export default NotFoundProduct;
