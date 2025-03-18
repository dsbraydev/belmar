export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-20">{children}</div>;
}
