import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

import { motion } from "motion/react";

import { Outlet, useNavigate } from "react-router-dom"
import { Package, ListChecks, ArrowLeft, ArrowRight, LogOut, StepBack } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useRef } from "react";

export default function DashboardLayout({ children }) {
  const prev = useRef(location.pathname);
  const direction = location.pathname > prev.current ? 1 : -1;
  prev.current = location.pathname;
  const navigate = useNavigate()
  const { toggleSidebar, open } = useSidebar()

  const links = [
    { label: "Products", icon: Package, path: "/admin/products" },
    { label: "Orders", icon: ListChecks, path: "/admin/orders" },
  ]
  function handleLogout() {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/logout`, {}, { withCredentials: true })
      .then(res => {
        toast.success(res.data.message)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/')
      })
      .catch(err => console.log(err))
  }
  return (
    <motion.div
      key={location.pathname}
      initial={{ x: 50 * direction, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50 * direction, opacity: 0 }}
      className="w-full"
    >
      <div className="flex w-full min-h-screen">
        <Sidebar collapsible="icon" variant="floating">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {links.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton onClick={() => navigate(item.path)}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate('/')}>
                    <StepBack />
                    Back
                  </SidebarMenuButton>
                  <SidebarMenuButton onClick={toggleSidebar}>
                    {open ? <ArrowLeft /> : <ArrowRight />}
                    Close Menu
                  </SidebarMenuButton>
                  <SidebarMenuButton onClick={handleLogout}>
                    <LogOut />
                    LogOut
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </SidebarFooter>
        </Sidebar>

        {/* MAIN CONTENT */}
        <SidebarInset>
          <main className="flex-1 p-2 sm:px-8 sm:py-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </motion.div>
  )
}
