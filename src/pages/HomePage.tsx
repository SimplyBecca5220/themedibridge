import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Stethoscope, PiggyBank, BookOpen, ArrowRight } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="safe-bottom px-4 pb-4">
      {/* Hero */}
      <section className="flex flex-col items-center pt-12 pb-10 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Shield className="text-primary" size={32} />
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          Your AI Health<br />Companion
        </h1>
        <p className="mt-3 max-w-xs text-base text-muted-foreground">
          Fast, Free, and Secure. Healthcare triage and financial wellness for everyone.
        </p>
        <Button
          size="lg"
          className="mt-8 gap-2 rounded-xl px-8 text-base font-semibold shadow-lg shadow-primary/25"
          onClick={() => navigate("/triage")}
        >
          Start Triage Now
          <ArrowRight size={18} />
        </Button>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-3 gap-3">
        {[
          { icon: Stethoscope, label: "Check\nSymptoms", path: "/triage", color: "bg-primary/10 text-primary" },
          { icon: PiggyBank, label: "Medical\nSavings", path: "/savings", color: "bg-success/10 text-success" },
          { icon: BookOpen, label: "Health\nGuides", path: "/education", color: "bg-warning/10 text-warning" },
        ].map(({ icon: Icon, label, path, color }) => (
          <Card
            key={path}
            className="cursor-pointer transition-transform active:scale-95 hover:shadow-md"
            onClick={() => navigate(path)}
          >
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                <Icon size={22} />
              </div>
              <span className="text-xs font-semibold leading-tight text-foreground whitespace-pre-line">
                {label}
              </span>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Status Banner */}
      <Card className="mt-6 border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Shield className="text-primary" size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Offline-Ready</p>
            <p className="text-xs text-muted-foreground">
              Core features work without internet. Your data stays on your device.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
