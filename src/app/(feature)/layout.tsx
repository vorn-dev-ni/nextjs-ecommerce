import NavBar from "@/components/NavBar";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <NavBar />

      {children}
    </>
  );
}
