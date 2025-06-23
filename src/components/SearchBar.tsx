"use client";
import { useProductSuggestion } from "@/hook/useProduct";
import { filterAtom, recentSearchAtom } from "@/lib/atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { debounce } from "lodash";
import { Search, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useRef, useState } from "react";
import ClearIconButton from "./ClearIconButton";
import NotFoundProduct from "@/app/_component/cart/NotFoundProduct";

const SearchBar = () => {
  const setFilters = useSetAtom(filterAtom);
  const { search: filterSearch } = useAtomValue(filterAtom);
  const [recentSearch, setRecentSearch] = useAtom(recentSearchAtom);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(filterSearch ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: suggestions } = useProductSuggestion({
    queryKey: "product-suggestion-search",
    query: inputValue ?? "",
  });
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const filteredSuggestions = suggestions?.data;
  const handleSetRecent = (search: string) => {
    if (recentSearch?.length >= 8) {
      setRecentSearch((pre) => {
        const updated = [...pre];
        updated[8] = search;
        return updated;
      });
    } else {
      setRecentSearch((pre) => pre.concat(search));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search =
      formData.get("search")?.toString().trim().toLowerCase() || "";
    const params = new URLSearchParams(window.location.search);
    inputRef?.current && inputRef?.current?.blur();
    setShowSuggestions(false);
    if (search) {
      setFilters((prev) => ({
        ...prev,
        search,
      }));
      handleSetRecent(search);
      params.set("search", search);
    } else {
      setFilters((prev) => ({
        ...prev,
        search: "",
      }));
      params.delete("search");
    }
    router.push(`/category?${params.toString()}`, {
      scroll: true,
    });
  };

  const debouncedSetInputValue = useCallback(
    debounce((value) => {
      setInputValue(value.trim().toLowerCase());
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(true);
    debouncedSetInputValue(e.target.value);
  };

  return (
    <form
      className="flex w-full"
      method="GET"
      onSubmit={handleSubmit}
      action=""
    >
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>

      <div className="relative w-full ">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          defaultValue={filterSearch}
          onChange={handleChange}
          onFocus={() => {
            setShowSuggestions(true);
          }}
          id="simple-search"
          name="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pe-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search product name..."
        />

        {showSuggestions && (
          <ul className="block w-full h-96 absolute z-[2000] bg-white  shadow-lg px-4 container rounded-none top-11">
            <section>
              {inputValue ? (
                filteredSuggestions && filteredSuggestions?.length > 0 ? (
                  filteredSuggestions.map((item, idx) => (
                    <div className="flex gap-2 items-center" key={item?.id}>
                      <ShoppingBag className="w-5 h-5" />
                      <li
                        className="text-md font-normal mb-4 hover:cursor-pointer mt-4"
                        onClick={() => {
                          setFilters((pre) => ({
                            ...pre,
                            search: item.attributes?.name,
                          }));
                          setShowSuggestions(false);
                          if (inputRef.current) {
                            inputRef.current.value = item.attributes?.name;
                            btnRef.current && btnRef.current?.click();
                          }
                        }}
                      >
                        {item?.attributes?.name}
                      </li>
                    </div>
                  ))
                ) : (
                  <section className="recent">
                    <div className="flex justify-between">
                      <h5 className="text-lg font-semibold mt-2 mb-2">
                        Recent Searches
                      </h5>

                      {!!recentSearch?.length && (
                        <button
                          className="hover:cursor-pointer z-0"
                          type="button"
                          onClick={() => {
                            setRecentSearch([]);
                          }}
                        >
                          <Trash2 />
                        </button>
                      )}
                    </div>
                    {recentSearch.toReversed().map((recent, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 items-center mb-3 hover:cursor-pointer"
                        onClick={() => {
                          setShowSuggestions(false);
                          setFilters((pre) => ({ ...pre, search: recent }));

                          if (inputRef.current) {
                            inputRef.current.value = recent;
                            btnRef.current && btnRef.current?.click();
                          }
                        }}
                      >
                        <Search className="w-4 h-4" />
                        <p className="text-md font-normal">{recent}</p>
                      </li>
                    ))}
                  </section>
                )
              ) : (
                <section className="recent">
                  <div className="flex justify-between">
                    <h5 className="text-lg font-semibold mt-5 mb-2">
                      Recent Searches
                    </h5>

                    {!!recentSearch?.length && (
                      <button
                        className="hover:cursor-pointer z-0"
                        type="button"
                        onClick={() => {
                          setRecentSearch([]);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {!!!recentSearch?.length && (
                    <div className="mt-[-50px] flex ">
                      <NotFoundProduct
                        title="No Recent"
                        description="No recent search in your browser history."
                      />
                    </div>
                  )}

                  {recentSearch.toReversed().map((recent, idx) => (
                    <li
                      key={idx}
                      className="flex gap-2 items-center mb-3 hover:cursor-pointer mt-2"
                      onClick={() => {
                        setShowSuggestions(false);
                        setFilters((pre) => ({ ...pre, search: recent }));

                        if (inputRef.current) {
                          inputRef.current.value = recent;
                          btnRef.current && btnRef.current?.click();
                        }
                      }}
                    >
                      <Search className="w-4 h-4" />
                      <p className="text-md font-normal">{recent}</p>
                    </li>
                  ))}
                </section>
              )}
            </section>
          </ul>
        )}

        <Suspense>
          <ClearIconButton onClear={() => setShowSuggestions(false)} />
        </Suspense>
      </div>
      {showSuggestions && (
        <div
          onClick={() => {
            setShowSuggestions(false);
          }}
          className="absolute z-[500] left-0 right-0 top-[230px] lg:top-[83px] rounded-none h-screen w-screen backdrop-blur-lg"
        />
      )}

      <button
        type="submit"
        ref={btnRef}
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-600 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
