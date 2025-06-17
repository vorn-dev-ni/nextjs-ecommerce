// atoms/authAtom.ts
import { CartData } from "@/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type User = { userId: string; email?: string; token: string } | null;
const defaultFilter = {
  categorySlug: "",
  color: [] as string[],
  minPrice: 1,
  maxPrice: 1000,
  page: 1,
  pageSize: 12,
  size: [] as string[],
};
export type FilterOptions = {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string[];
  size?: string[];
  page?: number;
  pageSize?: number;
};

export const userAtom = atomWithStorage<User | null>("user", null);
export const userCartsAtom = atomWithStorage<CartData[] | null>("carts", null);

export const subtotalAtom = atom((get) => {
  const carts = get(userCartsAtom);
  if (!carts || carts.length === 0) return 0;

  return carts.reduce((sum, cart) => {
    return sum + (cart.attributes.amt || 0);
  }, 0);
});

export const filterAtom = atom<FilterOptions>(defaultFilter);
