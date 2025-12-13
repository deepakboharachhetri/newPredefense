import { useState, useEffect } from "react";
import { useHealthCheck } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Activity } from "lucide-react";

export const ApiStatus = () => {
  const { data: healthData, isLoading, isError } = useHealthCheck();
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    if (isLoading) {
      setStatus('checking');
    } else if (isError || !healthData?.success) {
      setStatus('disconnected');
    } else {
      setStatus('connected');
    }
  }, [healthData, isLoading, isError]);

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: CheckCircle2,
          color: 'text-healthy',
          bgColor: 'bg-healthy/10',
          borderColor: 'border-healthy/20',
          text: 'Connected',
        };
      case 'disconnected':
        return {
          icon: AlertCircle,
          color: 'text-critical',
          bgColor: 'bg-critical/10',
          borderColor: 'border-critical/20',
          text: 'API Offline',
        };
      default:
        return {
          icon: Activity,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          text: 'Checking...',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge 
      className={cn(
        "gap-2 text-xs",
        config.bgColor,
        config.color,
        config.borderColor
      )}
    >
      <Icon className="w-3 h-3" />
      {config.text}
    </Badge>
  );
};

// API Connection Info Component
export const ApiConnectionInfo = () => {
  const { data: healthData } = useHealthCheck();

  if (!healthData?.success) return null;

  return (
    <div className="text-xs text-muted-foreground space-y-1">
      <div className="flex items-center gap-2">
        <span>REST API:</span>
        <code className="px-1 py-0.5 bg-muted rounded">http://localhost:8000</code>
      </div>
      <div className="flex items-center gap-2">
        <span>Ryu Controller:</span>
        <code className="px-1 py-0.5 bg-muted rounded">localhost:6633</code>
      </div>
      {healthData.data && (
        <div className="flex items-center gap-2">
          <span>Version:</span>
          <span className="font-mono">{healthData.data.version}</span>
        </div>
      )}
    </div>
  );
};
