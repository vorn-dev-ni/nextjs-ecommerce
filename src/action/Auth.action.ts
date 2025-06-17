"use server";
import axiosInstance from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function onLogout() {
  const cookie = await cookies();
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer`;
  cookie.delete("token");

  redirect("/login");
}
