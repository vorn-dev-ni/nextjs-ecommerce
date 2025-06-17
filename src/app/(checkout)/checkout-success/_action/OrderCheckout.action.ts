import axiosInstance from "@/lib/api";
import { OrderResponse } from "@/types";
import axios from "axios";

export const getOrderId = async (id: string, token: string) => {
  try {
    const response = await axiosInstance.get<OrderResponse>(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        success: false,
        message: err?.response?.data?.error?.details?.errors,
        data: null,
      };
    }
    return {
      success: false,
      message: err?.message,
      data: null,
    };
  }
};
