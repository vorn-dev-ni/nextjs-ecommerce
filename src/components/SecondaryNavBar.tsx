import Image from "next/image";
import { memo } from "react";
import LoginBar from "./LoginBar";

const SecondaryNavBar = async () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 pb-4">
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
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center gap-4">
          <LoginBar />
        </div>
      </div>
    </nav>
  );
};

export default memo(SecondaryNavBar);
