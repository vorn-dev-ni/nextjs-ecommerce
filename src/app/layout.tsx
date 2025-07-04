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
  keywords: [
    "e-commerce",
    "online store",
    "customizable platform",
    "scalable e-commerce",
    "modern e-commerce",
    "GenzCommerce",
    "online business",
    "e-commerce solution",
    "next generation e-commerce",
    "shopping platform",
    "digital commerce",
    "SaaS e-commerce",
    "multi-vendor platform",
    "B2B e-commerce",
    "B2C e-commerce",
  ],

  description:
    "GenzCommerce Product is a modern, scalable, and customizable e-commerce platform designed for the next generation of online businesses.",
  openGraph: {
    title: "GenzCommerce Product",
    description:
      "GenzCommerce Product is a modern, scalable, and customizable e-commerce platform designed for the next generation of online businesses.",
    images: [
      {
        url: "https://d23k61tiwy13nu.cloudfront.net/android_chrome_192x192_db52edaa20.png",
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
