"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AppState } from "@/types";
import { getMotivationalMessage } from "@/data/motivational-messages";
import { getDailyTraining, getWeekForDay, phaseInfo, getPhaseForDay } from "@/data/training-plans";
import { achievements } from "@/data/achievements";
import {
  Flame,
  Target,
  Trophy,
  Calendar,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";

interface DashboardPageProps {
  state: AppState;
}

export function DashboardPage({ state }: DashboardPageProps) {
  const { player, progress, currentDay, completions, unlockedAchievements } = state;
  const today = getDailyTraining(currentDay);
  const week = getWeekForDay(currentDay);
  const phase = getPhaseForDay(currentDay);
  const phaseData = phaseInfo[phase];
  const overallProgress = Math.round((progress.completedSessions / 91) * 100);
  const todayCompletion = completions[currentDay];
  const todayDrillCount = today?.sections.reduce((sum, s) => sum + s.drills.length, 0) || 0;
  const todayCompletedCount = todayCompletion?.completedDrills.length || 0;
  const todayProgress = todayDrillCount > 0 ? Math.round((todayCompletedCount / todayDrillCount) * 100) : 0;
  const todayTouches = todayCompletion?.touchLog?.total || 0;

  const recentAchievements = achievements
    .filter((a) => unlockedAchievements.includes(a.id))
    .slice(-3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Hey {player.name} {player.avatarEmoji}
          </h1>
          <p className="text-zinc-400 mt-1">{getMotivationalMessage(currentDay)}</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800">
          <Star className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-semibold text-white">Level {progress.level}</span>
          <span className="text-xs text-zinc-500">{progress.xp.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Phase Progress */}
      <Card className="bg-gradient-to-r border-0 p-[1px] rounded-xl overflow-hidden">
        <div className={`bg-gradient-to-r ${phaseData.color} p-[1px] rounded-xl`}>
          <div className="bg-zinc-950/90 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Phase {phase}</p>
                <h2 className="text-lg font-bold text-white">{phaseData.name}</h2>
              </div>
              <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                Week {week} &middot; Day {currentDay}
              </Badge>
            </div>
            <Progress value={overallProgress} className="h-2 bg-zinc-800" />
            <p className="text-xs text-zinc-500 mt-2">
              {progress.completedSessions} of 91 sessions complete ({overallProgress}%)
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-orange-500/15">
                <Flame className="h-4 w-4 text-orange-400" />
              </div>
              <span className="text-xs text-zinc-500 font-medium">Streak</span>
            </div>
            <p className="text-2xl font-bold text-white">{progress.currentStreak}</p>
            <p className="text-xs text-zinc-500">days</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-emerald-500/15">
                <Target className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-xs text-zinc-500 font-medium">Touches</span>
            </div>
            <p className="text-2xl font-bold text-white">{progress.totalTouches.toLocaleString()}</p>
            <p className="text-xs text-zinc-500">total</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-purple-500/15">
                <Trophy className="h-4 w-4 text-purple-400" />
              </div>
              <span className="text-xs text-zinc-500 font-medium">Badges</span>
            </div>
            <p className="text-2xl font-bold text-white">{unlockedAchievements.length}</p>
            <p className="text-xs text-zinc-500">unlocked</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-blue-500/15">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-xs text-zinc-500 font-medium">Level</span>
            </div>
            <p className="text-2xl font-bold text-white">{progress.level}</p>
            <p className="text-xs text-zinc-500">{progress.xp.toLocaleString()} XP</p>
          </Card>
        </motion.div>
      </div>

      {/* Today's Training & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Today's Training */}
        <Link href="/training">
          <Card className="bg-zinc-900 border-zinc-800 p-5 hover:border-zinc-700 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-400" />
                <h3 className="font-semibold text-white">Today&apos;s Training</h3>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </div>
            {today ? (
              <div className="space-y-3">
                <p className="text-sm text-zinc-400">{today.title}</p>
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                    <span>{todayCompletedCount}/{todayDrillCount} drills</span>
                    <span>{todayProgress}%</span>
                  </div>
                  <Progress value={todayProgress} className="h-1.5 bg-zinc-800" />
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>{today.totalMinutes} min</span>
                  <span>{today.sections.length} sections</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">Program complete! You&apos;re academy ready.</p>
            )}
          </Card>
        </Link>

        {/* Touch Counter Quick */}
        <Link href="/touch-counter">
          <Card className="bg-zinc-900 border-zinc-800 p-5 hover:border-zinc-700 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-400" />
                <h3 className="font-semibold text-white">Today&apos;s Touches</h3>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{todayTouches}</span>
                <span className="text-zinc-500 text-sm">/ 1,000</span>
              </div>
              <Progress value={Math.min((todayTouches / 1000) * 100, 100)} className="h-2 bg-zinc-800" />
              {todayTouches >= 1000 && (
                <p className="text-emerald-400 text-sm font-medium">Target reached!</p>
              )}
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-800 p-5">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-400" />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50"
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{achievement.name}</p>
                  <p className="text-xs text-zinc-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Position Info */}
      <Card className="bg-zinc-900 border-zinc-800 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center text-lg">
            {player.avatarEmoji}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{player.primaryPosition} Specialist</p>
            <p className="text-xs text-zinc-500">Training adapted for your position</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
