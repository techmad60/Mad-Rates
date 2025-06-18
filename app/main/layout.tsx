//app/main/layout.tsx
import SearchBar from "@/components/ui/SearchBar";
import Header from "@/components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-background min-h-screen p-4 sm:px-8 md:p-12">
      {/* Header */}
      <Header />
      <div className="lg:hidden bg-inherit mb-4 mt-20 fixed top-0 left-0 right-0 p-4 m-4 sm:px-8 md:mt-30 z-50">
        <SearchBar />
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
}
