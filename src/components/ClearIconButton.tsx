"use client";
import { clearButtonDomAtom, filterAtom } from "@/lib/atom";
import { useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
const ClearIconButton = ({ onClear }: { onClear: () => void }) => {
  const setClearFilter = useSetAtom(filterAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const setGlobalButtonDom = useSetAtom(clearButtonDomAtom);
  useEffect(() => {
    if (buttonRef.current) {
      setGlobalButtonDom(buttonRef.current);
    }
  }, [buttonRef]);

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        const params = new URLSearchParams(searchParams);
        params.delete("search");
        router.push(`/category?${params.toString()}`, {
          scroll: true,
        });
        setClearFilter((pre) => ({ ...pre, search: "" }));
        onClear();
      }}
      type="reset"
      className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
    >
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default ClearIconButton;
