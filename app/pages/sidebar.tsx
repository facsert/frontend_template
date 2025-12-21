// "use client"
// import { redirect } from 'next/navigation'
import Link from 'next/link'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

type PageType = "component" | "layout"

interface PageItem {
  pageType: PageType;
  name: string;
  url: string;
}

const pageItems: PageItem[] = [
  {pageType: "component", name: "Button", url: "/pages/button"},
  {pageType: "component", name: "Card", url: "/pages/card"},
  
  {pageType: "layout", name: "Form", url: "/pages/form"},
  {pageType: "layout", name: "Table", url: "/pages/table"},
];

function AppSidebar({ ...props }) { 
  return (
    <Sidebar { ...props }>
      <SidebarHeader>
        Sidebar
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Component</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pageItems.filter(item => item.pageType === "component").map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link className='pl-6' href={item.url}>{item.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
  
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Layout</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pageItems.filter(item => item.pageType === "layout").map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link className='pl-6' href={item.url}>{item.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
  
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };