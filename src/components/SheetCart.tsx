"use client";
import Cart from "@/app/(checkout)/(cart)/_component/Cart";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { userCartsAtom } from "@/lib/atom";
import { useAtomValue } from "jotai";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SheetCart = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const userCarts = useAtomValue(userCartsAtom);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <main className="relative">
          <ShoppingCart />
          {userCarts && userCarts?.length ? (
            <Badge
              variant="destructive"
              className="absolute top-[-10px] right-[-10px]"
            >
              {userCarts?.length}
            </Badge>
          ) : null}
        </main>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-md font-bold text-gray-900 sm:text-xl pb-1 overflow-y-scroll ">
          <SheetTitle className="sticky">Your Shopping Cart</SheetTitle>
          <SheetDescription asChild>
            <Cart
              onCheckout={() => {
                setOpen(false);
                router.push("/checkout");
              }}
              onClose={() => {
                setOpen(false);
              }}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetCart;
