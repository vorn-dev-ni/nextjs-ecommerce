import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "About us",
  description: "About our ecommerce at GenzCommerce",
};
const Page = () => {
  return (
    <section className="py-24">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full grid lg:grid-cols-2 grid-cols-1 justify-start items-center gap-12">
          {/* Images side */}
          <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-6 lg:order-first order-last items-start justify-center">
            <div className="flex pt-24 gap-2.5 justify-start items-start sm:justify-end lg:justify-center">
              <Image
                priority
                width={300}
                height={300}
                className="rounded-xl object-cover"
                src="https://plus.unsplash.com/premium_photo-1664475347754-f633cb166d13?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="about Us image 1"
              />
            </div>
            <Image
              priority
              width={300}
              height={300}
              className="rounded-xl object-cover sm:ml-0 ml-auto"
              src="https://plus.unsplash.com/premium_photo-1664874602655-9c1f631c8611?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="about Us image 2"
            />
          </div>

          {/* Text and stats side */}
          <div className="w-full flex flex-col justify-center items-center lg:items-start gap-10">
            <div className="w-full flex flex-col justify-center items-center lg:items-start gap-8">
              <div className="w-full flex flex-col justify-start items-center lg:items-start gap-3">
                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal text-center lg:text-start">
                  Empowering the Next Generation of E-Commerce
                </h2>
                <p className="text-gray-500 text-base font-normal leading-relaxed text-center lg:text-start max-w-xl">
                  At GenzCommerce, we provide a modern, scalable, and fully
                  customizable e-commerce platform designed to help startups,
                  brands, and entrepreneurs build thriving online stores. Our
                  mission is to simplify online selling, enabling businesses to
                  grow globally with confidence and ease.
                </p>
              </div>

              <div className="inline-flex w-full justify-center lg:justify-start items-center gap-5 sm:gap-10">
                <div className="inline-flex flex-col items-start justify-start">
                  <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    10+
                  </h3>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Businesses Powered
                  </h6>
                </div>
                <div className="inline-flex flex-col items-start justify-start">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    100+
                  </h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Products Sold
                  </h6>
                </div>
                <div className="inline-flex flex-col items-start justify-start">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    99.9%
                  </h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Uptime Reliability
                  </h6>
                </div>
              </div>
            </div>

            <Link
              href={"/contact"}
              className="sm:w-fit w-full px-3.5 py-2 bg-blue-600 hover:bg-blue-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] flex justify-center items-center"
            >
              <span className="px-1.5 text-white text-sm font-medium leading-6">
                Contact Us
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Page;
