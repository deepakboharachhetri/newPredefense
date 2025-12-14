import { X, Flag, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBlockedIPs } from "@/hooks/useApi";

interface BlockedIP {
  id: string;
  ip: string;
  country: string;
  countryCode: string;
  reason: string;
  blockedAt: Date;
  isNew?: boolean;
}

const getCountryFlag = (countryCode: string) => {
  // Convert country code to flag emoji
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const formatTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
};

export const QuarantineWidget = () => {
  const { data: blockedIPsResponse, isLoading, error } = useBlockedIPs();
  const apiBlockedIPs = Array.isArray(blockedIPsResponse?.data?.data) ? blockedIPsResponse.data.data : [];
  
  // Use API data directly without local state for simpler reactivity
  const ips: BlockedIP[] = apiBlockedIPs.map((item: any, index: number) => {
    try {
      return {
        id: item?.id || `ip-${index}`,
        ip: item?.ip || 'Unknown',
        country: item?.country || 'Unknown',
        countryCode: item?.country_code || 'XX',
        reason: item?.reason || 'Security threat',
        blockedAt: item?.blocked_at ? new Date(item.blocked_at) : new Date(),
        isNew: false,
      };
    } catch (e) {
      return {
        id: `ip-${index}`,
        ip: 'Unknown',
        country: 'Unknown',
        countryCode: 'XX',
        reason: 'Error loading data',
        blockedAt: new Date(),
        isNew: false,
      };
    }
  });

  return (
    <div className="card-elevated p-6 row-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="widget-header">Quarantine</h3>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {ips.length} blocked
        </span>
      </div>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {ips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Shield className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">No blocked IPs</p>
            <p className="text-xs mt-1">System is monitoring traffic</p>
          </div>
        ) : ips.map((ip, index) => (
          <div
            key={ip.id}
            className={cn(
              "group flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
              "hover:bg-muted/50 cursor-pointer",
              ip.isNew && "animate-flash-critical"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
            onMouseEnter={() => setHoveredId(ip.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Flag */}
            <span className="text-xl" title={ip.country}>
              {getCountryFlag(ip.countryCode)}
            </span>

            {/* IP & Reason */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-mono font-medium text-foreground truncate">
                {ip.ip}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {ip.reason} • {formatTimeAgo(ip.blockedAt)}
              </p>
            </div>

            {/* Unblock Button */}
            <button
              onClick={() => {/* TODO: Implement unblock via API */}}
              className={cn(
                "flex-shrink-0 p-1.5 rounded-lg transition-all duration-200",
                "opacity-0 group-hover:opacity-100",
                "hover:bg-critical/10 text-muted-foreground hover:text-critical"
              )}
              title="Unblock IP"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {ips.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-healthy/10 flex items-center justify-center mb-3">
            <Flag className="w-6 h-6 text-healthy" />
          </div>
          <p className="text-sm text-muted-foreground">
            All quiet on the western front.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            No active threats detected.
          </p>
        </div>
      )}
    </div>
  );
};
