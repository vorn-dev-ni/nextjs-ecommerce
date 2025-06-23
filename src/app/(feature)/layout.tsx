import NavBar from "@/components/NavBar";
import { Suspense } from "react";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Suspense>
        <NavBar />
      </Suspense>

      {children}
    </>
  );
}
