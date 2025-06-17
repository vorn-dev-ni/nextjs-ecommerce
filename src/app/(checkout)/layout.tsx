import SecondaryNavBar from "@/components/SecondaryNavBar";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <SecondaryNavBar />
      {children}
    </>
  );
}
