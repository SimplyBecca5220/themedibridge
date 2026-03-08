import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, AlertTriangle, CheckCircle, AlertOctagon } from "lucide-react";

type RiskLevel = "low" | "elevated" | "emergency";

interface Message {
  role: "user" | "ai";
  text: string;
  risk?: RiskLevel;
  nextStep?: string;
}

const triageResponses: Record<string, { risk: RiskLevel; text: string; nextStep: string }> = {
  headache: {
    risk: "low",
    text: "Headaches are common and usually not serious. Stay hydrated and rest.",
    nextStep: "Monitor for 24 hours. Visit a clinic if pain worsens or persists beyond 3 days.",
  },
  fever: {
    risk: "elevated",
    text: "Fever may indicate an infection. Monitor your temperature closely.",
    nextStep: "Take paracetamol as directed. Seek medical attention if fever exceeds 39°C or lasts more than 48 hours.",
  },
  "chest pain": {
    risk: "emergency",
    text: "Chest pain can be a sign of a serious cardiac event.",
    nextStep: "Call emergency services (911/112) immediately. Do not drive yourself.",
  },
  cough: {
    risk: "low",
    text: "A cough is often viral and resolves on its own within 1-2 weeks.",
    nextStep: "Rest, drink warm fluids. See a doctor if cough lasts over 2 weeks or produces blood.",
  },
  "breathing difficulty": {
    risk: "emergency",
    text: "Difficulty breathing requires urgent evaluation.",
    nextStep: "Go to the nearest emergency room or call emergency services immediately.",
  },
  diarrhea: {
    risk: "elevated",
    text: "Diarrhea can lead to dehydration, especially in children and elderly.",
    nextStep: "Use oral rehydration salts. Seek care if symptoms last over 2 days or you see blood.",
  },
};

function getTriageResponse(input: string) {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(triageResponses)) {
    if (lower.includes(keyword)) return response;
  }
  return {
    risk: "low" as RiskLevel,
    text: "I couldn't identify a specific condition. Please describe your symptoms in more detail.",
    nextStep: "If you feel unwell, visit your nearest community health center for a check-up.",
  };
}

const riskConfig: Record<RiskLevel, { label: string; icon: typeof CheckCircle; className: string }> = {
  low: { label: "Low Risk", icon: CheckCircle, className: "risk-low" },
  elevated: { label: "Elevated Risk", icon: AlertTriangle, className: "risk-elevated" },
  emergency: { label: "Emergency", icon: AlertOctagon, className: "risk-emergency" },
};

const TriagePage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hello! I'm your MediBridge health assistant. Describe your symptoms and I'll help assess the urgency." },
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
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: response.text, risk: response.risk, nextStep: response.nextStep },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex h-[calc(100dvh-4.5rem)] flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-3">
        <h1 className="text-lg font-bold text-foreground">Symptom Checker</h1>
        <p className="text-xs text-muted-foreground">Powered by MediBridge AI</p>
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
                      <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}>
                        <Icon size={14} />
                        {config.label}
                      </div>
                    );
                  })()}
                  <Card className="bg-muted/50 p-2.5">
                    <p className="text-xs font-semibold text-foreground">Next Step:</p>
                    <p className="text-xs text-muted-foreground">{msg.nextStep}</p>
                  </Card>
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
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
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
