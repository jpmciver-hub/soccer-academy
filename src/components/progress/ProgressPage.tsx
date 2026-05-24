"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AppState } from "@/types";
import { achievements } from "@/data/achievements";
import { phaseInfo, getPhaseForDay } from "@/data/training-plans";
import {
  Flame,
  Target,
  Trophy,
  Calendar,
  Star,
  Zap,
  TrendingUp,
  Lock,
} from "lucide-react";

interface ProgressPageProps {
  state: AppState;
}

export function ProgressPage({ state }: ProgressPageProps) {
  const { progress, unlockedAchievements, completions, currentDay } = state;
  const phase = getPhaseForDay(currentDay);

  const weeklyData = useMemo(() => {
    const weeks: { week: number; completed: number; total: number }[] = [];
    for (let w = 1; w <= 13; w++) {
      const start = (w - 1) * 7 + 1;
      const end = w * 7;
      let completed = 0;
      for (let d = start; d <= end; d++) {
        if (completions[d]) completed++;
      }
      weeks.push({ week: w, completed, total: 7 });
    }
    return weeks;
  }, [completions]);

  const xpForNextLevel = (progress.level) * 500;
  const xpProgress = ((progress.xp % 500) / 500) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Progress</h1>
        <p className="text-zinc-400 mt-1">Track your development journey</p>
      </div>

      {/* Level Card */}
      <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Star className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Player Level</p>
              <p className="text-2xl font-bold text-white">Level {progress.level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">{progress.xp.toLocaleString()} XP</p>
            <p className="text-xs text-zinc-500">{xpForNextLevel.toLocaleString()} to next level</p>
          </div>
        </div>
        <Progress value={xpProgress} className="h-2 bg-zinc-800" />
      </Card>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { icon: Calendar, label: "Sessions", value: progress.completedSessions, color: "emerald" },
          { icon: Target, label: "Total Touches", value: progress.totalTouches.toLocaleString(), color: "blue" },
          { icon: Flame, label: "Current Streak", value: `${progress.currentStreak} days`, color: "orange" },
          { icon: Trophy, label: "Best Streak", value: `${progress.longestStreak} days`, color: "purple" },
          { icon: Zap, label: "Speed Sessions", value: progress.speedSessions, color: "amber" },
          { icon: TrendingUp, label: "Weak Foot", value: progress.weakFootSessions, color: "rose" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-zinc-900 border-zinc-800 p-4">
            <stat.icon className={`h-4 w-4 text-${stat.color}-400 mb-2`} />
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-500">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Phase Progress */}
      <Card className="bg-zinc-900 border-zinc-800 p-5">
        <h3 className="font-semibold text-white mb-4">Phase Progress</h3>
        <div className="space-y-4">
          {([1, 2, 3] as const).map((p) => {
            const info = phaseInfo[p];
            const startDay = p === 1 ? 1 : p === 2 ? 36 : 71;
            const endDay = p === 1 ? 35 : p === 2 ? 70 : 91;
            const totalDays = endDay - startDay + 1;
            let completed = 0;
            for (let d = startDay; d <= endDay; d++) {
              if (completions[d]) completed++;
            }
            const pct = Math.round((completed / totalDays) * 100);
            const isCurrent = phase === p;

            return (
              <div key={p} className={`p-3 rounded-lg ${isCurrent ? "bg-zinc-800/50 ring-1 ring-zinc-700" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs ${isCurrent ? "border-emerald-500/30 text-emerald-400" : "border-zinc-700 text-zinc-400"}`}>
                      Phase {p}
                    </Badge>
                    <span className="text-sm text-white font-medium">{info.name}</span>
                  </div>
                  <span className="text-xs text-zinc-500">{completed}/{totalDays} days</span>
                </div>
                <Progress value={pct} className="h-1.5 bg-zinc-800" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Weekly Consistency */}
      <Card className="bg-zinc-900 border-zinc-800 p-5">
        <h3 className="font-semibold text-white mb-4">Weekly Consistency</h3>
        <div className="grid grid-cols-7 md:grid-cols-13 gap-1">
          {weeklyData.map((week) => {
            const intensity = week.completed / week.total;
            let bg = "bg-zinc-800";
            if (intensity > 0) bg = "bg-emerald-900/50";
            if (intensity > 0.3) bg = "bg-emerald-700/50";
            if (intensity > 0.6) bg = "bg-emerald-500/50";
            if (intensity > 0.85) bg = "bg-emerald-400";

            return (
              <div key={week.week} className="text-center">
                <div
                  className={`h-8 w-full rounded-md ${bg} flex items-center justify-center`}
                  title={`Week ${week.week}: ${week.completed}/${week.total}`}
                >
                  <span className="text-xs text-white/70">{week.completed}</span>
                </div>
                <p className="text-xs text-zinc-600 mt-1">W{week.week}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="bg-zinc-900 border-zinc-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Achievements</h3>
          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
            {unlockedAchievements.length}/{achievements.length}
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((achievement) => {
            const unlocked = unlockedAchievements.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  unlocked
                    ? "bg-zinc-800/50 border border-emerald-500/20"
                    : "bg-zinc-800/20 border border-zinc-800 opacity-50"
                }`}
              >
                <span className="text-2xl">{unlocked ? achievement.icon : ""}</span>
                {!unlocked && <Lock className="h-5 w-5 text-zinc-600" />}
                <div>
                  <p className={`text-sm font-medium ${unlocked ? "text-white" : "text-zinc-500"}`}>
                    {achievement.name}
                  </p>
                  <p className="text-xs text-zinc-500">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
