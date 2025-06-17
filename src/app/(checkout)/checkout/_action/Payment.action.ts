import axiosInstance from "@/lib/api";
import { UserProductCart } from "@/types";
import { generateOrderNumber } from "@/utils";
import axios from "axios";

export const onPaymentAction = async (
  formData: FormData,
  extra: {
    userId: string;
    orderAmount: number;
    paymentId: string;
    orderItemList: UserProductCart[];
    token: string;
  }
) => {
  const email = formData.get("email");
  const fullName = formData.get("fullName");
  const zipcode = formData.get("zipCode");
  const address = formData.get("address");
  const province = formData.get("province");

  const payload = {
    users: extra.userId,
    fullName: fullName,
    address: address,
    zipcode: zipcode,
    province: province,
    orderAmount: extra.orderAmount,
    userId: extra.userId,
    paymentId: extra.paymentId,
    orderItemList: extra.orderItemList,
    email: email,
    orderNum: generateOrderNumber(),
    method: "paypal",
  };
  try {
    const response = await axiosInstance.post<any>(
      "/orders",
      {
        data: payload,
      },
      {
        headers: {
          Authorization: `Bearer ${extra?.token}`,
        },
      }
    );

    console.log("Order response is", response);
    return {
      success: true,
      message: "",
      data: response.data?.data?.id,
    };
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      //   console.log("Error is", err?.response?.data?.error?.details?.errors);
      const arr = err?.response?.data?.error?.details?.errors;
      if (arr?.length) {
        const errorArray = arr?.map((item: any) => {
          return {
            message: item.message,
          };
        });
        return {
          success: false,
          message: errorArray,
          data: null,
        };
      }

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
