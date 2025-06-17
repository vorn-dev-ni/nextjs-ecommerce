"use server";
import axiosInstance from "@/lib/api";
import { LoginResponse } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
      data: null,
    };
  }

  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/local", {
      identifier: email?.toString().toLowerCase(),
      password: password,
    });

    const { jwt, user } = response.data;
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    const cookie = await cookies();
    cookie.set("token", jwt, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return {
      success: true,
      message: "Login",
      data: {
        userId: user?.id,
        username: user?.username,
        token: jwt,
      },
    };
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return {
        success: false,
        message: err.response?.data?.error?.message,
        data: null,
      };
    }
    return {
      success: false,
      message: err?.message,
      data: null,
    };
  }
}
