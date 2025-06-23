import Image from "next/image";
import { memo } from "react";
import LoginBar from "./LoginBar";
import Link from "next/link";

const SecondaryNavBar = async () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container mx-auto px-4 md:flex my-8 items-center">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link href="/" className="flex gap-2 md:gap-4 items-center w-full">
            <Image
              src="/app.png"
              width={50}
              height={50}
              alt="Picture of the author"
            />
            <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              GenzCommerce
            </span>
          </Link>
          <div className="grow md:order-2 items-center justify-end flex md:hidden">
            <LoginBar />
          </div>
        </div>

        <div className="hidden md:flex md:grow md:order-2 items-center justify-end ">
          <LoginBar />
        </div>
      </div>
    </nav>
  );
};

export default memo(SecondaryNavBar);
