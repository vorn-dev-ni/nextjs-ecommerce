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
