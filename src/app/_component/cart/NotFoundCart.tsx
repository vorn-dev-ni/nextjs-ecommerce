import { Button } from "@/components/ui/button";

const NotFoundCart = ({ onBack }: { onBack: () => void }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-52 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-xl tracking-tight font-bold text-gray-900 md:text-3xl dark:text-white">
            {"Oops"}
          </p>
          <p className="mb-4 text-md font-light text-gray-500 dark:text-gray-400">
            {` Sorry, we couldn't any items in shopping carts.`}
          </p>

          <Button
            className="bg-blue-600 hover:bg-blue-500 focus:ring-0 border-0 outline-0 my-4"
            onClick={onBack}
          >
            {"Back to shopping"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundCart;
