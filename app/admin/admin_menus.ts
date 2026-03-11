import { Home, UserPen, User, Users, Toolbox, Banknote, Receipt } from "lucide-react";

// Menu items.
export const items = [
    {
        title: "Home",
        url: "/admin/dashboard",
        icon: Home,
    },
    {
        title: "My Profile",
        url: "/admin/profile",
        icon: UserPen,
    },
    {
        title: "Admin Data",
        url: "/admin/admin",
        Icon: User,
    },
    {
        title: "Customer Data",
        url: "/admin/customer",
        icon: Users,
    },
    {
        title: "Service",
        url: "/admin/services",
        icon: Toolbox,
    },
    {
        title: "Bill",
        url: "#",
        icon: Receipt,
    },
    {
        title: "Payments",
        url: "#",
        icon: Banknote,
    },
]