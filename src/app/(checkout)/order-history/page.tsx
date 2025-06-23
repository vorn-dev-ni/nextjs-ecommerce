import HistoryOrderListing from "./_component/HistoryOrderListing";

const Page = () => {
  return (
    <section className="bg-white py-12 antialiased dark:bg-gray-900  my-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between mt-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>
          </div>

          <HistoryOrderListing />
        </div>
      </div>
    </section>
  );
};

export default Page;
