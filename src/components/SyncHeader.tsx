import { useAppState } from "@/context/AppContext";
import { Wifi, WifiOff, Zap, Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const SyncHeader = () => {
  const { isOfflineMode, toggleOfflineMode } = useAppState();

  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
      <div className="flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full ${isOfflineMode ? "bg-warning/10" : "bg-success/10"}`}>
          {isOfflineMode ? <WifiOff size={14} className="text-warning" /> : <Wifi size={14} className="text-success" />}
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">
            {isOfflineMode ? "Offline Mode" : "Synced"}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {isOfflineMode ? "High-contrast · Low bandwidth" : "All data up to date"}
          </p>
        </div>
        {isOfflineMode && (
          <Badge className="ml-1 gap-1 bg-success/10 text-success border-success/30 text-[10px]">
            <Database size={10} />
            Data Cached
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Zap size={12} className="text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">Save Offline</span>
        <Switch checked={isOfflineMode} onCheckedChange={toggleOfflineMode} />
      </div>
    </div>
  );
};

export default SyncHeader;
