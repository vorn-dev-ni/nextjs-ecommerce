import axiosInstance from "@/lib/api";
import { FilterOptions } from "@/lib/atom";
import { CategoriesResponse, ProductApiResponse, ProductData } from "@/types";

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/categories?populate[image][fields]=url`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data;
}

export async function getCategoriesBySlug(
  slug: string
): Promise<CategoryData[]> {
  const categories = await axiosInstance.get<CategoryResponse>(
    slug != "all"
      ? `/categories?filters[name][$eq]=${slug}&populate[product][populate][images][populate]=*&pagination[pageSize]=1`
      : `/categories?populate[product][populate][images][populate]=*&pagination[pageSize]=1`
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
  if (filters.categorySlug && filters.categorySlug != "all") {
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
      "filters[product_variants][color][$in]",
      filters.color.map((c) => c).join(",")
    );
  }

  if (filters?.search) {
    params.append("filters[name][$containsi]", filters.search);
  }

  if (filters.size && filters.size.length > 0) {
    params.append(
      "filters[product_variants][Sizes][$in]",
      filters.size.join(",")
    );
  }

  if (filters.page !== undefined) {
    params.append("pagination[page]", filters.page.toString());
  }

  if (filters.pageSize !== undefined) {
    params.append("pagination[pageSize]", filters.pageSize.toString());
  }
  if (filters.orderBy !== undefined) {
    params.append("sort[0]", `id:${filters.orderBy?.toLowerCase()}`);
  }

  try {
    const response = await axiosInstance.get<ProductApiResponse>(
      `/products?${decodeURIComponent(params.toString())}`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch filtered products:", error);
    throw error;
  }
}
