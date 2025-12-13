import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Clock, CheckCircle2 } from "lucide-react";

interface Threat {
  id: string;
  type: string;
  severity: "critical" | "warning" | "info";
  ip: string;
  timestamp: Date;
  description: string;
  status: "active" | "resolved" | "investigating";
}

const mockThreats: Threat[] = [
  {
    id: "1",
    type: "DDoS Attack",
    severity: "critical",
    ip: "192.168.1.100",
    timestamp: new Date(Date.now() - 300000),
    description: "High volume of requests detected from single IP",
    status: "active",
  },
  {
    id: "2",
    type: "SQL Injection Attempt",
    severity: "critical",
    ip: "10.0.0.45",
    timestamp: new Date(Date.now() - 900000),
    description: "Malicious SQL queries detected in request parameters",
    status: "investigating",
  },
  {
    id: "3",
    type: "Brute Force Attack",
    severity: "warning",
    ip: "172.16.0.23",
    timestamp: new Date(Date.now() - 1800000),
    description: "Multiple failed login attempts detected",
    status: "resolved",
  },
];

const ThreatsAlerts = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [threats] = useState<Threat[]>(mockThreats);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-critical/10 text-critical border-critical/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-neutral/10 text-neutral border-neutral/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="w-4 h-4" />;
      case "investigating":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

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
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-foreground">Threats & Alerts</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and respond to security threats in real-time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Threats</p>
                  <p className="text-3xl font-semibold text-critical mt-1">
                    {threats.filter(t => t.status === "active").length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-critical" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Investigating</p>
                  <p className="text-3xl font-semibold text-warning mt-1">
                    {threats.filter(t => t.status === "investigating").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-3xl font-semibold text-healthy mt-1">
                    {threats.filter(t => t.status === "resolved").length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-healthy" />
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-medium">Recent Threats</h2>
            </div>
            <div className="divide-y divide-border">
              {threats.map((threat) => (
                <div key={threat.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">{getStatusIcon(threat.status)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-foreground">{threat.type}</h3>
                          <Badge className={cn("text-xs", getSeverityColor(threat.severity))}>
                            {threat.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {threat.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {threat.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>IP: {threat.ip}</span>
                          <span>•</span>
                          <span>{threat.timestamp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Investigate
                      </Button>
                      <Button variant="outline" size="sm">
                        Block IP
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ThreatsAlerts;
