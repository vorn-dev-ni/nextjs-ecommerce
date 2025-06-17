"use client";

import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { getAllUserCarts } from "@/app/(feature)/product/_action/Cart.action";
import { userCartsAtom } from "@/lib/atom";

export const useUserCarts = ({
  userId,
  token,
}: {
  userId: string | undefined;
  token: string;
}) => {
  const setCart = useSetAtom(userCartsAtom);

  const query = useQuery({
    queryFn: () => getAllUserCarts(userId!, token),
    queryKey: ["userId", userId],
    enabled: !!userId && !!token,
  });

  // Sync fetched data to jotai
  useEffect(() => {
    if (query.data) {
      setCart(query.data);
    }
  }, [query.data, setCart]);

  return query;
};
