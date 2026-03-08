import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type RiskLevel = "low" | "moderate" | "emergency";

export interface TriageResult {
  id: string;
  symptom: string;
  risk: RiskLevel;
  advice: string;
  nextStep: string;
  timestamp: Date;
}

export interface Transaction {
  id: string;
  amount: number;
  timestamp: Date;
}

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
  risk?: RiskLevel;
  nextStep?: string;
  timestamp: Date;
}

interface AppState {
  // Triage
  triageHistory: TriageResult[];
  addTriageResult: (r: TriageResult) => void;
  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
  // Savings
  transactions: Transaction[];
  savedAmount: number;
  goal: number;
  addTransaction: (amount: number) => void;
  // Education
  readArticles: Set<string>;
  markArticleRead: (title: string) => void;
  // Connectivity
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  // Dev Test Mode
  devTestMode: boolean;
  toggleDevTestMode: () => void;
}

const AppContext = createContext<AppState | null>(null);

export const useAppState = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be inside AppProvider");
  return ctx;
};

const WELCOME_MSG: ChatMessage = {
  role: "ai",
  text: "Hello! I'm your MediBridge health assistant. Describe your symptoms and I'll assess the urgency level.",
  timestamp: new Date(),
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [triageHistory, setTriageHistory] = useState<TriageResult[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savedAmount, setSavedAmount] = useState(0);
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [devTestMode, setDevTestMode] = useState(false);
  const goal = 50000;

  const addTriageResult = useCallback((r: TriageResult) => {
    setTriageHistory((prev) => [...prev, r]);
  }, []);

  const addChatMessage = useCallback((msg: ChatMessage) => {
    setChatMessages((prev) => [...prev, msg]);
  }, []);

  const clearChat = useCallback(() => {
    setChatMessages([{ ...WELCOME_MSG, timestamp: new Date() }]);
  }, []);

  const addTransaction = useCallback((amount: number) => {
    if (amount <= 0) return;
    const tx: Transaction = { id: crypto.randomUUID(), amount, timestamp: new Date() };
    setTransactions((prev) => [tx, ...prev]);
    setSavedAmount((prev) => Math.min(prev + amount, goal));
  }, [goal]);

  const markArticleRead = useCallback((title: string) => {
    setReadArticles((prev) => new Set(prev).add(title));
  }, []);

  const toggleOfflineMode = useCallback(() => {
    setIsOfflineMode((prev) => !prev);
  }, []);

  const toggleDevTestMode = useCallback(() => {
    setDevTestMode((prev) => !prev);
  }, []);

  return (
    <AppContext.Provider
      value={{
        triageHistory, addTriageResult,
        chatMessages, addChatMessage, clearChat,
        transactions, savedAmount, goal, addTransaction,
        readArticles, markArticleRead,
        isOfflineMode, toggleOfflineMode,
        devTestMode, toggleDevTestMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
