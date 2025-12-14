import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { LiveTrafficWidget } from "@/components/dashboard/widgets/LiveTrafficWidget";
import { ThreatCounterWidget } from "@/components/dashboard/widgets/ThreatCounterWidget";
import { SystemVitalsWidget } from "@/components/dashboard/widgets/SystemVitalsWidget";
import { QuarantineWidget } from "@/components/dashboard/widgets/QuarantineWidget";
import { HistoricalWidget } from "@/components/dashboard/widgets/HistoricalWidget";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div 
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-60"
        )}
      >
        <TopBar />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-foreground">Command Center</h1>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
            {/* Live Traffic - Spans 2 cols */}
            <LiveTrafficWidget />
            
            {/* Quarantine - Spans 2 rows */}
            <QuarantineWidget />
            
            {/* Threat Counter */}
            <ThreatCounterWidget />
            
            {/* System Vitals */}
            <SystemVitalsWidget />
            
            {/* Historical Analytics - Spans full width */}
            <HistoricalWidget />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
