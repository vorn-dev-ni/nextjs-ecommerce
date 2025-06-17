"use client";

import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { useGetUserOrder } from "@/hook/useOrder";
import dayjs from "dayjs";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const HistoryOrderListing = () => {
  const { data, isLoading, isError, error, isPending } = useGetUserOrder({
    queryKey: "order-history-listing",
  });

  if (isLoading || isPending) {
    return (
      <div className="flex justify-center w-full items-center h-[25vh]">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    throw new Error(error.message);
  }

  if (!data) {
    return notFound();
  }

  return (
    <div className="mt-6 flow-root">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {data?.data?.map((order) => {
          return (
            <div
              key={order.id}
              className="flex flex-wrap items-center gap-y-4 py-6"
            >
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-2">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Order ID:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  <Link
                    href={`/order-history/${order?.attributes?.orderNum}`}
                    className="hover:underline"
                  >
                    #{order?.attributes?.orderNum}
                  </Link>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Date:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  {dayjs(order?.attributes?.createdAt).format("DD-MM-YYYY")}
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Total Amount:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  $
                  {parseFloat(
                    order?.attributes?.orderAmount?.toString()
                  )?.toFixed(2)}
                </dd>
              </dl>

              <OrderStatusBadge status={order?.attributes?.status} />

              <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                <button
                  type="button"
                  className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto"
                >
                  Order again
                </button>
                <a
                  href={`/order-history/${order?.attributes?.orderNum}`}
                  className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                >
                  View details
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryOrderListing;
