import NavBar from "@/components/NavBar";
import BreadCread from "../../_component/BreadCread";
import ScrollReset from "../../_component/ScrollReset";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { [key: string]: string };
}) {
  return (
    <>
      <main className="my-20">{children}</main>
    </>
  );
}
