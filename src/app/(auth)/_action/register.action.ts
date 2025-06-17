"use server";
import axiosInstance from "@/lib/api";
import { LoginResponse } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";

export async function registerAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const cfpassword = formData.get("cfpassword");

  if (!email || !password || !username) {
    return {
      success: false,
      message: "Please fill in one or two more are required",
      data: null,
    };
  }

  if (password !== cfpassword) {
    return {
      success: false,
      message: "Password and confirm password are not match",
      data: null,
    };
  }

  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/local/register",
      {
        username,
        email,
        password,
      }
    );

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
      message: "Register",
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
