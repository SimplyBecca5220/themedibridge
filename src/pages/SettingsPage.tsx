import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Info } from "lucide-react";
import { useAppState } from "@/context/AppContext";

const SettingsPage = () => {
  const { devTestMode, toggleDevTestMode } = useAppState();

  return (
    <div className="safe-bottom px-4 py-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">App configuration & developer tools</p>
      </div>

      <Card className={devTestMode ? "border-primary/30 bg-primary/5" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <FlaskConical size={18} className="text-primary" />
            Developer Test Mode
            {devTestMode && (
              <Badge className="bg-primary/10 text-primary border-0 text-[10px]">ACTIVE</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Enable Test Mode</p>
              <p className="text-xs text-muted-foreground">Run proof-of-work scenarios for AI logic</p>
            </div>
            <Switch checked={devTestMode} onCheckedChange={toggleDevTestMode} />
          </div>

          {devTestMode && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-2">
              <div className="flex items-start gap-2">
                <Info size={14} className="mt-0.5 shrink-0 text-primary" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><span className="font-semibold text-foreground">Scenario A:</span> Emergency triage — inputs "Chest pain and sweating" → Red Alert + GPS coordinates</p>
                  <p><span className="font-semibold text-foreground">Scenario B:</span> Financial ledger — adds ₦500 → timestamped entry + progress bar update</p>
                  <p><span className="font-semibold text-foreground">Scenario C:</span> Low bandwidth — toggles offline mode → high-contrast UI + "Data Cached" badge</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground">A floating test panel will appear at the bottom of the screen.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
