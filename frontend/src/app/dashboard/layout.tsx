import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { relative } from "path";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
          "url('https://i.pinimg.com/736x/2f/0f/ab/2f0fab85c0dffc11f49f529ec4f0f8a9.jpg')",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-4 ">
          <SidebarTrigger />
          <div className="">{children}</div>
          <AppSidebar />
        </main>
      </SidebarProvider>
    </div>
  );
}
