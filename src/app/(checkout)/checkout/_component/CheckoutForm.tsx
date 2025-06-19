"use client";
import { deleteCart } from "@/app/(feature)/product/_action/Cart.action";
import LoadingSpinner from "@/components/LoadingSpinner";
import { subtotalAtom, userAtom, userCartsAtom } from "@/lib/atom";
import { queryClient } from "@/lib/queryclient";
import { OrderState } from "@/types";
import { OnApproveData } from "@paypal/paypal-js";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useAtomValue } from "jotai";
import { redirect, useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { onPaymentAction } from "../_action/Payment.action";
import ProvinceSelectOptions from "./ProvinceSelectOptions";

const defaultState = {
  fullName: "",
  email: "",
  province: "PP",
  zipCode: "",
  address: "",
  paymentId: "",
  orderItem: [],
};

type State = {
  success: boolean;
  message: any;
  data: any;
};
const initialState: State = {
  success: false,
  message: "",
  data: null,
};
const CheckoutForm = () => {
  const actionHandler = async (
    _prevState: State,
    formData: FormData
  ): Promise<State> => {
    const result = await onPaymentAction(formData, {
      userId: user?.userId ?? "",
      orderAmount: subTotal,
      orderItemList: mutateState.orderItem!,
      paymentId: mutateState.paymentId ?? "",
      token: user?.token ?? "",
    });
    return (
      result ?? { success: false, message: "Unexpected error", data: null }
    );
  };

  const router = useRouter();
  const subTotal = useAtomValue(subtotalAtom);
  const user = useAtomValue(userAtom);
  const carts = useAtomValue(userCartsAtom);
  const [state, formAction, isPending] = useActionState(
    actionHandler,
    initialState
  );
  const submitRef = useRef<HTMLButtonElement>(null);
  const [mutateState, setMutateState] = useState<OrderState>(defaultState);
  const onPaymentSuccess = async (data: OnApproveData) => {
    console.log("Payment success", data);

    if (data) {
      const mutateCartItems = carts?.map((cart) => {
        return {
          qty: cart.attributes?.qty,
          product_variant: cart?.attributes?.product_variant?.data?.id,
          price: cart?.attributes?.product_variant?.data?.attributes?.price,
        };
      });
      if (mutateCartItems?.length) {
        setMutateState((pre) => ({
          ...pre,
          paymentId: data.paymentID ?? "",
          paymentSource: "paypal",
          orderItem: mutateCartItems,
        }));
      } else {
        redirect("/");
        //Meaning user has no cart and attemp to checkout
      }
    }
  };

  const isEnable = useMemo(() => {
    const checkValue = { ...mutateState };
    delete checkValue?.paymentId;
    delete checkValue?.orderItem;
    delete checkValue?.province;
    const arr = Object.values(checkValue);
    return arr.every((value) => value != "" && value != undefined);
  }, [mutateState]);
  useEffect(() => {
    const deleteAllCarts = async () => {
      if (carts)
        await Promise.all(
          carts.map((cart) => deleteCart(cart.id, user?.token ?? ""))
        );
      queryClient.invalidateQueries({
        queryKey: ["userId", user?.userId],
      });
    };

    if (state.success) {
      deleteAllCarts();

      router.replace(`/checkout-success/${state.data}`);
    }
  }, [state.success, carts, user?.userId]);

  useEffect(() => {
    if (mutateState.paymentId) {
      submitRef.current?.click();
    }
  }, [submitRef.current, mutateState.paymentId]);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <form
        action={formAction}
        className="mx-auto max-w-screen-xl px-4 2xl:px-0"
      >
        {isPending && <LoadingSpinner />}
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Personal Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Your name{" "}
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    name="fullName"
                    value={mutateState.fullName}
                    onChange={(e) =>
                      setMutateState((pre) => ({
                        ...pre,
                        fullName: e.target.value?.trim(),
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Bonnie Green"
                  />
                </div>

                <div>
                  <label
                    htmlFor="your_email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Your email*{" "}
                  </label>
                  <input
                    type="email"
                    id="your_email"
                    name="email"
                    required
                    value={mutateState.email}
                    onChange={(e) =>
                      setMutateState((pre) => ({
                        ...pre,
                        email: e.target.value?.trim(),
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="name@ex.com"
                  />
                </div>

                <ProvinceSelectOptions
                  selected={mutateState.province!}
                  onSelect={(province) => {
                    setMutateState((pre) => ({ ...pre, province }));
                  }}
                />

                <div>
                  <label
                    htmlFor="zipcode"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Zipcode*{" "}
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={mutateState.zipCode ?? ""}
                    onChange={(e) =>
                      setMutateState((pre) => ({
                        ...pre,
                        zipCode: e.target.value?.trim(),
                      }))
                    }
                    id="zipcode"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Enter your zipcode"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Your Address*{" "}
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={mutateState.address}
                    onChange={(e) =>
                      setMutateState((pre) => ({
                        ...pre,
                        address: e.target.value?.trim(),
                      }))
                    }
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500
                    col-au
                    "
                    placeholder="Toultompong1 , Khan Chamkamon Phnom Penh"
                  />
                </div>
                <div className="error col-span-2">
                  {!state.success &&
                    Array.isArray(state?.message) &&
                    state.message.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                        {state.message.map((item: any, index: number) => (
                          <li key={index}>{item?.message}</li>
                        ))}
                      </ul>
                    )}
                </div>

                <button type="submit" ref={submitRef} className="hidden">
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white my-2">
                    Payment
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>
                </div>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${subTotal?.toFixed(2)}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Discounts
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    $0.00
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Tax
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    $0.00
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${subTotal?.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>

            <div className="relative z-10">
              <PayPalButtons
                className=""
                disabled={!isEnable}
                // onClick={() => {
                //   if (isEnable) {
                //     submitRef.current && submitRef.current?.click();
                //   }
                // }}
                onApprove={(data) => onPaymentSuccess(data)}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          value: subTotal?.toFixed(2)?.toString(),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutForm;
