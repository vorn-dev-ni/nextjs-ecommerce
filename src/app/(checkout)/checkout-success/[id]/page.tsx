import Order from "../_component/Order";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 my-36">
      <Order id={id} />
    </section>
  );
};

export default Page;
