import { Outlet, Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Truck,
  Settings,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/inventory", label: "Inventory", icon: Warehouse },
  { to: "/sales", label: "Sales", icon: ShoppingCart },
  { to: "/suppliers", label: "Suppliers", icon: Truck },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const username = useAuthStore((s) => s.username);
  const role = useAuthStore((s) => s.role);
  const logout = useLogout();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col bg-card border-r border-border transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!collapsed && (
            <span className="font-bold text-lg text-foreground">InvenPro</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-accent text-muted-foreground"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-card">
          <div className="flex-1 max-w-md">
            <input
              type="search"
              placeholder="Search..."
              className="w-full px-3 py-1.5 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="relative p-2 rounded-md hover:bg-accent text-muted-foreground"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium hover:bg-accent px-3 py-1.5 rounded-md"
              >
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {username?.[0]?.toUpperCase()}
                </div>
                <span className="hidden sm:block">{username}</span>
                <ChevronDown size={14} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-card border border-border rounded-md shadow-lg z-50">
                  <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border">
                    {role}
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent text-destructive"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
