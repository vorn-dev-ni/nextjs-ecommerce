"use client";
import { onLogout } from "@/action/Auth.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userAtom, userCartsAtom } from "@/lib/atom";
import { useSetAtom } from "jotai";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
const AuthenticatedTabBar = () => {
  const setUser = useSetAtom(userAtom);
  const setCart = useSetAtom(userCartsAtom);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound className="" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            router.push("/order-history");
          }}
        >
          Order History
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={async () => {
            setUser(null);
            setCart(null);
            await onLogout();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthenticatedTabBar;
