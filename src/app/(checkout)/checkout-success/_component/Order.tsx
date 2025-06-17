"use client";
import ScrollReset from "@/app/_component/ScrollReset";
import { Button } from "@/components/ui/button";
import { useGetOrderById } from "@/hook/useOrder";
import dayjs from "dayjs";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Order = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error, isPending } = useGetOrderById({
    id,
    queryKey: "order-success-checkout",
  });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (!isLoading && !isPending && data?.data?.id == null) {
    return notFound();
  }

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 2xl:px-0">
      <ScrollReset />
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-2xl text-center mb-4">
        Thanks for your order!
      </h2>

      {isLoading || isPending ? (
        <div className="flex justify-center w-full items-center h-[25vh]">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : (
        <>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8 text-center">
            Your order number{" "}
            <Link
              href={`/order-history/${data?.data?.attributes?.orderNum}`}
              className="font-medium text-gray-900 dark:text-white hover:underline"
            >
              #{data?.data?.attributes?.orderNum}{" "}
            </Link>
            will be processed within 24 hours during working days. We will
            notify you by email once your order has been shipped.
          </p>
          <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Date Time
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {dayjs(data?.data?.attributes?.createdAt).format("DD MMM YYYY")}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Payment Method
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {data?.data?.attributes.method ?? "N/A"}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Name
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {data?.data?.attributes.fullName ?? "N/A"}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Address
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {data?.data?.attributes.address ?? "N/A"}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Email
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {data?.data?.attributes.email ?? "N/A"}
              </dd>
            </dl>
          </div>
          <div className="flex items-center space-x-4 w-full  justify-center">
            <Button
              className="bg-blue-600 hover:bg-blue-500"
              onClick={() => {
                router.replace(
                  `/order-history/${data?.data?.attributes?.orderNum}`
                );
              }}
            >
              View Order
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
