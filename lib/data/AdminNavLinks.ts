import { Activity, Building2, LayoutDashboard, Settings, Tags, UserRound } from "lucide-react";

export const AdminNavigationLinks = [
     { name: "Dashboard", href: "/admins", icon: LayoutDashboard },
     { name: "Institutions", href: "/admins/institutions", icon: Building2 },
     { name: "Categories", href: "/admins/categories", icon: Tags },
     { name: "Users", href: "/admins/users", icon: UserRound },
     { name: "Settings", href: "/admins/settings", icon: Settings },
     { name: "Monitoring", href: "/admins/monitoring", icon: Activity },
]