import { getCategories, getFilteredCategories } from "@/action/Category.action";
import { FilterOptions } from "@/lib/atom";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategory = ({ queryKey }: { queryKey: string }) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getCategories,
  });
};

interface UseFilterCategoryProps {
  queryKey: string;
  filters: FilterOptions;
  enabled?: boolean;
}

export const useFilterCategory = ({
  queryKey,
  filters,
  enabled = true,
}: UseFilterCategoryProps) => {
  return useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => getFilteredCategories(filters),
    enabled,
  });
};
