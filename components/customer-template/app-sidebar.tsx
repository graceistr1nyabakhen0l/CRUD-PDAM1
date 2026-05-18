// components/CustomerSidebar.tsx (atau letakkan di mana kamu menyimpan sidebar)
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
// Import menu customer yang baru dibuat
import { customerItems } from "@/app/customer/customer_menus"
import Link from "next/link"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <span className="text-base font-bold text-emerald-600">AdminPanel.</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* Ubah label menjadi Customer Area */}
                    <SidebarGroupLabel className="text-emerald-500 font-semibold">Customer Area</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {customerItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="hover:text-emerald-600">
                                            {/* Render Icon jika ada */}
                                            {item.icon && <item.icon className="w-4 h-4 mr-2" />}
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
    )
}

export { Sidebar }
