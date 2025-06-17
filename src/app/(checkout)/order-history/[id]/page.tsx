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
