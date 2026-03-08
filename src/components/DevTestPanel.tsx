import { useNavigate } from "react-router-dom";
import { useAppState } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, AlertOctagon, PiggyBank, WifiOff, Play, CheckCircle } from "lucide-react";
import { useState } from "react";

type ScenarioStatus = "idle" | "running" | "pass" | "fail";

const DevTestPanel = () => {
  const { devTestMode, addTriageResult, addTransaction, isOfflineMode, toggleOfflineMode } = useAppState();
  const navigate = useNavigate();
  const [statusA, setStatusA] = useState<ScenarioStatus>("idle");
  const [statusB, setStatusB] = useState<ScenarioStatus>("idle");
  const [statusC, setStatusC] = useState<ScenarioStatus>("idle");

  if (!devTestMode) return null;

  const runScenarioA = () => {
    setStatusA("running");
    addTriageResult({
      id: crypto.randomUUID(),
      symptom: "Chest pain and sweating",
      risk: "emergency",
      advice: "⚠️ Chest pain with sweating indicates a possible cardiac emergency. HIGH RISK.",
      nextStep: "Call 911 immediately. GPS: Nearest Hospital — 6.5244°N, 3.3792°E (Lagos University Teaching Hospital)",
      timestamp: new Date(),
    });
    setTimeout(() => {
      setStatusA("pass");
      navigate("/triage");
    }, 600);
  };

  const runScenarioB = () => {
    setStatusB("running");
    addTransaction(500); // $5 = 500 units (₦500)
    setTimeout(() => {
      setStatusB("pass");
      navigate("/savings");
    }, 600);
  };

  const runScenarioC = () => {
    setStatusC("running");
    if (!isOfflineMode) toggleOfflineMode();
    setTimeout(() => {
      setStatusC("pass");
    }, 600);
  };

  const statusBadge = (status: ScenarioStatus) => {
    if (status === "idle") return <Badge variant="outline" className="text-[10px]">Ready</Badge>;
    if (status === "running") return <Badge className="bg-warning text-warning-foreground text-[10px] animate-pulse">Running…</Badge>;
    if (status === "pass") return <Badge className="bg-success text-success-foreground text-[10px] gap-1"><CheckCircle size={10} />PASS</Badge>;
    return <Badge variant="destructive" className="text-[10px]">FAIL</Badge>;
  };

  return (
    <div className="fixed bottom-20 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2">
      <Card className="border-primary/30 bg-card shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <FlaskConical size={16} className="text-primary" />
            Developer Test Mode
            <Badge className="bg-primary/10 text-primary border-0 text-[10px]">ACTIVE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Scenario A */}
          <div className="flex items-center gap-2 rounded-lg border border-border p-2.5">
            <AlertOctagon size={16} className="shrink-0 text-emergency" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">A: Emergency Triage</p>
              <p className="text-[10px] text-muted-foreground">Chest pain → Red Alert + GPS</p>
            </div>
            {statusBadge(statusA)}
            <Button size="sm" variant="outline" className="h-8 gap-1 text-xs shrink-0" onClick={runScenarioA} disabled={statusA === "running"}>
              <Play size={12} />Run
            </Button>
          </div>

          {/* Scenario B */}
          <div className="flex items-center gap-2 rounded-lg border border-border p-2.5">
            <PiggyBank size={16} className="shrink-0 text-success" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">B: Financial Ledger</p>
              <p className="text-[10px] text-muted-foreground">Add ₦500 → Timestamped entry</p>
            </div>
            {statusBadge(statusB)}
            <Button size="sm" variant="outline" className="h-8 gap-1 text-xs shrink-0" onClick={runScenarioB} disabled={statusB === "running"}>
              <Play size={12} />Run
            </Button>
          </div>

          {/* Scenario C */}
          <div className="flex items-center gap-2 rounded-lg border border-border p-2.5">
            <WifiOff size={16} className="shrink-0 text-warning" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">C: Low Bandwidth</p>
              <p className="text-[10px] text-muted-foreground">Offline → High-contrast + Cached</p>
            </div>
            {statusBadge(statusC)}
            <Button size="sm" variant="outline" className="h-8 gap-1 text-xs shrink-0" onClick={runScenarioC} disabled={statusC === "running"}>
              <Play size={12} />Run
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevTestPanel;
