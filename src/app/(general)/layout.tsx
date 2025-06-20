import NavBar from "@/components/NavBar";
import { Metadata } from "next";
import Breadcrumb from "../_component/BreadCread";

export const metadata: Metadata = {
  title: {
    default: "GenzCommerce",
    template: "%s | GenzCommerce",
  },
  description:
    "GenzCommerce Product is a modern, scalable, and customizable e-commerce platform designed for the next generation of online businesses.",
};
export default function Layout({ children }: { children: any }) {
  return (
    <main className="my-24">
      <NavBar />

      <div className="flex w-full sm:max-w-[900px]  lg:max-w-[1230px] mx-4 lg:m-auto ">
        <Breadcrumb className="my-16 mb-[-10px] sm:mb-[-50px]" />
      </div>

      {children}
    </main>
  );
}
