//app/main/layout.tsx

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col bg-white">{children}</div>;
}
