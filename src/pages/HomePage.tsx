import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Stethoscope, PiggyBank, BookOpen, FileText, ArrowRight } from "lucide-react";
import { useAppState } from "@/context/AppContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { triageHistory, transactions, readArticles } = useAppState();

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
