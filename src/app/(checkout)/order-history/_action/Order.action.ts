import axiosInstance from "@/lib/api";
import { OrderHistoryResponse, OrderResponse } from "@/types";
import axios from "axios";

export const getUserHistory = async (token: string, userId: string) => {
  try {
    const response = await axiosInstance.get<OrderHistoryResponse>(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product_variant][populate][image][fields]=url&sort[0]=id:desc`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("history", response.data);

    return response.data || [];
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const error = err?.response?.data;
      throw new Error(error);
    }
    throw new Error(err);
  }
};

export const getOrderDetail = async (token: string, orderNum: string) => {
  try {
    const response = await axiosInstance.get<OrderHistoryResponse>(
      `/orders?filters[orderNum][$eq]=${orderNum}&populate[orderItemList][populate][product_variant][populate][image][fields]=url&populate[orderItemList][populate][product_variant][populate][color]=*&populate[orderItemList][populate][product_variant][populate][size]=*`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data?.data || [];
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const error = err?.response?.data;
      throw new Error(error);
    }
    throw new Error(err);
  }
};
