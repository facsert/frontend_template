import { SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "./sidebar";
import { Navbar } from "./navbar"

export default function HomeLayout({
  children 
}: {
 children: React.ReactNode 
}) {
  return (
    <div className="h-full w-full">
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
    </div>
  );
};