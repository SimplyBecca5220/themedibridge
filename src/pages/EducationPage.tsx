import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Baby,
  Droplets,
  Apple,
  Heart,
  Pill,
  ShieldCheck,
  Syringe,
  Brain,
} from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";

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

const EducationPage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading for skeleton demo
  useState(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  });

  return (
    <div className="safe-bottom px-4 py-6 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground">Health Literacy</h1>
        <p className="text-sm text-muted-foreground">Evidence-based guides for your community</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : guides.map(({ icon: Icon, title, desc, color }) => (
              <Card key={title} className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
                    <Button variant="outline" size="sm" className="mt-1 h-7 rounded-lg text-xs">
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default EducationPage;
