import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PiggyBank, Plus, Target, TrendingUp } from "lucide-react";

const SavingsPage = () => {
  const [goal] = useState(50000);
  const [saved, setSaved] = useState(12500);
  const [dailyInput, setDailyInput] = useState("");

  const progress = Math.min((saved / goal) * 100, 100);

  const handleContribute = () => {
    const amount = parseInt(dailyInput);
    if (amount > 0) {
      setSaved((prev) => Math.min(prev + amount, goal));
      setDailyInput("");
    }
  };

  return (
    <div className="safe-bottom px-4 py-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Financial Health</h1>
        <p className="text-sm text-muted-foreground">Build your emergency medical fund</p>
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
              <span className="text-2xl font-bold text-foreground">
                ₦{saved.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                of ₦{goal.toLocaleString()}
              </span>
            </div>
            <Progress value={progress} className="h-3 rounded-full" />
            <p className="mt-1 text-xs text-muted-foreground">{progress.toFixed(1)}% complete</p>
          </div>

          {/* Daily Contribution */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Daily Contribution</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter amount (₦)"
                value={dailyInput}
                onChange={(e) => setDailyInput(e.target.value)}
                className="flex-1 rounded-xl"
              />
              <Button onClick={handleContribute} className="gap-1.5 rounded-xl" disabled={!dailyInput}>
                <Plus size={16} />
                Save
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
              <p className="text-xs text-muted-foreground">Days to Goal</p>
              <p className="text-lg font-bold text-foreground">
                {dailyInput && parseInt(dailyInput) > 0
                  ? Math.ceil((goal - saved) / parseInt(dailyInput))
                  : "—"}
              </p>
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
              <p className="text-lg font-bold text-foreground">₦{(goal - saved).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavingsPage;
