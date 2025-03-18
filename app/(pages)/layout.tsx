export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full w-full p-4">{children}</div>;
}
