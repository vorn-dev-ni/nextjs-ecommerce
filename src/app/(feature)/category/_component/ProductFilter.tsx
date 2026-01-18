"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NotFoundProduct from "@/app/_component/cart/NotFoundProduct";
import ProductItem from "@/components/ProductItem";
import { useFilterCategory } from "@/hook/useCategory";
import { filterAtom } from "@/lib/atom";
import { CategoriesResponse } from "@/types";
import { useAtom } from "jotai";
import { debounce } from "lodash";
import { Filter, FilterIcon, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import CategoryListingFilter from "./CategoryListingFilter";
import ColorFilter from "./ColorFilter";
import Paging from "./Paging";

export default function ProductFilterTailwind({
  categories,
}: {
  categories: CategoriesResponse;
}) {
  const [filters, setFilters] = useAtom(filterAtom);
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useFilterCategory({
    queryKey: "filtered-categories",
    filters,
    enabled: true,
  });
  const pathName = usePathname();
  const [colorFilters, setColorFilter] = useState<any[]>([]);
  const [sizeFilters, setSizesFilters] = useState<string[]>([]);
  const [rangeSlideKey, setrangeSlideKey] = useState(0);
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
    updateURL(min, max);
  };
  const updateURL = useCallback(
    debounce((min: number, max: number) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("min", min.toString());
      searchParams.set("max", max.toString());
      window.history.replaceState(
        {},
        "",
        `${pathName}?${searchParams.toString()}`
      );
    }, 500),
    [pathName]
  );
  const onClearFilter = () => {
    window.location.assign(pathName);
  };
  const removeSize = (sizeToRemove: string) => {
    const sizes = filters!.size!.filter((s) => s !== sizeToRemove);

    setFilters((prev) => ({
      ...prev,
      size: sizes,
    }));
    if (sizes?.length <= 1) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("size");
      window.history.replaceState(
        {},
        "",
        decodeURIComponent(`${pathName}?${searchParams.toString()}`)
      );
    }
  };

  const removeCategory = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("name");
    window.history.replaceState(
      {},
      "",
      `${pathName}?${searchParams.toString()}`
    );
    setFilters((prev) => ({
      ...prev,
      categorySlug: "",
    }));
  };

  const removeColor = (colorToRemove: string) => {
    const colors = filters!.color!.filter((c) => c !== colorToRemove);
    setFilters((prev) => ({
      ...prev,
      color: colors,
    }));
    if (colors?.length <= 1) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("color");
      window.history.replaceState(
        {},
        "",
        decodeURIComponent(`${pathName}?${searchParams.toString()}`)
      );
    }
  };

  const removePrice = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: 1,
      maxPrice: 1000,
    }));
    setrangeSlideKey((pre) => pre + 1);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("min");
    searchParams.delete("max");
    window.history.replaceState(
      {},
      "",
      `${pathName}?${searchParams.toString()}`
    );
  };
  const goToPage = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("pageSize", page?.toString());

    window.history.replaceState(
      {},
      "",
      `${pathName}${searchParams.toString()}`
    );
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const totalPages = useMemo(
    () => data?.meta?.pagination?.pageCount ?? 1,
    [data]
  );

  useEffect(() => {
    if (!isLoading && data) {
      const sizes = data?.data?.flatMap((item) => {
        return item.attributes?.product_variants?.data?.flatMap(
          (prod) => prod.attributes?.Sizes
        );
      });
      const uniqueSizes = [...new Set(sizes.filter((size) => size != null))];

      setSizesFilters(uniqueSizes);
    }
  }, [data, isLoading]);
  useEffect(() => {
    if (!isLoading && data) {
      const colors = data?.data?.flatMap((item) => {
        return item.attributes?.product_variants?.data?.flatMap((prod) => ({
          label: prod.attributes?.color,
          value: prod.attributes?.ColorCode,
        }));
      });
      const uniqueColors = colors.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t?.label === value?.label)
      );

      setColorFilter(uniqueColors);
    }
  }, [data, isLoading]);

  useEffect(() => {
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const orderBy = searchParams.get("orderBy");
    const page = searchParams.get("page");
    const color = searchParams.get("color")?.split(",");
    const sizes = searchParams.get("size")?.split(",");
    const search = searchParams.get("search");

    setFilters((pre) => ({
      ...pre,
      maxPrice: max ? parseFloat(max) : 1000,
      minPrice: min ? parseFloat(min) : 1,
      page: page ? parseInt(page) : 1,
      color: color?.length ? color : [],
      size: sizes?.length ? sizes : [],
      search: search ?? "",
      orderBy: orderBy
        ? ["desc", "asc"].includes(orderBy)
          ? orderBy
          : "desc"
        : "desc",
    }));
  }, []);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const colors = filters.color?.join(",");
    if (colors) {
      searchParams.set("color", colors!);
      window.history.replaceState(
        {},
        "",
        decodeURIComponent(`${pathName}?${searchParams.toString()}`)
      );
    }
  }, [filters.color]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sizes = filters.size?.join(",");
    searchParams.set("size", sizes!);
    if (sizes) {
      window.history.replaceState(
        {},
        "",
        decodeURIComponent(`${pathName}?${searchParams.toString()}`)
      );
    }
  }, [filters.size]);

  if (error) {
    throw new Error(error?.message);
  }

  return (
    <div className=" bg-gray-50 text-gray-800 ">
      {/* Content*/}
      <div className=" md:block container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row -mx-4">
          {/* Categories*/}
          <aside className="hidden md:block w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
            <div className="bg-white rounded my-3  pb-2">
              <div className="flex justify-between">
                <div className="px-4 py-2 font-medium">Filters</div>
                <div
                  className="px-4 py-3 font-light text-sm text-red-400 hover:cursor-pointer"
                  onClick={onClearFilter}
                >
                  Clear All
                </div>
              </div>

              <div className="flex flex-wrap gap-2 px-4 hover:cursor-pointer">
                {filters?.size?.map((size) => (
                  <span
                    key={size}
                    className="flex items-center px-3 py-1 rounded-sm border-2"
                  >
                    {size}
                    <button
                      onClick={() => removeSize(size)}
                      className="ml-1 hover:cursor-pointer"
                    >
                      <X className="w-5 h-4 text-gray-500" />
                    </button>
                  </span>
                ))}

                {filters?.categorySlug && filters?.categorySlug != "all" && (
                  <span
                    onClick={() => {
                      removeCategory();
                    }}
                    className="flex items-center px-3 py-1 rounded-sm border-2"
                  >
                    {filters?.categorySlug}
                    <button
                      onClick={() => {
                        removeCategory();
                      }}
                      className="ml-1 hover:cursor-pointer"
                    >
                      <X className="w-5 h-4 text-gray-500" />
                    </button>
                  </span>
                )}
                {filters?.color?.length
                  ? filters.color.map((colorLabel) => (
                      <span
                        onClick={() => removeColor(colorLabel)}
                        key={colorLabel}
                        className="flex items-center px-3 py-1 rounded-sm border-2 hover:cursor-pointer"
                      >
                        {colorLabel}
                        <button
                          onClick={() => removeColor(colorLabel)}
                          className="ml-1 hover:cursor-pointer"
                        >
                          <X className="w-5 h-4 text-gray-500" />
                        </button>
                      </span>
                    ))
                  : null}

                {filters.maxPrice != 1000 || filters.minPrice != 1 ? (
                  <span
                    onClick={() => removePrice()}
                    className="flex items-center  px-3 py-1 rounded-sm border-2  hover:cursor-pointer"
                  >
                    ${filters.minPrice} - ${filters.maxPrice}
                    <button
                      onClick={() => removePrice()}
                      className="ml-2  hover:cursor-pointer"
                    >
                      <X className="w-5 h-4 text-gray-500" />
                    </button>
                  </span>
                ) : null}
              </div>
            </div>
            <div className="bg-white rounded">
              <div className="px-4 py-3 font-medium">Categories</div>
              <CategoryListingFilter categories={categories} />
            </div>

            {/* Price Range */}
            <section className="bg-white rounded my-4 pb-5">
              <div className="px-4 py-3 font-medium mb-2">Price ranges</div>
              <div className="px-4">
                <RangeSlider
                  min={1}
                  max={1000}
                  step={10}
                  value={[filters.minPrice ?? 0, filters.maxPrice ?? 1000]}
                  key={rangeSlideKey}
                  onInput={handlePriceChange}
                />
                <div className="flex justify-between py-2">
                  <p className="text-md">${filters.minPrice ?? 0}</p>
                  <p className="text-md">${filters.maxPrice ?? 500}</p>
                </div>
              </div>
            </section>

            {/* Sizes */}

            {sizeFilters?.length ? (
              <div className="bg-white rounded ">
                <div className="px-4 py-3 font-medium">Sizes</div>
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  {sizeFilters.map((size) => (
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
            ) : null}

            {/* Colors */}
            {colorFilters?.length ? (
              <ColorFilter colors={colorFilters} />
            ) : null}
          </aside>

          {/* Products*/}
          <main className="w-full lg:w-3/4 px-4">
            <div className="flex flex-row items-center justify-between mb-4">
              <span className="text-sm md:text-md pt-2 md:pt-0">
                {data?.data?.length} Items found
              </span>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <select
                  value={filters?.orderBy}
                  className="form-select block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  onChange={(event) => {
                    const sortBy = event.currentTarget.value;
                    setFilters((pre) => ({ ...pre, orderBy: sortBy }));
                    const searchParams = new URLSearchParams(
                      window.location.search
                    );
                    searchParams.set("orderBy", sortBy);
                    window.history.replaceState(
                      {},
                      "",
                      `${pathName}?${searchParams.toString()}`
                    );
                  }}
                >
                  <option value={"desc"}>Descending</option>
                  <option value={"asc"}>Ascending</option>
                </select>

                <Sheet>
                  <SheetTrigger asChild>
                    <button
                      className=" md:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      Filters
                      <Filter className="ml-2 w-4 h-4" />
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription asChild>
                        <aside className=" w-full lg:w-full">
                          <div className="bg-white rounded my-3  pb-2">
                            <div className="flex justify-between">
                              <div className="px-4 py-2 font-medium">
                                Filters
                              </div>
                              <div
                                className="px-4 py-3 font-light text-sm text-red-400 hover:cursor-pointer"
                                onClick={onClearFilter}
                              >
                                Clear All
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 px-4 hover:cursor-pointer">
                              {filters?.size?.map((size) => (
                                <span
                                  key={size}
                                  className="flex items-center px-3 py-1 rounded-sm border-2"
                                >
                                  {size}
                                  <button
                                    onClick={() => removeSize(size)}
                                    className="ml-1 hover:cursor-pointer"
                                  >
                                    <X className="w-5 h-4 text-gray-500" />
                                  </button>
                                </span>
                              ))}

                              {filters?.categorySlug &&
                                filters?.categorySlug != "all" && (
                                  <span
                                    onClick={() => {
                                      removeCategory();
                                    }}
                                    className="flex items-center px-3 py-1 rounded-sm border-2"
                                  >
                                    {filters?.categorySlug}
                                    <button
                                      onClick={() => {
                                        removeCategory();
                                      }}
                                      className="ml-1 hover:cursor-pointer"
                                    >
                                      <X className="w-5 h-4 text-gray-500" />
                                    </button>
                                  </span>
                                )}
                              {filters?.color?.length
                                ? filters.color.map((colorLabel) => (
                                    <span
                                      onClick={() => removeColor(colorLabel)}
                                      key={colorLabel}
                                      className="flex items-center px-3 py-1 rounded-sm border-2 hover:cursor-pointer"
                                    >
                                      {colorLabel}
                                      <button
                                        onClick={() => removeColor(colorLabel)}
                                        className="ml-1 hover:cursor-pointer"
                                      >
                                        <X className="w-5 h-4 text-gray-500" />
                                      </button>
                                    </span>
                                  ))
                                : null}

                              {filters.maxPrice != 1000 ||
                              filters.minPrice != 1 ? (
                                <span
                                  onClick={() => removePrice()}
                                  className="flex items-center  px-3 py-1 rounded-sm border-2  hover:cursor-pointer"
                                >
                                  ${filters.minPrice} - ${filters.maxPrice}
                                  <button
                                    onClick={() => removePrice()}
                                    className="ml-2  hover:cursor-pointer"
                                  >
                                    <X className="w-5 h-4 text-gray-500" />
                                  </button>
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="bg-white rounded">
                            <div className="px-4 py-3 font-medium">
                              Categories
                            </div>
                            <CategoryListingFilter categories={categories} />
                          </div>

                          {/* Price Range */}
                          <section className="bg-white rounded my-4 pb-5">
                            <div className="px-4 py-3 font-medium mb-2">
                              Price ranges
                            </div>
                            <div className="px-4">
                              <RangeSlider
                                min={1}
                                max={1000}
                                step={10}
                                value={[
                                  filters.minPrice ?? 0,
                                  filters.maxPrice ?? 1000,
                                ]}
                                key={rangeSlideKey}
                                onInput={handlePriceChange}
                              />
                              <div className="flex justify-between py-2">
                                <p className="text-md">
                                  ${filters.minPrice ?? 0}
                                </p>
                                <p className="text-md">
                                  ${filters.maxPrice ?? 500}
                                </p>
                              </div>
                            </div>
                          </section>

                          {/* Sizes */}

                          {sizeFilters?.length ? (
                            <div className="bg-white rounded ">
                              <div className="px-4 py-3 font-medium">Sizes</div>
                              <div className="px-4 pb-4 flex flex-wrap gap-2">
                                {sizeFilters.map((size) => (
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
                          ) : null}

                          {/* Colors */}
                          {colorFilters?.length ? (
                            <ColorFilter colors={colorFilters} />
                          ) : null}
                        </aside>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton height={410} className="rounded-xl" />
                <Skeleton height={410} className="rounded-xl" />
                <Skeleton height={410} className="rounded-xl" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {!data?.data?.length && !isLoading ? (
                  <NotFoundProduct />
                ) : (
                  data?.data?.map((product: any) => (
                    <ProductItem
                      key={product.id}
                      product={product?.attributes}
                    />
                  ))
                )}
              </div>
            )}

            <Paging goToPage={goToPage} totalPages={totalPages} />
          </main>
        </div>
      </div>
    </div>
  );
}
