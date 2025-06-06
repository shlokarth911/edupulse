import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundImage:
          "url('https://i.pinimg.com/736x/88/04/fd/8804fdd2e81c64634a34f83ac3ea005d.jpg')",
        backgroundAttachment: "fixed",
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
