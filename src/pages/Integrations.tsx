import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, CheckCircle2, AlertCircle } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected" | "error";
  icon: string;
  category: string;
}

const mockIntegrations: Integration[] = [
  {
    id: "1",
    name: "Slack",
    description: "Receive real-time alerts in your Slack workspace",
    status: "connected",
    icon: "💬",
    category: "Communication",
  },
  {
    id: "2",
    name: "PagerDuty",
    description: "Trigger incidents for critical threats",
    status: "connected",
    icon: "📟",
    category: "Incident Management",
  },
  {
    id: "3",
    name: "Jira",
    description: "Create tickets for security incidents",
    status: "disconnected",
    icon: "🎫",
    category: "Project Management",
  },
  {
    id: "4",
    name: "Webhook",
    description: "Send events to custom endpoints",
    status: "error",
    icon: "🔗",
    category: "Custom",
  },
];

const Integrations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [integrations] = useState<Integration[]>(mockIntegrations);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="w-5 h-5 text-healthy" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-critical" />;
      default:
        return <Share2 className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-healthy/10 text-healthy border-healthy/20">Connected</Badge>;
      case "error":
        return <Badge className="bg-critical/10 text-critical border-critical/20">Error</Badge>;
      default:
        return <Badge variant="outline">Disconnected</Badge>;
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
            <h1 className="text-2xl font-medium text-foreground">Integrations</h1>
            <p className="text-muted-foreground mt-1">
              Connect your security platform with your favorite tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Integrations</p>
                  <p className="text-3xl font-semibold text-healthy mt-1">
                    {integrations.filter(i => i.status === "connected").length}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-healthy" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-3xl font-semibold text-foreground mt-1">
                    {integrations.length}
                  </p>
                </div>
                <Share2 className="w-8 h-8 text-primary" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Errors</p>
                  <p className="text-3xl font-semibold text-critical mt-1">
                    {integrations.filter(i => i.status === "error").length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-critical" />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.category}</p>
                      </div>
                    </div>
                    {getStatusIcon(integration.status)}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {integration.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {getStatusBadge(integration.status)}
                    <Button 
                      variant={integration.status === "connected" ? "outline" : "default"}
                      size="sm"
                    >
                      {integration.status === "connected" ? "Configure" : "Connect"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Integrations;
