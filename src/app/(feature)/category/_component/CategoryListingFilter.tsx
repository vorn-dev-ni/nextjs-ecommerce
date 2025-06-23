"use client";

import { filterAtom } from "@/lib/atom";
import { CategoriesResponse } from "@/types";
import { useAtom } from "jotai";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CategoryListingFilter = ({
  categories,
}: {
  categories: CategoriesResponse;
}) => {
  const [filters, setFilters] = useAtom(filterAtom);
  const searchParams = useSearchParams();
  const category = searchParams.get("name");

  const pathName = usePathname();
  useEffect(() => {
    if (category) {
      setFilters((pre) => ({ ...pre, categorySlug: category }));
    }
  }, [pathName, searchParams]);

  return (
    <div className="px-4 pb-4 space-y-2">
      {categories?.data?.map((brand) => (
        <h6
          onClick={() => {
            setFilters((pre) => ({
              ...pre,
              categorySlug: brand.attributes.name,
            }));
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("name", brand.attributes.name);
            window.history.replaceState(
              {},
              "",
              `${pathName}?${searchParams.toString()}`
            );
          }}
          className={`hover:cursor-pointer  ${
            brand.attributes.name == filters.categorySlug ? "text-blue-500" : ""
          }`}
          key={brand?.id}
        >
          {brand?.attributes?.name}
        </h6>
      ))}
    </div>
  );
};

export default CategoryListingFilter;
