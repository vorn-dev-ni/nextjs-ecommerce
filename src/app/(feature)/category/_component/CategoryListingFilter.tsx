import { filterAtom } from "@/lib/atom";
import { CategoriesResponse } from "@/types";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const CategoryListingFilter = ({
  categories,
}: {
  categories: CategoriesResponse;
}) => {
  const [filters, setFilters] = useAtom(filterAtom);
  const pathName = usePathname();
  useEffect(() => {
    const selected = pathName?.split("/")[2];

    setFilters((pre) => ({ ...pre, categorySlug: selected }));
  }, [pathName]);

  console.log(filters);
  return (
    <div className="px-4 pb-4 space-y-2">
      {categories?.data?.map((brand) => (
        <h6
          onClick={() => {
            console.log(brand.id);
            setFilters((pre) => ({
              ...pre,
              categorySlug: brand.attributes.name,
            }));
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
