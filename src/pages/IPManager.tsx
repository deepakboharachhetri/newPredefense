import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, X, Search, Plus } from "lucide-react";

interface IPEntry {
  id: string;
  ip: string;
  status: "blocked" | "allowed" | "monitored";
  reason: string;
  addedAt: Date;
  requests: number;
}

const mockIPs: IPEntry[] = [
  {
    id: "1",
    ip: "192.168.1.100",
    status: "blocked",
    reason: "DDoS Attack",
    addedAt: new Date(Date.now() - 3600000),
    requests: 5420,
  },
  {
    id: "2",
    ip: "10.0.0.45",
    status: "blocked",
    reason: "SQL Injection Attempt",
    addedAt: new Date(Date.now() - 7200000),
    requests: 234,
  },
  {
    id: "3",
    ip: "172.16.0.23",
    status: "monitored",
    reason: "Suspicious Activity",
    addedAt: new Date(Date.now() - 10800000),
    requests: 156,
  },
];

const IPManager = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [ips, setIps] = useState<IPEntry[]>(mockIPs);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIPs = ips.filter(ip => 
    ip.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ip.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnblock = (id: string) => {
    setIps(prev => prev.filter(ip => ip.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "blocked":
        return "bg-critical/10 text-critical border-critical/20";
      case "allowed":
        return "bg-healthy/10 text-healthy border-healthy/20";
      case "monitored":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-neutral/10 text-neutral border-neutral/20";
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
            <h1 className="text-2xl font-medium text-foreground">IP Manager</h1>
            <p className="text-muted-foreground mt-1">
              Manage blocked, allowed, and monitored IP addresses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blocked IPs</p>
                  <p className="text-3xl font-semibold text-critical mt-1">
                    {ips.filter(ip => ip.status === "blocked").length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-critical" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monitored</p>
                  <p className="text-3xl font-semibold text-warning mt-1">
                    {ips.filter(ip => ip.status === "monitored").length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-warning" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests Blocked</p>
                  <p className="text-3xl font-semibold text-foreground mt-1">
                    {ips.reduce((sum, ip) => sum + ip.requests, 0).toLocaleString()}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-muted-foreground" />
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search IP addresses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add IP
                </Button>
              </div>
            </div>

            <div className="divide-y divide-border">
              {filteredIPs.map((entry) => (
                <div key={entry.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div>
                        <p className="font-mono text-lg font-medium text-foreground mb-1">
                          {entry.ip}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {entry.reason}
                        </p>
                      </div>
                      <Badge className={cn("text-xs", getStatusColor(entry.status))}>
                        {entry.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        <span>{entry.requests.toLocaleString()} requests</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>Added {entry.addedAt.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUnblock(entry.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
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

export default IPManager;
