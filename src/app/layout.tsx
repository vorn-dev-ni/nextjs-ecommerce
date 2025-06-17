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
  title: "Korean Product",
  description: "this is a description",
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
