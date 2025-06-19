"use client";
import NotFoundCart from "@/app/_component/cart/NotFoundCart";
import {
  deleteCart,
  updateQtyCart,
} from "@/app/(feature)/product/_action/Cart.action";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { subtotalAtom, userAtom, userCartsAtom } from "@/lib/atom";
import { queryClient } from "@/lib/queryclient";
import { CartData } from "@/types";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
const Cart = ({
  onClose,
  onCheckout,
}: {
  onClose: () => void;
  onCheckout: () => void;
}) => {
  const carts = useAtomValue(userCartsAtom);
  const subtotal = useAtomValue(subtotalAtom);
  const user = useAtomValue(userAtom);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleIncrease = async (cart: CartData) => {
    try {
      const oldQty = cart?.attributes?.qty;
      const stockQty = cart?.attributes?.product_variant?.data?.attributes?.qty;
      const product = cart?.attributes?.product_variant;
      const newQty = oldQty + 1;
      setLoading(true);
      if (newQty <= stockQty) {
        const payload = {
          users_permissions_user: cart?.attributes?.userId?.toString() ?? "",
          qty: newQty,
          product_variant: product?.data?.id,
          price: product?.data?.attributes?.price,
          userId: cart?.attributes?.userId?.toString(),
          amt: newQty * product?.data?.attributes?.price,
        };

        await updateQtyCart(cart?.id, payload, user?.token ?? "");
        queryClient.invalidateQueries({ queryKey: ["userId", user?.userId] });
      } else {
        toast("Item qty has reach limit.", {
          type: "error",
          autoClose: 500,
          pauseOnHover: false,
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error: any) {
      toast(error, {
        type: "error",
        pauseOnHover: false,
      });
      setLoading(false);
    }
  };

  const handleDecrease = async (cart: CartData) => {
    try {
      const oldQty = cart?.attributes?.qty;
      const product = cart?.attributes?.product_variant;
      const newQty = oldQty - 1;

      setLoading(true);
      if (newQty > 0) {
        const payload = {
          users_permissions_user: cart?.attributes?.userId?.toString() ?? "",
          qty: newQty,
          product_variant: product?.data?.id,
          price: product?.data?.attributes?.price,
          userId: cart?.attributes?.userId?.toString(),
          amt: newQty * product?.data?.attributes?.price,
        };

        await updateQtyCart(cart?.id, payload, user?.token ?? "");
        queryClient.invalidateQueries({ queryKey: ["userId", user?.userId] });
      } else {
        setShowAlert(true);
      }

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error: any) {
      toast(error, {
        type: "error",
        autoClose: 500,
        pauseOnHover: false,
      });
      setLoading(false);
    }
  };

  const handleDelete = async (cart: CartData) => {
    try {
      setLoading(true);
      await deleteCart(cart?.id, user?.token ?? "");
      queryClient.invalidateQueries({ queryKey: ["userId", user?.userId] });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error: any) {
      toast(error, {
        type: "error",
        pauseOnHover: false,
      });
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {loading && <LoadingSpinner />}
        {carts?.length ? (
          <div className="mx-auto max-w-3xl">
            <div className="mt-0">
              <ul className="space-y-4">
                {carts?.map((cart) => (
                  <li className="flex items-center gap-4" key={cart?.id}>
                    <Image
                      src={`${cart?.attributes?.product_variant?.data?.attributes?.image?.data?.attributes?.url}`}
                      alt=""
                      width={100}
                      height={100}
                      priority
                      className="size-16 rounded-sm object-cover"
                    />

                    <div>
                      <p className="text-sm">
                        {
                          cart?.attributes?.product_variant?.data?.attributes
                            ?.sku
                        }
                      </p>
                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        {cart?.attributes?.product_variant?.data?.attributes
                          ?.Sizes && (
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">
                              {
                                cart?.attributes?.product_variant?.data
                                  ?.attributes?.Sizes
                              }
                            </dd>
                          </div>
                        )}

                        <div>
                          <dt className="inline">Color:</dt>
                          <dd className="inline">
                            {" "}
                            {
                              cart?.attributes?.product_variant?.data
                                ?.attributes?.color
                            }
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleDecrease(cart)}
                          className="text-sm px-2 py-2 h-5 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          -
                        </Button>

                        <h6 className="text-sm">{cart?.attributes?.qty}</h6>

                        <Button
                          onClick={() => handleIncrease(cart)}
                          className="text-sm px-2 py-2 h-5 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </Button>
                      </div>

                      <button className="text-gray-600 transition hover:text-red-600">
                        {/* <span className="sr-only">Remove item</span> */}

                        <AlertDialog
                          open={showAlert}
                          onOpenChange={setShowAlert}
                        >
                          <AlertDialogTrigger asChild>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your cart and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handleDelete(cart);
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>${parseFloat(subtotal?.toString())?.toFixed(2)}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>VAT</dt>
                      <dd>$0.00</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-$0.00</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>${parseFloat(subtotal?.toString())?.toFixed(2)}</dd>
                    </div>
                  </dl>

                  <div className="flex w-full">
                    <button
                      onClick={onCheckout}
                      className="block rounded-sm bg-blue-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-blue-600"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotFoundCart
            onBack={() => {
              onClose();
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Cart;
