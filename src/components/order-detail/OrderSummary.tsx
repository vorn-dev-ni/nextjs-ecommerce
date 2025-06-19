"use client";

import { useGetOrderNumber } from "@/hook/useOrder";
import dayjs from "dayjs";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

const OrderSummary = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error, isPending } = useGetOrderNumber({
    queryKey: "order-detail-user-check",
    orderNum: id,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(order?.orderNum);
      toast("Order Number has been copied to clipboard", {
        type: "info",
        autoClose: 500,
        pauseOnHover: false,
      });
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  if (isError) {
    throw new Error(error.message);
  }

  if (isLoading || isPending) {
    return (
      <div className="flex justify-center w-full items-center h-[70vh]">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }
  const order = data?.[0]?.attributes;
  if (!order) {
    return notFound();
  }

  return (
    <div className="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto py-24 ">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1
          onClick={handleCopy}
          className="text-xl lg:text-xl font-semibold leading-7 lg:leading-9  text-gray-800 hover:cursor-pointer"
        >
          Order #{order?.orderNum}
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600">
          Order Date: {dayjs(order?.createdAt).format("DD-MM-YYYY")}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Items
            </p>

            {order?.orderItemList?.map((product) => (
              <div
                key={product.id}
                className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full hover:cursor-pointer"
              >
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <Image
                    priority
                    width={100}
                    height={100}
                    className="w-full hidden md:block object-cover"
                    src={
                      product?.product_variant?.data?.attributes?.image?.data
                        ?.attributes?.url ?? ""
                    }
                    alt="image-product"
                  />
                  <Image
                    priority
                    width={100}
                    height={100}
                    className="w-full md:hidden object-cover"
                    src={
                      product?.product_variant?.data?.attributes?.image?.data
                        ?.attributes?.url ?? ""
                    }
                    alt="image-product"
                  />
                </div>
                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-md xl:text-xl font-semibold leading-6 text-gray-800">
                      {product?.product_variant?.data?.attributes?.sku}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      {product.product_variant?.data?.attributes?.Sizes && (
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-400">Size: </span>
                          {product.product_variant?.data?.attributes?.Sizes}
                        </p>
                      )}

                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-400">Color: </span>{" "}
                        {product.product_variant?.data?.attributes?.color}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base xl:text-lg leading-6">
                      $
                      {parseFloat(
                        product.product_variant?.data?.attributes?.price + ""
                      )?.toFixed(2)}{" "}
                      <span className="text-red-400 line-through text-sm">
                        {" "}
                        $
                        {parseFloat(
                          product.product_variant?.data?.attributes?.salePrice +
                            ""
                        )?.toFixed(2)}{" "}
                      </span>
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      x {product?.qty}
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      $
                      {parseFloat(product.price * product?.qty + "")?.toFixed(
                        2
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8 hover:cursor-pointer">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">
                    ${parseFloat(order?.orderAmount + "")?.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Discount </p>
                  <p className="text-base leading-4 text-gray-600">-$0.00</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">$0.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  ${parseFloat(order?.orderAmount + "")?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className=" flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    {order?.fullName}
                  </p>
                  <p className="text-sm leading-5 text-gray-600">
                    #{order?.orderNum}
                  </p>
                </div>
              </div>

              <div className="flex justify-center  md:justify-start items-center space-x-2 py-4 border-b border-gray-200 w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="cursor-pointer text-sm leading-5 text-gray-800">
                  {order?.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {order?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
