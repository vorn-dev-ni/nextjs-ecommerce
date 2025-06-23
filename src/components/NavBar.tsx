import { getCategories } from "@/action/Category.action";
import Image from "next/image";
import { Suspense } from "react";
import CategorySmallTab from "./CategorySmallTab";
import LoginBar from "./LoginBar";
import SearchBar from "./SearchBar";

const NavBar = async () => {
  const categories = await getCategories();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container mx-auto px-4 md:flex my-8 items-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/app.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white">
            GenzCommerce
          </span>
          <div className="grow md:order-2 items-center justify-end flex md:hidden mr-2">
            <LoginBar />
          </div>
        </a>
        <div className=" w-[70%] hidden lg:block px-12">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        <div className="  hidden  md:flex md:order-2 items-center justify-end mr-2">
          <LoginBar />
        </div>
        <div className=" w-[100%] block md:w-[70%] px-0 md:px-12 lg:hidden my-6">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>
      <Suspense>
        <CategorySmallTab category={categories?.data} />
      </Suspense>
    </nav>
  );
};

export default NavBar;
