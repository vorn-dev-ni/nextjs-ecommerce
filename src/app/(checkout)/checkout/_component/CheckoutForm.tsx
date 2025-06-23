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
import { useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { onPaymentAction } from "../_action/Payment.action";
import ProvinceSelectOptions from "./ProvinceSelectOptions";

const defaultState: OrderState = {
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
  const router = useRouter();
  const subTotal = useAtomValue(subtotalAtom);
  const user = useAtomValue(userAtom);
  const carts = useAtomValue(userCartsAtom);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [mutateState, setMutateState] = useState<OrderState>(defaultState);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<OrderState>({
    defaultValues: defaultState,
    mode: "all",
  });

  const province = watch("province");

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

  const [state, formAction, isPending] = useActionState(
    actionHandler,
    initialState
  );

  const onPaymentSuccess = async (data: OnApproveData) => {
    if (data) {
      const mutateCartItems = carts?.map((cart) => ({
        qty: cart.attributes?.qty,
        product_variant: cart?.attributes?.product_variant?.data?.id,
        price: cart?.attributes?.product_variant?.data?.attributes?.price,
      }));

      if (mutateCartItems?.length) {
        setMutateState((prev) => ({
          ...prev,
          paymentId: data.paymentID ?? "",
          paymentSource: "paypal",
          orderItem: mutateCartItems,
        }));
      } else {
        redirect("/");
      }
    }
  };

  useEffect(() => {
    const deleteAllCarts = async () => {
      if (carts)
        await Promise.all(
          carts.map((cart) => deleteCart(cart.id, user?.token ?? ""))
        );
      queryClient.invalidateQueries({ queryKey: ["userId", user?.userId] });
      queryClient.invalidateQueries({ queryKey: ["order-history-listing"] });
    };

    if (state.success) {
      setLoading(true);
      deleteAllCarts();
      setLoading(false);
      router.replace(`/checkout-success/${state.data}`);
    }
  }, [state.success, carts, user?.userId]);

  useEffect(() => {
    if (mutateState.paymentId) {
      submitRef.current?.click();
    }
  }, [mutateState.paymentId]);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <form
        action={formAction}
        className="mx-auto max-w-screen-xl px-4 2xl:px-0"
      >
        {(isPending || isLoading) && <LoadingSpinner />}
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
                    Your name
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    id="your_name"
                    placeholder="Bonnie Green"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="your_email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email*
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    id="your_email"
                    placeholder="name@ex.com"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <ProvinceSelectOptions
                  selected={province ?? ""}
                  onSelect={(province) => setValue("province", province)}
                />

                <div>
                  <label
                    htmlFor="zipcode"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Zipcode*
                  </label>
                  <input
                    {...register("zipCode", {
                      required: "Zipcode is required",
                    })}
                    type="text"
                    id="zipcode"
                    placeholder="Enter your zipcode"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Address*
                  </label>
                  <input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    id="address"
                    placeholder="Toultompong1 , Khan Chamkamon Phnom Penh"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
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
                disabled={!isValid}
                onApprove={(data) => onPaymentSuccess(data)}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          value: subTotal?.toFixed(2).toString(),
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
