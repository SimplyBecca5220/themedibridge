import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Baby, Droplets, Apple, Heart, Pill, ShieldCheck, Syringe, Brain, CheckCircle, Award, User,
} from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";
import { useAppState } from "@/context/AppContext";

const guides = [
  { icon: Baby, title: "Maternal Health", desc: "Prenatal care, safe delivery, postpartum wellness", color: "bg-primary/10 text-primary" },
  { icon: Droplets, title: "Water Safety", desc: "Clean water practices and waterborne disease prevention", color: "bg-primary/10 text-primary" },
  { icon: Apple, title: "Nutrition Basics", desc: "Balanced diet, child nutrition, and food safety", color: "bg-success/10 text-success" },
  { icon: Heart, title: "Heart Health", desc: "Managing blood pressure and cardiovascular risk", color: "bg-emergency/10 text-emergency" },
  { icon: Pill, title: "Medicine Safety", desc: "Proper medication use and avoiding counterfeit drugs", color: "bg-warning/10 text-warning" },
  { icon: ShieldCheck, title: "Hygiene Practices", desc: "Handwashing, sanitation, and infection control", color: "bg-success/10 text-success" },
  { icon: Syringe, title: "Vaccination Guide", desc: "Child immunization schedules and vaccine safety", color: "bg-primary/10 text-primary" },
  { icon: Brain, title: "Mental Wellness", desc: "Stress management, community support, and resilience", color: "bg-warning/10 text-warning" },
];

const BADGE_THRESHOLD = 3;

const EducationPage = () => {
  const { readArticles, markArticleRead, isOfflineMode } = useAppState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const completedCount = readArticles.size;
  const hasBadge = completedCount >= BADGE_THRESHOLD;

  return (
    <div className={`safe-bottom px-4 py-6 space-y-5 ${isOfflineMode ? "contrast-125" : ""}`}>
      <div>
        <h1 className="text-xl font-bold text-foreground">Health Literacy</h1>
        <p className="text-sm text-muted-foreground">Evidence-based guides · Proof of Literacy</p>
      </div>

      {/* User Profile / Badge Section */}
      <Card className={hasBadge ? "border-warning/30 bg-warning/5" : ""}>
        <CardContent className="flex items-center gap-4 p-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${hasBadge ? "bg-warning/10" : "bg-muted"}`}>
            {hasBadge ? <Award size={24} className="text-warning" /> : <User size={24} className="text-muted-foreground" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Your Progress</p>
            <p className="text-xs text-muted-foreground">{completedCount} of {guides.length} guides completed</p>
            {hasBadge && (
              <Badge className="mt-1.5 bg-warning text-warning-foreground border-0">
                🏆 Community Health Champion
              </Badge>
            )}
            {!hasBadge && (
              <p className="mt-1 text-[10px] text-muted-foreground">
                Complete {BADGE_THRESHOLD - completedCount} more to earn your badge!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : guides.map(({ icon: Icon, title, desc, color }) => {
              const isRead = readArticles.has(title);
              return (
                <Card key={title} className={`transition-shadow hover:shadow-md ${isRead ? "border-success/30 bg-success/5" : ""}`}>
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                        {isRead && <CheckCircle size={14} className="text-success" />}
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
                      {isRead ? (
                        <Badge variant="outline" className="mt-1 gap-1 border-success/30 text-success text-[10px]">
                          <CheckCircle size={10} /> Completed
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-1 h-7 rounded-lg text-xs"
                          onClick={() => markArticleRead(title)}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default EducationPage;
