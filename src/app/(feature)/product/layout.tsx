export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="my-20">{children}</main>
    </>
  );
}
