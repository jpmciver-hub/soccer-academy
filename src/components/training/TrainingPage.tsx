"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AppState } from "@/types";
import { getDailyTraining, getWeekForDay, getPhaseForDay, phaseInfo, allWeeklyPlans } from "@/data/training-plans";
import { getDrillById } from "@/data/drills";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  Check,
  ExternalLink,
} from "lucide-react";

interface TrainingPageProps {
  state: AppState;
  onToggleDrill: (dayNumber: number, drillId: string) => void;
  onCompleteDay: (dayNumber: number) => void;
}

const sectionIcons: Record<string, string> = {
  warmup: "🔥",
  touches: "⚽",
  speed: "⚡",
  "position-specific": "📍",
  recovery: "🧘",
  "soccer-iq": "🧠",
};

export function TrainingPage({ state, onToggleDrill, onCompleteDay }: TrainingPageProps) {
  const [viewDay, setViewDay] = useState(state.currentDay);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["all"]));

  const training = getDailyTraining(viewDay);
  const week = getWeekForDay(viewDay);
  const phase = getPhaseForDay(viewDay);
  const phaseData = phaseInfo[phase];
  const completion = state.completions[viewDay];
  const completedDrills = new Set(completion?.completedDrills || []);

  const totalDrills = training?.sections.reduce((sum, s) => sum + s.drills.length, 0) || 0;
  const completedCount = completedDrills.size;
  const progressPercent = totalDrills > 0 ? Math.round((completedCount / totalDrills) * 100) : 0;
  const isComplete = totalDrills > 0 && completedCount === totalDrills;

  const maxDay = allWeeklyPlans.reduce((max, w) => {
    const lastDay = w.days[w.days.length - 1]?.dayNumber || 0;
    return Math.max(max, lastDay);
  }, 0);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isSectionExpanded = (id: string) => expandedSections.has(id) || expandedSections.has("all");

  if (!training) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl mb-4">🎓</p>
        <h2 className="text-xl font-bold text-white">Program Complete!</h2>
        <p className="text-zinc-400 mt-2">You&apos;ve finished all 90 days. You&apos;re academy ready!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Day Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={`border-zinc-700 text-xs`}>Phase {phase}</Badge>
            <Badge variant="outline" className="border-zinc-700 text-xs">Week {week}</Badge>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white">{training.title}</h1>
          <p className="text-sm text-zinc-400 mt-1">Day {viewDay} &middot; {training.totalMinutes} minutes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewDay(Math.max(1, viewDay - 1))}
            disabled={viewDay <= 1}
            className="border-zinc-700 text-zinc-300 h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-zinc-400 w-16 text-center">Day {viewDay}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewDay(Math.min(maxDay, viewDay + 1))}
            disabled={viewDay >= maxDay}
            className="border-zinc-700 text-zinc-300 h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="bg-zinc-900 border-zinc-800 p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-zinc-400">Session Progress</span>
          <span className="text-white font-semibold">{completedCount}/{totalDrills} drills</span>
        </div>
        <Progress value={progressPercent} className="h-2.5 bg-zinc-800" />
        {isComplete && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-emerald-400 text-sm font-medium mt-2 text-center"
          >
            Session Complete! Great work!
          </motion.p>
        )}
      </Card>

      {/* Training Sections */}
      <div className="space-y-3">
        {training.sections.map((section) => {
          const expanded = isSectionExpanded(section.id);
          const sectionCompleted = section.drills.every((id) => completedDrills.has(id));

          return (
            <Card key={section.id} className="bg-zinc-900 border-zinc-800 overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{sectionIcons[section.type] || "📋"}</span>
                  <div className="text-left">
                    <p className="font-semibold text-white">{section.title}</p>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                      <Clock className="h-3 w-3" />
                      <span>{section.estimatedMinutes} min</span>
                      <span>&middot;</span>
                      <span>{section.drills.length} drills</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {sectionCompleted && (
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </div>
                  )}
                  {expanded ? (
                    <ChevronUp className="h-4 w-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 space-y-2">
                      {section.drills.map((drillId) => {
                        const drill = getDrillById(drillId);
                        if (!drill) return null;
                        const isDone = completedDrills.has(drillId);

                        return (
                          <DrillItem
                            key={`${section.id}-${drillId}`}
                            name={drill.name}
                            description={drill.description}
                            estimatedMinutes={drill.estimatedMinutes}
                            difficulty={drill.difficulty}
                            coachingPoints={drill.coachingPoints}
                            videoUrl={drill.videoUrl}
                            completed={isDone}
                            onToggle={() => onToggleDrill(viewDay, drillId)}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>

      {/* Complete Day Button */}
      {!state.completions[viewDay] && totalDrills > 0 && completedCount > 0 && (
        <Button
          onClick={() => onCompleteDay(viewDay)}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-6 text-lg rounded-xl"
        >
          {isComplete ? "Mark Day Complete" : `Save Progress (${completedCount}/${totalDrills})`}
        </Button>
      )}
    </div>
  );
}

function DrillItem({
  name,
  description,
  estimatedMinutes,
  difficulty,
  coachingPoints,
  videoUrl,
  completed,
  onToggle,
}: {
  name: string;
  description: string;
  estimatedMinutes: number;
  difficulty: string;
  coachingPoints: string[];
  videoUrl?: string;
  completed: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const difficultyColors: Record<string, string> = {
    beginner: "text-emerald-400 bg-emerald-400/10",
    intermediate: "text-amber-400 bg-amber-400/10",
    advanced: "text-red-400 bg-red-400/10",
  };

  return (
    <div className={`rounded-lg border transition-colors ${completed ? "border-emerald-500/30 bg-emerald-500/5" : "border-zinc-800 bg-zinc-800/30"}`}>
      <div className="flex items-center gap-3 p-3">
        <Checkbox
          checked={completed}
          onCheckedChange={onToggle}
          className="border-zinc-600 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
        />
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-left"
        >
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${completed ? "text-zinc-500 line-through" : "text-white"}`}>
              {name}
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
              <span className="text-xs text-zinc-500">{estimatedMinutes}m</span>
            </div>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pl-10 space-y-3">
              <p className="text-sm text-zinc-400">{description}</p>
              {coachingPoints.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Coaching Points</p>
                  <ul className="space-y-1">
                    {coachingPoints.map((point, i) => (
                      <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                        <Dumbbell className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300"
                >
                  <ExternalLink className="h-3 w-3" />
                  Watch Demo Video
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
