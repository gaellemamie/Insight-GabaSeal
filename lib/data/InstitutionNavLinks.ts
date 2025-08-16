import { Bell, FileSignature, FileText, FolderOpen, LayoutDashboard, ListTree, Settings, Signature, Users } from "lucide-react";

export const InstitutionNavLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
    { name: "Templates", href: "/dashboard/document-categories", icon: FolderOpen },
    { name: "Bulk Sign", href: "/dashboard/bulk-sign", icon: FileSignature },
    { name: "Departments", href: "/dashboard/departments", icon: ListTree },
    { name: "Managers", href: "/dashboard/managers", icon: Users },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "My Certificate", href: "/dashboard/certificate", icon: Signature },
]