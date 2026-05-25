"use client";

import { useState } from "react";
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

const sectionEmojis: Record<string, string> = {
  warmup: "W",
  touches: "T",
  speed: "S",
  "position-specific": "P",
  recovery: "R",
  "soccer-iq": "IQ",
};

export function WeeklyPlanPage({ state }: WeeklyPlanPageProps) {
  const currentWeek = getWeekForDay(state.currentDay);
  const [viewWeek, setViewWeek] = useState(currentWeek);

  const plan = getWeeklyPlan(viewWeek);
  if (!plan) return <p className="text-zinc-400">No plan found for this week.</p>;

  const phase = phaseInfo[plan.phase];
  const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Screen version */}
      <div className="space-y-6 no-print">
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

        <Button
          variant="outline"
          onClick={handlePrint}
          className="border-zinc-700 text-zinc-300"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Weekly Plan
        </Button>

        {/* Week Info */}
        <Card className="bg-zinc-900 border-zinc-800 p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                Phase {plan.phase}: {phase.name}
              </Badge>
              <h2 className="text-xl font-bold text-white mt-2">{plan.theme}</h2>
            </div>
            <span className="text-sm text-zinc-500">Week {viewWeek} of 13</span>
          </div>
        </Card>

        {/* Daily Schedule */}
        <div className="space-y-3">
          {plan.days.map((day) => {
            const isCompleted = !!state.completions[day.dayNumber];
            const dayIndex = (day.dayNumber - 1) % 7;

            return (
              <Card
                key={day.dayNumber}
                className={`bg-zinc-900 border-zinc-800 p-4 ${
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
                      <p className="font-semibold text-white">
                        {dayOfWeek[dayIndex]} &middot; Day {day.dayNumber}
                      </p>
                      <p className="text-xs text-zinc-500">{day.title}</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">{day.totalMinutes} min</span>
                </div>

                <div className="space-y-2 ml-6">
                  {day.sections.map((section) => (
                    <div key={section.id} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 mt-2 shrink-0" />
                      <div>
                        <p className="text-sm text-zinc-300 font-medium">
                          {section.title} ({section.estimatedMinutes}m)
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {section.drills.map((drillId, i) => {
                            const drill = getDrillById(drillId);
                            return drill ? (
                              <span key={`${drillId}-${i}`} className="text-xs text-zinc-500">
                                {drill.name}{i < section.drills.length - 1 ? " · " : ""}
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
        <Card className="bg-zinc-900 border-zinc-800 p-5">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            Parent Notes
          </h3>
          <p className="text-sm text-zinc-400 mb-4">{plan.parentNotes}</p>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Recovery Reminders
          </h4>
          <ul className="space-y-1.5">
            {plan.recoveryReminders.map((reminder, i) => (
              <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                <span className="text-emerald-400">&#8226;</span>
                {reminder}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Print version — hidden on screen, shown only when printing */}
      <div className="print-content hidden print-only">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <h1>Soccer Academy — Week {viewWeek} of 13</h1>
          <span style={{ fontSize: "10pt", color: "#666" }}>
            Phase {plan.phase}: {phase.name}
          </span>
        </div>
        <h2 style={{ marginBottom: 12 }}>{plan.theme}</h2>

        {plan.days.map((day) => {
          const dayIndex = (day.dayNumber - 1) % 7;
          return (
            <div key={day.dayNumber} className="print-day">
              <div className="print-day-header">
                <span>
                  <span className="print-checkbox" />
                  {dayOfWeek[dayIndex]} — Day {day.dayNumber}: {day.title}
                </span>
                <span style={{ fontWeight: 400, fontSize: "9pt", color: "#888" }}>
                  {day.totalMinutes} min
                </span>
              </div>
              {day.sections.map((section) => (
                <div key={section.id} className="print-section">
                  <span className="print-section-title">
                    [{sectionEmojis[section.type] || "•"}] {section.title} ({section.estimatedMinutes}m)
                  </span>
                  <div className="print-drill">
                    {section.drills.map((drillId, i) => {
                      const drill = getDrillById(drillId);
                      return drill ? (
                        <span key={`${drillId}-${i}`}>
                          <span className="print-checkbox" />
                          {drill.name}
                          {drill.touchCount ? ` (${drill.touchCount} touches)` : ""}
                          {i < section.drills.length - 1 ? "   " : ""}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Parent Notes */}
        <div className="print-notes-box">
          <h3>Parent / Coach Notes</h3>
          <p style={{ fontSize: "9pt", color: "#555", marginBottom: 6 }}>{plan.parentNotes}</p>
          <p style={{ fontSize: "9pt", fontWeight: 600, marginBottom: 4 }}>Recovery Reminders:</p>
          <ul style={{ fontSize: "9pt", color: "#555", paddingLeft: 16, margin: 0 }}>
            {plan.recoveryReminders.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Blank notes area */}
        <div className="print-notes-box" style={{ marginTop: 12 }}>
          <h3 style={{ marginBottom: 8 }}>Session Notes</h3>
          <div className="print-notes-lines" />
          <div className="print-notes-lines" />
          <div className="print-notes-lines" />
          <div className="print-notes-lines" />
          <div className="print-notes-lines" />
        </div>
      </div>
    </>
  );
}
