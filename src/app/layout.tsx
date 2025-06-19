import FlowbiteInit from "@/components/FlowBiteInit";
import Footer from "@/components/Footer";
import { Provider } from "jotai";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PaypalProvider from "./paypalprovider";
import TanStackProvider from "./tanstack";
import ToastProvider from "./toastprovider";
import "react-loading-skeleton/dist/skeleton.css";
export const metadata: Metadata = {
  title: "GenzCommerce Product",
  description:
    "GenzCommerce Product is a modern, scalable, and customizable e-commerce platform designed for the next generation of online businesses. Built with flexibility in mind, it offers powerful product management, advanced filtering, intuitive user experience, and seamless integration capabilities. Whether you're selling physical products, digital goods, or services, GenzCommerce empowers businesses to create personalized shopping experiences, manage inventory efficiently, and optimize sales performance. With its clean design and developer-friendly architecture, GenzCommerce is ideal for startups, SMEs, or enterprises looking to scale their online presence.",
  openGraph: {
    title: "GenzCommerce Product",
    description:
      "GenzCommerce Product is a modern, scalable, and customizable e-commerce platform designed for the next generation of online businesses. Built with flexibility in mind, it offers powerful product management, advanced filtering, intuitive user experience, and seamless integration capabilities. Whether you're selling physical products, digital goods, or services, GenzCommerce empowers businesses to create personalized shopping experiences, manage inventory efficiently, and optimize sales performance. With its clean design and developer-friendly architecture, GenzCommerce is ideal for startups, SMEs, or enterprises looking to scale their online presence.",
    images: [
      {
        url: "https://d23k61tiwy13nu.cloudfront.net/66bb9e85eba9d69dd1c9d76ec29fc7d9ef3d6828_1024x504_1_a4ecfea89c.png",
        width: 1200,
        height: 630,
        alt: "GenzCommerce Product Image",
      },
    ],
    type: "website",
  },
};
const MontserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${MontserratFont.variable}`}>
        <Provider>
          <PaypalProvider>
            <TanStackProvider>
              <ToastProvider />
              <FlowbiteInit />
              {children}
              <Footer />
            </TanStackProvider>
          </PaypalProvider>
        </Provider>
      </body>
    </html>
  );
}
