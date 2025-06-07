import {
  Settings,
  LayoutDashboard,
  MessagesSquare,
  ClipboardCheck,
  Book,
  Brain,
  Timer,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard/home",
    icon: LayoutDashboard,
  },
  {
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessagesSquare,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: ClipboardCheck,
  },
  {
    title: "Mental Health Center",
    url: "/dashboard/mental-health",
    icon: Brain,
  },
  {
    title: "Syllabus View",
    url: "/dashboard/syllabus",
    icon: Book,
  },
  {
    title: "Focus Timer",
    url: "/dashboard/focus-timer",
    icon: Timer,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>EduPulse</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
