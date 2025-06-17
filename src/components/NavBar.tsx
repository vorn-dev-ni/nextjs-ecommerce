import { getCategories } from "@/action/Category.action";
import Image from "next/image";
import CategorySmallTab from "./CategorySmallTab";
import LoginBar from "./LoginBar";
import SearchBar from "./SearchBar";

const NavBar = async () => {
  const categories = await getCategories();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 pt-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/app.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <span className="self-center text-md md:text-2xl font-semibold whitespace-nowrap dark:text-white">
            GenzCommerce
          </span>
        </a>
        {/* <div className=" w-[50%] hidden lg:block">
          <SearchBar />
        </div> */}

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center gap-4">
          <LoginBar />
        </div>
        {/* <div className=" w-[100%] block lg:hidden">
          <SearchBar />
        </div> */}
      </div>
      <CategorySmallTab category={categories?.data} />
    </nav>
  );
};

export default NavBar;
