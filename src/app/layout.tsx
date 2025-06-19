import FlowbiteInit from "@/components/FlowBiteInit";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Provider } from "jotai";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import PaypalProvider from "./paypalprovider";
import TanStackProvider from "./tanstack";
import ToastProvider from "./toastprovider";
export const metadata: Metadata = {
  title: "GenzCommerce Product",
  description:
    "GenzCommerce Product is a modern, scalable, and customizable e-commerce platform designed for the next generation of online businesses.",
  openGraph: {
    title: "GenzCommerce Product",
    description:
      "GenzCommerce Product is a modern, scalable, and customizable e-commerce platform designed for the next generation of online businesses.",
    images: [
      {
        url: "https://d23k61tiwy13nu.cloudfront.net/66bb9e85eba9d69dd1c9d76ec29fc7d9ef3d6828_1024x504_1_a4ecfea89c.png",
        width: 1200,
        height: 630,
        alt: "app-image",
      },
    ],
    siteName: "Genz Ecommerce",
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
        <GoogleAnalytics gaId="G-T9RE5B1T71" />
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
