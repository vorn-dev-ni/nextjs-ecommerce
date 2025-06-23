"use client";
import {
  getProductSimilar,
  getSuggestionProducts,
} from "@/action/Product.action";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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

export const useProductSuggestion = ({
  queryKey,
  query,
}: {
  queryKey: string;
  query: string;
}) => {
  return useQuery({
    queryKey: [queryKey, query],
    enabled: true,
    placeholderData: keepPreviousData,

    queryFn: () =>
      getSuggestionProducts({
        query,
      }),
  });
};
