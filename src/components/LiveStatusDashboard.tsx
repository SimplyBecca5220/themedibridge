import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/context/AppContext";
import { Radio, CheckCircle, AlertTriangle, AlertOctagon, Wifi, WifiOff, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const LiveStatusDashboard = () => {
  const { triageHistory, transactions, savedAmount, readArticles, isOfflineMode } = useAppState();
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setUptime((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec.toString().padStart(2, "0")}s`;
  };

  const emergencyCount = triageHistory.filter((t) => t.risk === "emergency").length;
  const moderateCount = triageHistory.filter((t) => t.risk === "moderate").length;
  const lowCount = triageHistory.filter((t) => t.risk === "low").length;

  const statusItems = [
    { label: "Triage Engine", status: "operational" as const },
    { label: "Savings Ledger", status: "operational" as const },
    { label: "Education Tracker", status: "operational" as const },
    { label: "Offline Cache", status: isOfflineMode ? "active" as const : "standby" as const },
  ];

  const statusColor = {
    operational: "bg-success/10 text-success border-success/30",
    active: "bg-warning/10 text-warning border-warning/30",
    standby: "bg-muted text-muted-foreground border-border",
  };

  const statusLabel = {
    operational: "Operational",
    active: "Active",
    standby: "Standby",
  };

  return (
    <Card className="border-border overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Radio size={18} className="text-success animate-pulse" />
          Live Status
          <Badge variant="outline" className="ml-auto gap-1 text-[10px] border-success/30 text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            All Systems Go
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-1">
        {/* Uptime + connectivity */}
        <div className="flex items-center justify-between rounded-lg border border-border p-2.5">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Session Uptime</span>
          </div>
          <span className="text-xs font-mono font-semibold text-foreground">{formatUptime(uptime)}</span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-border p-2.5">
          <div className="flex items-center gap-2">
            {isOfflineMode ? <WifiOff size={14} className="text-warning" /> : <Wifi size={14} className="text-success" />}
            <span className="text-xs text-muted-foreground">Connectivity</span>
          </div>
          <Badge variant="outline" className={`text-[10px] ${isOfflineMode ? "border-warning/30 text-warning" : "border-success/30 text-success"}`}>
            {isOfflineMode ? "Offline" : "Online"}
          </Badge>
        </div>

        {/* Service statuses */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Services</p>
          {statusItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-md border border-border px-2.5 py-2">
              <span className="text-xs text-foreground">{item.label}</span>
              <Badge variant="outline" className={`text-[10px] ${statusColor[item.status]}`}>
                {statusLabel[item.status]}
              </Badge>
            </div>
          ))}
        </div>

        {/* Real-time activity counters */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Session Activity</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-border p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <AlertOctagon size={10} className="text-emergency" />
                <span className="text-lg font-bold text-foreground">{emergencyCount}</span>
              </div>
              <p className="text-[9px] text-muted-foreground">Emergency</p>
            </div>
            <div className="rounded-lg border border-border p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <AlertTriangle size={10} className="text-warning" />
                <span className="text-lg font-bold text-foreground">{moderateCount}</span>
              </div>
              <p className="text-[9px] text-muted-foreground">Moderate</p>
            </div>
            <div className="rounded-lg border border-border p-2 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <CheckCircle size={10} className="text-success" />
                <span className="text-lg font-bold text-foreground">{lowCount}</span>
              </div>
              <p className="text-[9px] text-muted-foreground">Low Risk</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border p-2 text-center">
              <p className="text-lg font-bold text-foreground">₦{savedAmount.toLocaleString()}</p>
              <p className="text-[9px] text-muted-foreground">Saved ({transactions.length} txns)</p>
            </div>
            <div className="rounded-lg border border-border p-2 text-center">
              <p className="text-lg font-bold text-foreground">{readArticles.size}</p>
              <p className="text-[9px] text-muted-foreground">Articles Read</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStatusDashboard;
