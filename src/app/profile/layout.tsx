export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-4xl mx-auto py-8 px-4">{children}</div>;
}
