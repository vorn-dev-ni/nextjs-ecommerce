import axiosInstance from "@/lib/api";
import { ProductApiResponse } from "@/types";

export async function getProduct(): Promise<ProductApiResponse> {
  try {
    const product = await axiosInstance.get(
      `/products?[populate][images][fields]=url`
    );

    return product?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function getProductBySlug(
  slug: string
): Promise<ProductApiResponse> {
  try {
    // http://localhost:1337/api/products?filters[slug][$eq]=women-under-shirt&pagination[limit]=1&populate[images][fields][0]=url&populate[product_variants][populate][color][populate]=image&populate[product_variants][populate][size][populate]
    const product = await axiosInstance.get(
      `/products
?filters[slug][$eq]=${slug}
&pagination[limit]=1
&populate[images][fields][0]=url
&populate[product_variants][populate][size][populate]=*
&populate[product_variants][populate][color][populate]=*
&populate[product_variants][populate][image][fields][0]=url
`
    );

    return product?.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
