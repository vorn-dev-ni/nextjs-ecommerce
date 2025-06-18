import NavBar from "@/components/NavBar";
import SecondaryNavBar from "@/components/SecondaryNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="my-20 md:my-0">
      <SecondaryNavBar />
      {children}
    </main>
  );
}
