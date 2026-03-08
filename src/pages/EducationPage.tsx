import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Baby, Droplets, Apple, Heart, Pill, ShieldCheck, Syringe, Brain,
  CheckCircle, Award, User, ChevronLeft,
} from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";
import { useAppState } from "@/context/AppContext";

const guides = [
  {
    icon: Baby,
    title: "Maternal Health",
    desc: "Essential nutrition for expecting mothers",
    color: "bg-primary/10 text-primary",
    content:
      "A healthy pregnancy requires iron-rich foods like leafy greens and beans. Avoid raw unpasteurized milk and ensure you attend at least 4 prenatal checkups.\n\nKey nutrients include folic acid, calcium, and vitamin D. Expecting mothers should also stay hydrated, get adequate rest, and monitor blood pressure regularly.\n\nWarning signs to watch for: severe headaches, blurred vision, swelling of hands/face, or reduced baby movement. Seek care immediately if these occur.",
    quiz: "Have you scheduled your next prenatal checkup?",
  },
  {
    icon: Droplets,
    title: "Safe Drinking Water",
    desc: "How to prevent water-borne diseases at home",
    color: "bg-primary/10 text-primary",
    content:
      "Contaminated water is a leading cause of illness. Follow the 3-Step Rule: Boil, Filter, and Cover. Always wash hands before handling water storage.\n\nBoil water for at least 1 minute at a rolling boil. If boiling isn't possible, use water purification tablets or a ceramic filter. Store clean water in covered containers with a narrow opening.\n\nCommon waterborne diseases include cholera, typhoid, and dysentery. Children under 5 are most vulnerable.",
    quiz: "Have you boiled your water today?",
  },
  {
    icon: Apple,
    title: "Nutrition Basics",
    desc: "Balanced diet, child nutrition, and food safety",
    color: "bg-success/10 text-success",
    content:
      "A balanced diet includes proteins (beans, eggs, fish), carbohydrates (rice, yams, bread), vitamins (fruits, vegetables), and healthy fats (groundnuts, palm oil in moderation).\n\nChildren need frequent, nutrient-dense meals. Exclusive breastfeeding is recommended for the first 6 months. After that, introduce soft complementary foods while continuing breastfeeding.\n\nFood safety tip: Always wash hands before preparing food, cook meat thoroughly, and refrigerate leftovers within 2 hours.",
    quiz: "Did you include vegetables in your last meal?",
  },
  {
    icon: Heart,
    title: "Heart Health",
    desc: "Managing blood pressure and cardiovascular risk",
    color: "bg-emergency/10 text-emergency",
    content:
      "High blood pressure (hypertension) is a silent killer — most people have no symptoms until serious damage occurs. Regular monitoring is essential, especially after age 30.\n\nReduce risk by limiting salt intake, exercising for at least 30 minutes daily, maintaining a healthy weight, and avoiding excessive alcohol. Stress management through deep breathing and community support also helps.\n\nWarning signs of a heart attack: chest pain, shortness of breath, pain in left arm/jaw. Call emergency services immediately.",
    quiz: "Have you checked your blood pressure this month?",
  },
  {
    icon: Pill,
    title: "Medicine Safety",
    desc: "Proper medication use and avoiding counterfeit drugs",
    color: "bg-warning/10 text-warning",
    content:
      "Always buy medicines from licensed pharmacies. Check expiry dates, packaging integrity, and NAFDAC registration numbers before purchase.\n\nTake medications exactly as prescribed — complete the full course of antibiotics even if you feel better. Never share prescription medicines or use leftover medication from previous illnesses.\n\nSigns of counterfeit drugs: unusually cheap prices, misspelled labels, no batch number, unusual taste or color. Report suspected fakes to health authorities.",
    quiz: "Have you checked the expiry date on your current medications?",
  },
  {
    icon: ShieldCheck,
    title: "Hygiene Practices",
    desc: "Handwashing, sanitation, and infection control",
    color: "bg-success/10 text-success",
    content:
      "Proper handwashing with soap for at least 20 seconds is the most effective way to prevent infections. Key moments: before eating, after using the toilet, after coughing/sneezing, and before handling food.\n\nKeep your living environment clean — dispose of waste properly, use latrines/toilets, and keep food preparation areas sanitized.\n\nDuring disease outbreaks, additional measures include wearing face masks, maintaining distance from sick individuals, and disinfecting frequently touched surfaces.",
    quiz: "Did you wash your hands with soap before your last meal?",
  },
  {
    icon: Syringe,
    title: "Vaccination Guide",
    desc: "Child immunization schedules and vaccine safety",
    color: "bg-primary/10 text-primary",
    content:
      "Vaccines protect children from deadly diseases like measles, polio, tuberculosis, and hepatitis B. Follow the national immunization schedule starting from birth.\n\nKey vaccines: BCG (birth), OPV (birth, 6, 10, 14 weeks), Pentavalent (6, 10, 14 weeks), Measles (9 months), Yellow Fever (9 months).\n\nVaccines are safe. Mild side effects like low fever or soreness at the injection site are normal and resolve quickly. Severe reactions are extremely rare. Keep your child's immunization card updated.",
    quiz: "Is your child's vaccination card up to date?",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    desc: "Stress management, community support, and resilience",
    color: "bg-warning/10 text-warning",
    content:
      "Mental health is just as important as physical health. Common signs of stress include difficulty sleeping, loss of appetite, irritability, and feeling overwhelmed.\n\nCoping strategies: Talk to someone you trust, maintain a daily routine, engage in physical activity, limit exposure to negative news, and practice deep breathing exercises.\n\nCommunity support matters — check on your neighbors, especially the elderly and those living alone. If someone expresses thoughts of self-harm, listen without judgment and help them access professional support.",
    quiz: "Have you taken a moment to check on your mental well-being today?",
  },
];

const BADGE_THRESHOLD = 3;

const EducationPage = () => {
  const { readArticles, markArticleRead, isOfflineMode } = useAppState();
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, "yes" | "no">>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const completedCount = readArticles.size;
  const hasBadge = completedCount >= BADGE_THRESHOLD;

  // Lesson detail view
  if (activeLesson !== null) {
    const lesson = guides[activeLesson];
    const Icon = lesson.icon;
    const isRead = readArticles.has(lesson.title);
    const quizAnswer = quizAnswers[lesson.title];

    return (
      <div className={`safe-bottom px-4 py-6 space-y-5 ${isOfflineMode ? "contrast-125" : ""}`}>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 -ml-2 text-muted-foreground"
          onClick={() => setActiveLesson(null)}
        >
          <ChevronLeft size={16} />
          Back to Guides
        </Button>

        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${lesson.color}`}>
            <Icon size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{lesson.title}</h1>
            <p className="text-xs text-muted-foreground">{lesson.desc}</p>
          </div>
          {isRead && <CheckCircle size={18} className="text-success ml-auto" />}
        </div>

        {/* Content */}
        <Card>
          <CardContent className="p-4 space-y-3">
            {lesson.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* Quiz */}
        <Card className="border-primary/20">
          <CardContent className="p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">Quick Check</p>
            <p className="text-sm text-muted-foreground">{lesson.quiz}</p>
            {quizAnswer ? (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-success/30 text-success gap-1">
                  <CheckCircle size={10} />
                  You answered: {quizAnswer === "yes" ? "Yes" : "No"}
                </Badge>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setQuizAnswers((prev) => ({ ...prev, [lesson.title]: "yes" }))}
                >
                  Yes ✓
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg"
                  onClick={() => setQuizAnswers((prev) => ({ ...prev, [lesson.title]: "no" }))}
                >
                  Not Yet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mark complete */}
        {!isRead ? (
          <Button
            className="w-full rounded-xl gap-2"
            onClick={() => {
              markArticleRead(lesson.title);
            }}
          >
            <CheckCircle size={16} />
            Mark Lesson Complete
          </Button>
        ) : (
          <div className="text-center">
            <Badge className="bg-success text-success-foreground border-0 gap-1 px-4 py-1.5">
              <CheckCircle size={14} /> Lesson Completed
            </Badge>
          </div>
        )}
      </div>
    );
  }

  // List view
  return (
    <div className={`safe-bottom px-4 py-6 space-y-5 ${isOfflineMode ? "contrast-125" : ""}`}>
      <div>
        <h1 className="text-xl font-bold text-foreground">Health Literacy</h1>
        <p className="text-sm text-muted-foreground">Evidence-based guides · Tap to read</p>
      </div>

      {/* Badge Section */}
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
          : guides.map(({ icon: Icon, title, desc, color }, index) => {
              const isRead = readArticles.has(title);
              return (
                <Card
                  key={title}
                  className={`cursor-pointer transition-all hover:shadow-md active:scale-[0.98] ${isRead ? "border-success/30 bg-success/5" : ""}`}
                  onClick={() => setActiveLesson(index)}
                >
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 space-y-1">
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
                        <p className="mt-1 text-[10px] text-primary font-medium">Tap to read →</p>
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
