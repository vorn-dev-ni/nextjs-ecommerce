// import OrderSummary from "@/components/order-detail/OrderSummary";
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import { getOrderDetail } from "../_action/Order.action";
// import { cookies } from "next/headers";
// type PageProps = {
//   params: Promise<{
//     id: string;
//   }>;
// };
// const Page = async ({ params }: PageProps) => {
//   const { id } = await params;
//   const queryClient = new QueryClient();
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("token")?.value;

//   await queryClient.prefetchQuery({
//     queryKey: ["order-detail-user-check", id],
//     staleTime: 1000 * 60 * 5,

//     queryFn: () => getOrderDetail(token ?? "", id),
//   });

//   const dehydratedState = dehydrate(queryClient);
//   return (
//     <HydrationBoundary state={dehydratedState}>
//       <OrderSummary id={id} />
//     </HydrationBoundary>
//   );
// };

// export default Page;

import OrderSummary from "@/components/order-detail/OrderSummary";
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};
const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return <OrderSummary id={id} />;
};

export default Page;
