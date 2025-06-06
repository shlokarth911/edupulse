import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4 ">
        <SidebarTrigger />
        <div className="">{children}</div>
        <AppSidebar />
      </main>
    </SidebarProvider>
  );
}
