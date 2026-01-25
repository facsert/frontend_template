"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppSidebar } from "./sidebar";
import { Navbar } from "./navbar"

export default function HomeLayout({
  children 
}: {
  children: React.ReactNode 
}) {
  const queryClient = new QueryClient()
  return (
    <div className="h-full w-full">
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full flex flex-col">
            <Navbar />
            <Separator />
            <div className="w-full h-full p-2">
              {children}  
            </div>
          </div>
        </SidebarProvider>
      </QueryClientProvider>
    </div>
  );
};