"use client";
import { useUserCarts } from "@/hook/useCart";
import { userAtom } from "@/lib/atom";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthenticatedTabBar from "./AuthenticatedTabBar";
import SheetCart from "./SheetCart";

const LoginBar = () => {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const [hasMount, setHasMount] = useState(false);

  useEffect(() => {
    setHasMount(true);
  }, []);

  useUserCarts({
    userId: user?.userId,
    token: user?.token ?? "",
  });

  return (
    <div className={`flex gap-4 items-center`}>
      {hasMount ? (
        !user?.userId ? (
          <button
            type="button"
            onClick={() => {
              router.replace("/login");
            }}
            className={`ml-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      
          }`}
          >
            Login
          </button>
        ) : (
          <section className="mr-2 flex gap-3">
            <AuthenticatedTabBar />
            <SheetCart />
          </section>
        )
      ) : null}
    </div>
  );
};

export default LoginBar;
