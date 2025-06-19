"use client";
import { getOrderId } from "@/app/(checkout)/checkout-success/_action/OrderCheckout.action";
import {
  getOrderDetail,
  getUserHistory,
} from "@/app/(checkout)/order-history/_action/Order.action";
import { userAtom } from "@/lib/atom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export const useGetOrderById = ({
  queryKey,
  id,
}: {
  queryKey: string;
  id: string;
}) => {
  const user = useAtomValue(userAtom);
  return useQuery({
    queryKey: [queryKey, id],
    enabled: !!(id && user?.token),
    queryFn: () => getOrderId(id, user?.token ?? ""),
  });
};

export const useGetUserOrder = ({ queryKey }: { queryKey: string }) => {
  const user = useAtomValue(userAtom);
  return useQuery({
    queryKey: [queryKey, user?.userId],
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled: !!(user?.userId && user?.token),
    queryFn: () => {
      console.log("🚀 Fetching orders...");
      return getUserHistory(user?.token ?? "", user?.userId ?? "");
    },
  });
};

export const useGetOrderNumber = ({
  queryKey,
  orderNum,
}: {
  queryKey: string;
  orderNum: string;
}) => {
  const user = useAtomValue(userAtom);
  return useQuery({
    queryKey: [queryKey, orderNum],
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!(orderNum && user?.token),
    queryFn: () => getOrderDetail(user?.token ?? "", orderNum),
  });
};
