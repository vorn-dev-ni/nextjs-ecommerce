import axiosInstance from "@/lib/api";
import { FilterOptions } from "@/lib/atom";
import { CategoriesResponse, ProductData } from "@/types";

export interface CategoryData {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    product: {
      data: ProductData[];
    };
  };
}

export interface CategoryResponse {
  data: CategoryData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function getCategories(): Promise<CategoriesResponse> {
  console.log(process.env.NEXT_PUBLIC_BASEURL);
  const categories = await axiosInstance.get(
    `/categories?populate[image][fields]=url`
  );

  return categories?.data;
}
export async function getCategoriesBySlug(
  slug: string
): Promise<CategoryData[]> {
  const categories = await axiosInstance.get<CategoryResponse>(
    slug != "all"
      ? `/categories?filters[name][$eq]=${slug}&populate[product][populate][images][populate]=*`
      : `/categories?populate[product][populate][images][populate]=*`
  );

  // console.log("getCategoriesBySlug", categories.data?.data?.length);
  return categories?.data?.data;
}

export async function getFilteredCategories(
  filters: FilterOptions & { page?: number; pageSize?: number }
) {
  const params = new URLSearchParams();

  params.append("populate[product_variants][populate][color]", "true");
  params.append("populate[product_variants][populate][size]", "true");
  params.append("populate[categories]", "true");
  params.append("populate[images]", "true");

  if (filters.categorySlug) {
    params.append("filters[categories][name][$eq]", filters.categorySlug);
  }

  if (filters.minPrice !== undefined) {
    params.append(
      "filters[product_variants][price][$gte]",
      filters.minPrice.toString()
    );
  }

  if (filters.maxPrice !== undefined) {
    params.append(
      "filters[product_variants][price][$lte]",
      filters.maxPrice.toString()
    );
  }

  if (filters.color && filters.color.length > 0) {
    params.append(
      "filters[product_variants][color][name][$in]",
      filters.color.map((c) => c.toLowerCase()).join(",")
    );
  }

  if (filters.size && filters.size.length > 0) {
    params.append(
      "filters[product_variants][size][name][$in]",
      filters.size.join(",")
    );
  }

  if (filters.page !== undefined) {
    params.append("pagination[page]", filters.page.toString());
  }

  if (filters.pageSize !== undefined) {
    params.append("pagination[pageSize]", filters.pageSize.toString());
  }

  try {
    const response = await axiosInstance.get(
      `/products?${decodeURIComponent(params.toString())}`
    );

    console.log("Product is", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch filtered products:", error);
    throw error;
  }
}
