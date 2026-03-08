import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, MessageSquare, AlertOctagon, AlertTriangle, CheckCircle, PiggyBank, BookOpen, FileText, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    label: "User Input",
    desc: "Symptom described in chat",
    color: "bg-primary/10 text-primary border-primary/30",
  },
  {
    icon: GitBranch,
    label: "Decision Tree",
    desc: "JSON keyword matching engine",
    color: "bg-muted text-muted-foreground border-border",
  },
  {
    icon: AlertOctagon,
    label: "Emergency Path",
    desc: "Chest pain, breathing → Red Alert + GPS",
    color: "bg-emergency/10 text-emergency border-emergency/30",
  },
  {
    icon: AlertTriangle,
    label: "Moderate Path",
    desc: "Fever, cough → Home Care Guide",
    color: "bg-warning/10 text-warning border-warning/30",
  },
  {
    icon: CheckCircle,
    label: "Low Risk Path",
    desc: "Headache, sore throat → Self-care tips",
    color: "bg-success/10 text-success border-success/30",
  },
];

const pillars = [
  { icon: PiggyBank, label: "Financial Ledger", desc: "Savings tracked with timestamps", color: "text-success" },
  { icon: BookOpen, label: "Literacy Tracker", desc: "Articles → Knowledge Badge", color: "text-warning" },
  { icon: FileText, label: "Data Export", desc: "Health Snapshot for providers", color: "text-muted-foreground" },
];

const LogicFlowDiagram = () => (
  <Card className="border-border overflow-hidden">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-base">
        <GitBranch size={18} className="text-primary" />
        Logic Flow Diagram
        <span className="ml-auto text-[10px] font-normal text-muted-foreground">Triage Engine Architecture</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-0 pt-1 pb-4">
      {/* Triage flow */}
      {steps.map((step, i) => (
        <div key={step.label}>
          <div className={`flex items-center gap-3 rounded-lg border p-2.5 ${step.color}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/80">
              <step.icon size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold">{step.label}</p>
              <p className="text-[10px] opacity-80">{step.desc}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-1">
              <ArrowDown size={14} className="text-muted-foreground/40" />
            </div>
          )}
        </div>
      ))}

      {/* Parallel pillars */}
      <div className="mt-3 pt-3 border-t border-dashed border-border">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Parallel Pillars</p>
        <div className="grid grid-cols-3 gap-2">
          {pillars.map((p) => (
            <div key={p.label} className="rounded-lg border border-border p-2 text-center space-y-1">
              <p.icon size={16} className={`mx-auto ${p.color}`} />
              <p className="text-[10px] font-semibold text-foreground leading-tight">{p.label}</p>
              <p className="text-[9px] text-muted-foreground leading-tight">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LogicFlowDiagram;
