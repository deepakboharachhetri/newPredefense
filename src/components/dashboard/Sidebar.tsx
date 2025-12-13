import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  Activity, 
  Bell, 
  Shield, 
  Database, 
  Share2, 
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Moon,
  Sun
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
  collapsed: boolean;
  href: string;
}

const NavItem = ({ icon: Icon, label, active, badge, collapsed, href }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
      "hover:bg-sidebar-accent group relative",
      active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
    )}
  >
    <Icon className={cn(
      "w-5 h-5 flex-shrink-0 transition-colors",
      active ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
    )} />
    {!collapsed && (
      <span className={cn(
        "text-sm transition-colors",
        active ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
      )}>
        {label}
      </span>
    )}
    {badge && badge > 0 && (
      <span className={cn(
        "absolute flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-critical text-primary-foreground",
        collapsed ? "top-0 right-0" : "ml-auto"
      )}>
        {badge}
      </span>
    )}
  </Link>
);

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
    { icon: Activity, label: "Live Traffic", href: "/dashboard" },
    { icon: Bell, label: "Threats & Alerts", badge: 3, href: "/dashboard/threats" },
    { icon: Shield, label: "IP Manager", href: "/dashboard/ip-manager" },
    { icon: Database, label: "Data Explorer", href: "/dashboard/data-explorer" },
    { icon: Share2, label: "Integrations", href: "/dashboard/integrations" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border",
        "flex flex-col transition-all duration-300 ease-in-out z-50",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "h-16 flex items-center border-b border-sidebar-border px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">PreDefense</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.href}
            badge={item.badge}
            collapsed={collapsed}
            href={item.href}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
            "hover:bg-sidebar-accent text-sidebar-foreground"
          )}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 flex-shrink-0" />
          ) : (
            <Moon className="w-5 h-5 flex-shrink-0" />
          )}
          {!collapsed && <span className="text-sm">Dark Mode</span>}
        </button>

        {/* User Profile */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl",
          "bg-sidebar-accent"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Alex Chen</p>
              <p className="text-xs text-muted-foreground truncate">SOC Analyst</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className={cn(
          "absolute -right-3 top-20 w-6 h-6 rounded-full",
          "bg-card border border-border shadow-card",
          "flex items-center justify-center",
          "hover:bg-muted transition-colors"
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </aside>
  );
};
