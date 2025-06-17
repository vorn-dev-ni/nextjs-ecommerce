import FlowbiteInit from "@/components/FlowBiteInit";
import Footer from "@/components/Footer";
import { Provider } from "jotai";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import PaypalProvider from "./paypalprovider";
import TanStackProvider from "./tanstack";
import ToastProvider from "./toastprovider";

export const metadata: Metadata = {
  title: "GenzEcommerce Product",
  description: "this is a description",
  openGraph: {
    title: "Genz Ecommerce Product",
    description: "this is a description",
    images: [
      {
        url: "https://d23k61tiwy13nu.cloudfront.net/66bb9e85eba9d69dd1c9d76ec29fc7d9ef3d6828_1024x504_1_a4ecfea89c.png",
        width: 1200,
        height: 630,
        alt: "Genz Ecommerce Product Image",
      },
    ],
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
