import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Stethoscope, PiggyBank, BookOpen, FileText, ArrowRight, Activity, Users, GraduationCap, Download } from "lucide-react";
import { useAppState } from "@/context/AppContext";
import { useEffect, useState } from "react";

function useAnimatedNumber(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

const generateImpactReport = () => {
  const now = new Date();
  const report = `
══════════════════════════════════════
   MEDIBRIDGE AI — IMPACT REPORT
══════════════════════════════════════
Generated: ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}

── TRIAGE ACCURACY ──────────────────
  Accuracy Rate:    98%
  Protocol:         WHO Emergency Triage
  Assessment Model: JSON Decision Tree
  Coverage:         8 symptom categories
  Risk Levels:      Low / Moderate / Emergency

── COMMUNITY SAVINGS ────────────────
  Total Saved:      $1,240 USD
  Active Wallets:   87 community members
  Avg. Contribution: $14.25 per user
  Goal Completion:  34% average progress

── DIGITAL LITERACY ─────────────────
  Modules Completed: 450
  First-time Users:  312
  Topics Covered:    Maternal Health, Nutrition,
                     Hygiene, Vaccination, Water Safety,
                     Heart Health, Medicine Safety,
                     Mental Wellness
  Badge Earners:     48 "Community Health Champions"

── METHODOLOGY ──────────────────────
  Data Period:   ${now.toLocaleString("default", { month: "long", year: "numeric" })}
  Source:        MediBridge AI Functional MVP
  Disclaimer:    Simulated metrics for demonstration.
                 Real deployment will use live data.
══════════════════════════════════════
`;
  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `MediBridge_Impact_Report_${now.toISOString().slice(0, 10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

const HomePage = () => {
  const navigate = useNavigate();
  const { triageHistory, transactions, readArticles } = useAppState();

  const triageAccuracy = useAnimatedNumber(98);
  const communitySavings = useAnimatedNumber(1240);
  const modulesCompleted = useAnimatedNumber(450);

  return (
    <div className="safe-bottom px-4 pb-4">
      {/* Hero */}
      <section className="flex flex-col items-center pt-10 pb-8 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Shield className="text-primary" size={32} />
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          MediBridge AI
        </h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">Functional MVP</p>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Healthcare triage, financial inclusion, and health literacy — with documented proof of work.
        </p>
        <Button
          size="lg"
          className="mt-6 gap-2 rounded-xl px-8 text-base font-semibold shadow-lg shadow-primary/25"
          onClick={() => navigate("/triage")}
        >
          Start Triage Now
          <ArrowRight size={18} />
        </Button>
      </section>

      {/* Impact Dashboard */}
      <section className="mb-5">
        <Card className="border-primary/20 overflow-hidden">
          <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity size={18} className="text-primary" />
              Impact Dashboard
              <span className="ml-auto text-[10px] font-normal text-muted-foreground">Live · Simulated</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            <div className="grid grid-cols-3 gap-2">
              {/* Triage Accuracy */}
              <div className="rounded-xl border border-border bg-card p-3 text-center space-y-1">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-success/10">
                  <Stethoscope size={18} className="text-success" />
                </div>
                <p className="text-xl font-extrabold text-foreground">{triageAccuracy}%</p>
                <p className="text-[10px] leading-tight text-muted-foreground">Triage Accuracy</p>
                <p className="text-[9px] text-muted-foreground/70">WHO Protocols</p>
              </div>

              {/* Community Savings */}
              <div className="rounded-xl border border-border bg-card p-3 text-center space-y-1">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-warning/10">
                  <Users size={18} className="text-warning" />
                </div>
                <p className="text-xl font-extrabold text-foreground">${communitySavings.toLocaleString()}</p>
                <p className="text-[10px] leading-tight text-muted-foreground">Community Savings</p>
                <p className="text-[9px] text-muted-foreground/70">This month (USD)</p>
              </div>

              {/* Digital Literacy */}
              <div className="rounded-xl border border-border bg-card p-3 text-center space-y-1">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap size={18} className="text-primary" />
                </div>
                <p className="text-xl font-extrabold text-foreground">{modulesCompleted}</p>
                <p className="text-[10px] leading-tight text-muted-foreground">Digital Literacy</p>
                <p className="text-[9px] text-muted-foreground/70">Modules completed</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full gap-2 rounded-xl border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
              onClick={generateImpactReport}
            >
              <Download size={16} />
              Download Impact Report
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-3">
        {[
          { icon: Stethoscope, label: "Symptom\nChecker", path: "/triage", color: "bg-primary/10 text-primary", stat: `${triageHistory.length} sessions` },
          { icon: PiggyBank, label: "Medical\nWallet", path: "/savings", color: "bg-success/10 text-success", stat: `${transactions.length} txns` },
          { icon: BookOpen, label: "Health\nGuides", path: "/education", color: "bg-warning/10 text-warning", stat: `${readArticles.size} read` },
          { icon: FileText, label: "Export\nSnapshot", path: "/export", color: "bg-muted text-muted-foreground", stat: "Proof of work" },
        ].map(({ icon: Icon, label, path, color, stat }) => (
          <Card
            key={path}
            className="cursor-pointer transition-transform active:scale-95 hover:shadow-md"
            onClick={() => navigate(path)}
          >
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                <Icon size={22} />
              </div>
              <span className="text-xs font-semibold leading-tight text-foreground whitespace-pre-line">{label}</span>
              <span className="text-[10px] text-muted-foreground">{stat}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Status */}
      <Card className="mt-5 border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Shield className="text-primary" size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Offline-Ready MVP</p>
            <p className="text-xs text-muted-foreground">
              Toggle "Save Offline" in the header for high-contrast low-bandwidth mode.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
