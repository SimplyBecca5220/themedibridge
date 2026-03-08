import { useState, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PiggyBank, Plus, Target, TrendingUp, Coins, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import { useAppState } from "@/context/AppContext";

const SavingsPage = () => {
  const { transactions, savedAmount, goal, addTransaction, isOfflineMode } = useAppState();
  const [dailyInput, setDailyInput] = useState("");
  const [bump, setBump] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const progress = Math.min((savedAmount / goal) * 100, 100);

  const fireConfetti = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 40, spread: 55, startVelocity: 25,
      origin: { x, y },
      colors: ["#22C55E", "#0EA5E9", "#F59E0B", "#ffffff"],
      ticks: 80, scalar: 0.8,
    });
  }, []);

  const handleAdd = useCallback((amount: number) => {
    if (amount <= 0 || savedAmount >= goal) return;
    addTransaction(amount);
    setBump(true);
    setTimeout(() => setBump(false), 400);
    fireConfetti();
  }, [savedAmount, goal, addTransaction, fireConfetti]);

  const handleContribute = () => {
    const amount = parseInt(dailyInput);
    if (amount > 0) { handleAdd(amount); setDailyInput(""); }
  };

  return (
    <div className={`safe-bottom px-4 py-6 space-y-5 ${isOfflineMode ? "contrast-125" : ""}`}>
      <div>
        <h1 className="text-xl font-bold text-foreground">Medical Wallet</h1>
        <p className="text-sm text-muted-foreground">Interactive Savings Ledger · Proof of Financial Inclusion</p>
      </div>

      {/* Main Fund Card */}
      <Card className="border-success/20 bg-success/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10">
              <PiggyBank className="text-success" size={22} />
            </div>
            <div>
              <CardTitle className="text-base">Emergency Medical Fund</CardTitle>
              <p className="text-xs text-muted-foreground">Treatment Goal</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className={`text-2xl font-bold text-foreground transition-transform duration-300 ${bump ? "scale-110" : "scale-100"}`}>
                ₦{savedAmount.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">of ₦{goal.toLocaleString()}</span>
            </div>
            <Progress value={progress} className="h-3 rounded-full [&>div]:transition-all [&>div]:duration-700 [&>div]:ease-out" />
            <p className="mt-1 text-xs text-muted-foreground">{progress.toFixed(1)}% complete</p>
          </div>

          {/* Quick Add */}
          <div className="flex gap-2">
            {[1, 5, 10].map((amt) => (
              <Button
                key={amt}
                ref={amt === 1 ? buttonRef : undefined}
                variant="outline"
                size="sm"
                className="flex-1 gap-1 rounded-xl border-success/30 font-semibold text-success hover:bg-success/10 hover:text-success active:scale-95 transition-transform"
                onClick={() => handleAdd(amt * 100)}
              >
                <Coins size={14} />+₦{(amt * 100).toLocaleString()}
              </Button>
            ))}
          </div>

          {/* Custom */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Custom Amount</label>
            <div className="flex gap-2">
              <Input type="number" placeholder="Enter amount (₦)" value={dailyInput} onChange={(e) => setDailyInput(e.target.value)} className="flex-1 rounded-xl" />
              <Button onClick={handleContribute} className="gap-1.5 rounded-xl" disabled={!dailyInput}>
                <Plus size={16} />Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Target className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Transactions</p>
              <p className="text-lg font-bold text-foreground">{transactions.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
              <TrendingUp className="text-success" size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="text-lg font-bold text-foreground">₦{(goal - savedAmount).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock size={16} className="text-muted-foreground" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No transactions yet. Add your first contribution above!</p>
          ) : (
            <div className="max-h-60 space-y-2 overflow-y-auto">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                      <Plus size={14} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">+₦{tx.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {tx.timestamp.toLocaleDateString()} · {tx.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-success">Saved</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SavingsPage;
