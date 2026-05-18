// app/customer/customer_menus.ts
import { Home, User, CreditCard, } from "lucide-react"

export const customerItems = [
    {
        title: "Dashboard",
        url: "/customer/dashboard",
        icon: Home,
    },
    {
        title: "My Profile",
        url: "/customer/profile",
        icon: User,
    },
    {
        title: "My Bills",
        url: "/customer/bills",
        icon: User,
    },
]