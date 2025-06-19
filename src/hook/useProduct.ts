"use client";
import { getProductSimilar } from "@/action/Product.action";
import { useQuery } from "@tanstack/react-query";

export const useProductSimilar = ({
  queryKey,
  category,
  currentProductName,
}: {
  queryKey: string;
  category: string;
  currentProductName: string;
}) => {
  return useQuery({
    queryKey: [queryKey],
    enabled: !!(category && currentProductName),
    queryFn: () =>
      getProductSimilar({
        params: {
          category,
          currentProductName,
        },
      }),
  });
};
