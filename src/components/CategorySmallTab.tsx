"use client";
import { CategoryData } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";

type Props = {
  category: CategoryData[];
};

const CategorySmallTab: React.FC<Props> = ({ category }) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("name");
  const padding = category?.length >= 10 ? `px-10` : `px-0`;
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 top-0 z-30 w-full m-auto flex justify-center relative overflow-hidden">
      {category?.length >= 10 && (
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-white dark:bg-gray-900 p-2 shadow-md rounded-full ${padding}`}
          aria-label="Scroll Left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <ul
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar text-md font-medium text-gray-500 dark:text-gray-400 space-x-2 pt-2 scroll-smooth overflow-y-hidden"
      >
        {category?.map((tab, i) => (
          <li key={i} className="hover:bg-blue-50 h-16 flex items-center">
            <Link
              href={`/category?name=${tab?.attributes?.name}`}
              className={`inline-block whitespace-nowrap px-4 py-5 rounded-lg ${
                selectedCategory?.toLowerCase() === tab?.attributes?.name
                  ? "text-blue-500 rounded-none border-b-5 border-blue-500"
                  : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white rounded-none border-transparent border-b-5"
              }`}
            >
              {tab?.attributes?.name}
            </Link>
          </li>
        ))}
      </ul>

      {category?.length >= 10 && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-white dark:bg-gray-900 p-2 shadow-md rounded-full"
          aria-label="Scroll Right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default CategorySmallTab;
