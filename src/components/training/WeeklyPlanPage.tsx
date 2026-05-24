"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppState } from "@/types";
import { getWeeklyPlan, getWeekForDay, phaseInfo } from "@/data/training-plans";
import { getDrillById } from "@/data/drills";
import {
  Printer,
  ChevronLeft,
  ChevronRight,
  Check,
  Circle,
  AlertCircle,
} from "lucide-react";

interface WeeklyPlanPageProps {
  state: AppState;
}

export function WeeklyPlanPage({ state }: WeeklyPlanPageProps) {
  const currentWeek = getWeekForDay(state.currentDay);
  const [viewWeek, setViewWeek] = useState(currentWeek);
  const printRef = useRef<HTMLDivElement>(null);

  const plan = getWeeklyPlan(viewWeek);
  if (!plan) return <p className="text-zinc-400">No plan found for this week.</p>;

  const phase = phaseInfo[plan.phase];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Weekly Plan</h1>
          <p className="text-zinc-400 mt-1">Printable training schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewWeek(Math.max(1, viewWeek - 1))}
            disabled={viewWeek <= 1}
            className="border-zinc-700 text-zinc-300 h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-zinc-400 w-20 text-center">Week {viewWeek}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewWeek(Math.min(13, viewWeek + 1))}
            disabled={viewWeek >= 13}
            className="border-zinc-700 text-zinc-300 h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Print Button */}
      <Button
        variant="outline"
        onClick={handlePrint}
        className="border-zinc-700 text-zinc-300 print:hidden"
      >
        <Printer className="h-4 w-4 mr-2" />
        Print Weekly Plan
      </Button>

      {/* Printable Content */}
      <div ref={printRef} className="print:text-black print:bg-white">
        {/* Week Info */}
        <Card className="bg-zinc-900 border-zinc-800 p-5 print:bg-white print:border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400 print:border-gray-400 print:text-gray-600">
                Phase {plan.phase}: {phase.name}
              </Badge>
              <h2 className="text-xl font-bold text-white mt-2 print:text-black">{plan.theme}</h2>
            </div>
            <span className="text-sm text-zinc-500 print:text-gray-600">Week {viewWeek} of 13</span>
          </div>
        </Card>

        {/* Daily Schedule */}
        <div className="space-y-3 mt-4">
          {plan.days.map((day) => {
            const isCompleted = !!state.completions[day.dayNumber];
            const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            const dayIndex = (day.dayNumber - 1) % 7;

            return (
              <Card
                key={day.dayNumber}
                className={`bg-zinc-900 border-zinc-800 p-4 print:bg-white print:border-gray-300 ${
                  isCompleted ? "border-l-2 border-l-emerald-500" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4 text-zinc-600" />
                    )}
                    <div>
                      <p className="font-semibold text-white print:text-black">
                        {dayOfWeek[dayIndex]} &middot; Day {day.dayNumber}
                      </p>
                      <p className="text-xs text-zinc-500 print:text-gray-500">{day.title}</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 print:text-gray-500">{day.totalMinutes} min</span>
                </div>

                <div className="space-y-2 ml-6">
                  {day.sections.map((section) => (
                    <div key={section.id} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 shrink-0" />
                      <div>
                        <p className="text-sm text-zinc-300 print:text-gray-700 font-medium">
                          {section.title} ({section.estimatedMinutes}m)
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {section.drills.map((drillId) => {
                            const drill = getDrillById(drillId);
                            return drill ? (
                              <span key={drillId} className="text-xs text-zinc-500 print:text-gray-500">
                                {drill.name}{section.drills.indexOf(drillId) < section.drills.length - 1 ? " · " : ""}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Parent Notes */}
        <Card className="bg-zinc-900 border-zinc-800 p-5 mt-4 print:bg-white print:border-gray-300">
          <h3 className="font-semibold text-white print:text-black mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400 print:text-amber-600" />
            Parent Notes
          </h3>
          <p className="text-sm text-zinc-400 print:text-gray-600 mb-4">{plan.parentNotes}</p>

          <h4 className="text-xs font-semibold text-zinc-500 print:text-gray-500 uppercase tracking-wider mb-2">
            Recovery Reminders
          </h4>
          <ul className="space-y-1.5">
            {plan.recoveryReminders.map((reminder, i) => (
              <li key={i} className="text-sm text-zinc-400 print:text-gray-600 flex items-start gap-2">
                <span className="text-emerald-400 print:text-emerald-600">&#8226;</span>
                {reminder}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
