export type Product = any;
export interface CategoryImageAttributes {
  url: string;
}

export interface CategoryImageData {
  id: number;
  attributes: CategoryImageAttributes;
}

export interface CategoryImage {
  data: CategoryImageData | null; // can be null if no image
}

export interface CategoryAttributes {
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string;
  publishedAt: string;
  image: CategoryImage;
}

export interface CategoryData {
  id: number;
  attributes: CategoryAttributes;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface CategoriesResponse {
  data: CategoryData[];
  meta: Meta;
}

// types/product.ts

export interface SizeData {
  id: number;
  attributes: {
    label: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    product_variant: {
      data: ProductVariant;
    };
  };
}

export interface ColorData {
  id: number;
  attributes: {
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    product_variant: {
      data: ProductVariant;
    };
  };
}
export interface ProductImageAttributes {
  url: string;
}

export interface ProductImageData {
  id: number;
  attributes: ProductImageAttributes;
}

export interface ProductImages {
  data: ProductImageData | null;
}

export interface ImageRelation {
  data: ImageData | null;
}

export interface ImageData {
  id: number;
  attributes: {
    url: string;
  };
}
export interface ProductVariantRelation {
  data: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  attributes: {
    sku: string;
    price: number;
    salePrice: number;
    qty: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Sizes: string;
    color: string;
    ColorCode: string;
    image: ImageRelation;
  };
}

export interface ProductAttributes {
  name: string;
  price: number;
  salePrice: number;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  qty: number;
  images: ImageRelation;
  product_variants?: ProductVariantRelation;
}

export interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ProductApiResponse {
  data: ProductData[];
  meta: {
    pagination: PaginationMeta;
  };
}

export type LoginResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
interface UserAttributes {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}
interface UserData {
  id: number;
  attributes: UserAttributes;
}

export interface UserCartItem {
  id: number;
  qty: number;
  product_variant: {
    data: ProductVariant | null;
  };
}
interface UserPermissionsUser {
  data: UserData | null;
}

export interface CartAttributes {
  amt: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  qty: number;
  userId: number;
  users_permissions_user: UserPermissionsUser;
  product_variant: { data: ProductVariant };
}

export interface CartData {
  id: number;
  attributes: CartAttributes;
}

export interface CartResponse {
  data: CartData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type UserProductCart = {
  qty: number;
  product_variant: number;
  price: number;
};

export type OrderState = {
  fullName: string;
  email: string;
  province?: string;
  zipCode: string;
  address: string;
  paymentId?: string;
  orderItem?: UserProductCart[];
};
export interface OrderItem {
  id: number;
  qty: number;
  price: number;
  product_variant: { data: ProductVariant };
}

export interface OrderAttributes {
  fullName: string;
  address: string;
  orderNum: string;
  zipcode: string;
  province: string;
  orderAmount: number;
  userId: number;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  method: string;
  status: "processing" | "completed" | "confirmed";
  email: string;
  orderItemList: OrderItem[];
}

export interface OrderData {
  id: number;
  attributes: OrderAttributes;
}

export interface OrderResponse {
  data: OrderData;
  meta: Meta;
}

export interface OrderHistoryResponse {
  data: OrderData[];
  meta: Meta;
}

export interface ImageAttributes {
  url: string;
}

export interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

export interface Image {
  data: ImageData | null; // could be null if no image
}

export interface ProductVariantAttributes {
  sku: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  qty: number;
  price: number;
  salePrice: number;
  image: Image;
}

export interface ProductVariantData {
  id: number;
  attributes: ProductVariant;
}

export interface ProductVariant {
  data: ProductVariantData | null;
}

export interface OrderItemList {
  id: number;
  qty: number;
  price: number;
  product_variant: ProductVariant;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}
