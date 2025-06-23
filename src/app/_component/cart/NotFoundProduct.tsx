import { ShoppingBag } from "lucide-react";

const NotFoundProduct = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="mx-auto max-w-screen-sm text-center col-span-3 justify-center items-center self-center content-center place-items-center my-24 ">
      <div className="flex justify-center">
        <ShoppingBag className=" w-20 h-20 md:w-25 md:h-25 lg:w-28 lg:h-28 my-2 " />
      </div>
      <h1 className="mb-2 text-lg md:text-2xl tracking-tight font-extrabold lg:text-2xl text-primary-600 dark:text-primary-500 ">
        {title || "Not Found"}
      </h1>

      <p className="mb-4 text-sm md:text-md lg:text-lg font-light text-gray-500 dark:text-gray-400">
        {description || `Sorry, we can't find that product with the category.`}
      </p>
    </div>
  );
};

export default NotFoundProduct;
