import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, AlertTriangle, CheckCircle, AlertOctagon, Phone, Home } from "lucide-react";
import { useAppState, RiskLevel } from "@/context/AppContext";

interface DecisionNode {
  risk: RiskLevel;
  text: string;
  nextStep: string;
}

const decisionTree: Record<string, DecisionNode> = {
  "chest pain": {
    risk: "emergency",
    text: "⚠️ Chest pain can indicate a cardiac emergency. This is a HIGH RISK symptom.",
    nextStep: "Call emergency services (911/112) immediately. Do NOT drive yourself.",
  },
  "shortness of breath": {
    risk: "emergency",
    text: "⚠️ Shortness of breath requires urgent medical evaluation. HIGH RISK.",
    nextStep: "Go to the nearest emergency room or call emergency services now.",
  },
  "breathing difficulty": {
    risk: "emergency",
    text: "⚠️ Difficulty breathing is a medical emergency. HIGH RISK.",
    nextStep: "Call emergency services immediately. Stay calm and sit upright.",
  },
  fever: {
    risk: "moderate",
    text: "Fever may indicate an infection. This is a MODERATE RISK symptom.",
    nextStep: "Take paracetamol as directed. Stay hydrated. Seek care if fever exceeds 39°C or lasts 48+ hours.",
  },
  cough: {
    risk: "moderate",
    text: "A persistent cough is a MODERATE RISK symptom that may need monitoring.",
    nextStep: "Rest and drink warm fluids. See a doctor if it lasts over 2 weeks or produces blood.",
  },
  diarrhea: {
    risk: "moderate",
    text: "Diarrhea can cause dehydration. MODERATE RISK, especially for children and elderly.",
    nextStep: "Use oral rehydration salts. Seek care if it lasts over 2 days or you see blood.",
  },
  headache: {
    risk: "low",
    text: "Headaches are common and usually not serious. LOW RISK.",
    nextStep: "Stay hydrated and rest. Visit a clinic if pain worsens or persists beyond 3 days.",
  },
  "sore throat": {
    risk: "low",
    text: "A sore throat is usually viral and resolves on its own. LOW RISK.",
    nextStep: "Gargle warm salt water, rest, and stay hydrated. See a doctor if it persists over a week.",
  },
};

function getTriageResponse(input: string): DecisionNode {
  const lower = input.toLowerCase();
  for (const [keyword, node] of Object.entries(decisionTree)) {
    if (lower.includes(keyword)) return node;
  }
  return {
    risk: "low",
    text: "I couldn't identify a specific condition. Please describe your symptoms in more detail.",
    nextStep: "If you feel unwell, visit your nearest community health center for a check-up.",
  };
}

interface Message {
  role: "user" | "ai";
  text: string;
  risk?: RiskLevel;
  nextStep?: string;
}

const riskConfig: Record<RiskLevel, { label: string; icon: typeof CheckCircle; className: string }> = {
  low: { label: "Low Risk", icon: CheckCircle, className: "risk-low" },
  moderate: { label: "Moderate Risk", icon: AlertTriangle, className: "risk-elevated" },
  emergency: { label: "EMERGENCY: High Risk", icon: AlertOctagon, className: "risk-emergency" },
};

const TriagePage = () => {
  const { addTriageResult, isOfflineMode } = useAppState();
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hello! I'm your MediBridge health assistant. Describe your symptoms and I'll assess the urgency level." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getTriageResponse(userMsg.text);
      const aiMsg: Message = { role: "ai", text: response.text, risk: response.risk, nextStep: response.nextStep };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      addTriageResult({
        id: crypto.randomUUID(),
        symptom: userMsg.text,
        risk: response.risk,
        advice: response.text,
        nextStep: response.nextStep,
        timestamp: new Date(),
      });
    }, 1200);
  };

  return (
    <div className={`flex h-[calc(100dvh-4.5rem)] flex-col ${isOfflineMode ? "bg-background contrast-125" : ""}`}>
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-3">
        <h1 className="text-lg font-bold text-foreground">Symptom Checker</h1>
        <p className="text-xs text-muted-foreground">JSON Decision Tree Engine · Proof of Logic</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={msg.role === "ai" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}>
                {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
              </AvatarFallback>
            </Avatar>
            <div className={`max-w-[80%] space-y-2 ${msg.role === "user" ? "items-end" : ""}`}>
              <Card className={`p-3 ${msg.role === "user" ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </Card>
              {msg.risk && (
                <div className="space-y-1.5">
                  {(() => {
                    const config = riskConfig[msg.risk];
                    const Icon = config.icon;
                    return (
                      <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.className} ${msg.risk === "emergency" ? "animate-pulse" : ""}`}>
                        <Icon size={14} />
                        {config.label}
                      </div>
                    );
                  })()}
                  <Card className="bg-muted/50 p-2.5">
                    <p className="text-xs font-semibold text-foreground">Next Step:</p>
                    <p className="text-xs text-muted-foreground">{msg.nextStep}</p>
                  </Card>
                  {msg.risk === "emergency" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-1 gap-1.5 rounded-xl animate-pulse"
                      onClick={() => window.open("tel:911")}
                    >
                      <Phone size={14} />
                      Call Nearest Clinic
                    </Button>
                  )}
                  {msg.risk === "moderate" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-1 gap-1.5 rounded-xl border-warning/30 text-warning hover:bg-warning/10 hover:text-warning"
                    >
                      <Home size={14} />
                      Home Care Guide
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary"><Bot size={16} /></AvatarFallback>
            </Avatar>
            <Card className="bg-card p-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "300ms" }} />
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-3">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 rounded-xl"
          />
          <Button type="submit" size="icon" className="shrink-0 rounded-xl" disabled={!input.trim()}>
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TriagePage;
