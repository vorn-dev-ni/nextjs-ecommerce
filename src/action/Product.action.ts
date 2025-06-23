import axiosInstance from "@/lib/api";
import { ProductApiResponse } from "@/types";

export async function getProduct(): Promise<ProductApiResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/products?populate[images][fields]=url`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data: ProductApiResponse = await res.json();
  return data;
}

export async function getProductSimilar({
  params,
}: {
  params: {
    category: string;
    currentProductName: string;
  };
}): Promise<ProductApiResponse> {
  try {
    const category = params.category;
    const productName = params.currentProductName;
    const response = await axiosInstance.get(
      `/products?filters[categories][name][$eq]=${category}&filters[name][$ne]=${productName}&populate=*`
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function getProductBySlug(
  slug: string
): Promise<ProductApiResponse> {
  try {
    const product = await axiosInstance.get(
      `/products
?filters[slug][$eq]=${slug}
&pagination[limit]=1
&populate[images][fields][0]=url
&populate[product_variants][populate][size][populate]=*
&populate[product_variants][populate][color][populate]=*
&populate[product_variants][populate][image][fields][0]=url
&populate[categories]=*
`
    );

    return product?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function getSuggestionProducts({
  query,
}: {
  query: string;
}): Promise<ProductApiResponse> {
  const products = await axiosInstance.get(
    `/products?filters[name][$containsi]=${query
      ?.trim()
      ?.toLowerCase()}&pagination[pageSize]=10`
  );

  return products?.data;
}
