import { Search, ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApiStatus } from "./ApiStatus";

export const TopBar = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Dashboard</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">Overview</span>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search IPs, logs, alerts... (⌘K)"
            className={cn(
              "w-full h-10 pl-10 pr-4 rounded-xl",
              "bg-background border border-border",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "transition-all duration-200"
            )}
          />
        </div>
      </div>

      {/* Right - Controls */}
      <div className="flex items-center gap-3">
        {/* API Status */}
        <ApiStatus />
        
        {/* Environment Switcher */}
        <button className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-healthy-bg text-healthy text-sm font-medium",
          "hover:bg-healthy/20 transition-colors"
        )}>
          <span className="w-2 h-2 rounded-full bg-healthy animate-pulse" />
          Production
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Time Range */}
        <button className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-muted text-foreground text-sm font-medium",
          "hover:bg-muted/80 transition-colors"
        )}>
          <Clock className="w-4 h-4 text-muted-foreground" />
          Last 24 Hours
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-healthy opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-healthy" />
          </span>
          <span className="text-sm text-muted-foreground">System Operational</span>
        </div>
      </div>
    </header>
  );
};
