"use client";
import { CategoriesResponse } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CategoryListing = ({
  categories,
}: {
  categories: CategoriesResponse;
}) => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("name");

  return (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {categories?.data?.map((category) => (
        <li key={category?.id}>
          <Link
            href={`/category?name=${category.attributes?.name}`}
            className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 
                
                ${
                  selectedCategory
                    ?.toLowerCase()
                    ?.includes(category?.attributes?.name)
                    ? `text-blue-500`
                    : `text-gray-900`
                }`}
          >
            {category?.attributes?.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryListing;
