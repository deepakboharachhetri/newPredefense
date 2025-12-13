import { useState } from "react";
import { X, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockedIP {
  id: string;
  ip: string;
  country: string;
  countryCode: string;
  reason: string;
  blockedAt: Date;
  isNew?: boolean;
}

const initialIPs: BlockedIP[] = [
  { id: "1", ip: "192.168.0.42", country: "Russia", countryCode: "RU", reason: "SQL Injection", blockedAt: new Date(Date.now() - 1000 * 60 * 2) },
  { id: "2", ip: "10.0.0.115", country: "China", countryCode: "CN", reason: "Brute Force", blockedAt: new Date(Date.now() - 1000 * 60 * 15) },
  { id: "3", ip: "172.16.0.89", country: "Nigeria", countryCode: "NG", reason: "DDoS Pattern", blockedAt: new Date(Date.now() - 1000 * 60 * 45) },
  { id: "4", ip: "192.0.2.100", country: "Iran", countryCode: "IR", reason: "XSS Attempt", blockedAt: new Date(Date.now() - 1000 * 60 * 90) },
  { id: "5", ip: "203.0.113.50", country: "Brazil", countryCode: "BR", reason: "Path Traversal", blockedAt: new Date(Date.now() - 1000 * 60 * 120) },
];

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
  const [ips, setIps] = useState<BlockedIP[]>(initialIPs);
  const [, setHoveredId] = useState<string | null>(null);

  const handleUnblock = (id: string) => {
    setIps((prev) => prev.filter((ip) => ip.id !== id));
  };

  return (
    <div className="card-elevated p-6 row-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="widget-header">Quarantine</h3>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {ips.length} blocked
        </span>
      </div>

      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {ips.map((ip, index) => (
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
              onClick={() => handleUnblock(ip.id)}
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
