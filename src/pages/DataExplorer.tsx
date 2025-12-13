import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database, Search, Download, Filter } from "lucide-react";

interface DataRecord {
  id: string;
  timestamp: Date;
  eventType: string;
  ip: string;
  endpoint: string;
  status: number;
  responseTime: number;
}

const mockData: DataRecord[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 300000),
    eventType: "API Request",
    ip: "192.168.1.50",
    endpoint: "/api/users",
    status: 200,
    responseTime: 145,
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 600000),
    eventType: "Failed Login",
    ip: "10.0.0.23",
    endpoint: "/auth/login",
    status: 401,
    responseTime: 89,
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 900000),
    eventType: "API Request",
    ip: "172.16.0.100",
    endpoint: "/api/data",
    status: 200,
    responseTime: 234,
  },
];

const DataExplorer = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data] = useState<DataRecord[]>(mockData);

  const filteredData = data.filter(record => 
    record.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.ip.includes(searchQuery) ||
    record.endpoint.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-2xl font-medium text-foreground">Data Explorer</h1>
            <p className="text-muted-foreground mt-1">
              Query and analyze historical security data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                  <p className="text-3xl font-semibold text-foreground mt-1">
                    {data.length.toLocaleString()}
                  </p>
                </div>
                <Database className="w-8 h-8 text-primary" />
              </div>
            </Card>

            <Card className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-3xl font-semibold text-foreground mt-1">
                  {Math.round(data.reduce((sum, r) => sum + r.responseTime, 0) / data.length)}ms
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-semibold text-healthy mt-1">
                  {Math.round((data.filter(r => r.status < 400).length / data.length) * 100)}%
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div>
                <p className="text-sm text-muted-foreground">Unique IPs</p>
                <p className="text-3xl font-semibold text-foreground mt-1">
                  {new Set(data.map(r => r.ip)).size}
                </p>
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Event Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Endpoint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Response Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredData.map((record) => (
                    <tr key={record.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {record.timestamp.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {record.eventType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-foreground">
                        {record.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-muted-foreground">
                        {record.endpoint}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          record.status < 400 ? "bg-healthy/10 text-healthy" : "bg-critical/10 text-critical"
                        )}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {record.responseTime}ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DataExplorer;
