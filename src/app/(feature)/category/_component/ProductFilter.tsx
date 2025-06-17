"use client";
import Breadcrumb from "@/app/_component/BreadCread";
import { useFilterCategory } from "@/hook/useCategory";
import { filterAtom } from "@/lib/atom";
import { CategoriesResponse } from "@/types";
import { useAtom } from "jotai";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import CategoryListingFilter from "./CategoryListingFilter";
import ColorFilter from "./ColorFilter";

export default function ProductFilterTailwind({
  categories,
}: {
  categories: CategoriesResponse;
}) {
  const [filters, setFilters] = useAtom(filterAtom);
  const { data, isLoading, error } = useFilterCategory({
    queryKey: "filtered-categories",
    filters,
  });

  const toggleSize = (size: string) => {
    const currentSizes = filters.size || [];
    if (currentSizes.includes(size)) {
      setFilters((prev) => ({
        ...prev,
        size: currentSizes.filter((s) => s !== size),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        size: [...currentSizes, size],
      }));
    }
  };
  const handlePriceChange = ([min, max]: [number, number]) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 my-36">
      {/* Page Title*/}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-2">Category Products</h1>
          <nav className="text-sm text-gray-600">
            <Breadcrumb />
          </nav>
        </div>
      </section>

      {/* Content*/}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row -mx-4">
          {/* Categories*/}
          <aside className="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
            <div className="bg-white rounded">
              <div className="px-4 py-3 font-medium">Categories</div>
              <CategoryListingFilter categories={categories} />
            </div>

            {/* Price Range */}
            <div className="bg-white rounded my-4 pb-5">
              <div className="px-4 py-3 font-medium mb-2">Price ranges</div>
              <div className="px-4">
                <RangeSlider
                  min={0}
                  max={500}
                  step={10}
                  defaultValue={[
                    filters.minPrice ?? 0,
                    filters.maxPrice ?? 500,
                  ]}
                  onInput={handlePriceChange}
                />
                <div className="flex justify-between py-2">
                  <p className="text-md">${filters.minPrice ?? 0}</p>
                  <p className="text-md">${filters.maxPrice ?? 500}</p>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white rounded ">
              <div className="px-4 py-3 font-medium">Sizes</div>
              <div className="px-4 pb-4 flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded ${
                      filters?.size?.includes(size)
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <ColorFilter />
          </aside>

          {/* Products*/}
          <main className="w-full lg:w-3/4 px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <span>32 Items found</span>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <select className="border  px-3 py-2 focus:outline-none bg-white rounded-lg">
                  <option>Descending</option>
                  <option>Ascending</option>
                  {/* <option>Most Popular</option>
                  <option>Cheapest</option> */}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded shadow hover:shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={`https://via.placeholder.com/300x300?text=Item+${
                        i + 1
                      }`}
                      alt=""
                      className="w-full h-60 object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      NEW
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Product name goes here</h3>
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-lg font-semibold">$1280</span>
                      <span className="text-sm text-gray-500 line-through">
                        $1980
                      </span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
          </main>
        </div>
      </div>
    </div>
  );
}
