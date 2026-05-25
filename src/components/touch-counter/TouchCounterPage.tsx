"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AppState, TouchCategory } from "@/types";
import { Minus, Plus, RotateCcw, PartyPopper } from "lucide-react";

interface TouchCounterPageProps {
  state: AppState;
  onSaveTouches: (touches: Record<TouchCategory, number>) => void;
}

const categories: { key: TouchCategory; label: string; icon: string; color: string }[] = [
  { key: "ball-mastery", label: "Ball Mastery", icon: "⚽", color: "emerald" },
  { key: "passing", label: "Passing", icon: "🎯", color: "blue" },
  { key: "dribbling", label: "Dribbling", icon: "💨", color: "purple" },
  { key: "juggling", label: "Juggling", icon: "🤹", color: "rose" },
  { key: "game-touches", label: "Game Touches", icon: "🏟️", color: "amber" },
];

const colorClasses: Record<string, { bg: string; text: string; ring: string; progress: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/30", progress: "bg-emerald-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", ring: "ring-blue-500/30", progress: "bg-blue-500" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", ring: "ring-purple-500/30", progress: "bg-purple-500" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", ring: "ring-rose-500/30", progress: "bg-rose-500" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/30", progress: "bg-amber-500" },
};

export function TouchCounterPage({ state, onSaveTouches }: TouchCounterPageProps) {
  const todayDate = new Date().toISOString().split("T")[0];
  const existingLog = state.touchLogs.find((l) => l.date === todayDate);

  const [touches, setTouches] = useState<Record<TouchCategory, number>>({
    "ball-mastery": existingLog?.ballMastery || 0,
    passing: existingLog?.passing || 0,
    dribbling: existingLog?.dribbling || 0,
    juggling: existingLog?.juggling || 0,
    "game-touches": existingLog?.gameTouches || 0,
  });

  const [showCelebration, setShowCelebration] = useState(false);

  const total = Object.values(touches).reduce((sum, v) => sum + v, 0);
  const progressPercent = Math.min((total / 1000) * 100, 100);
  const isComplete = total >= 1000;

  const increment = useCallback((category: TouchCategory, amount: number) => {
    setTouches((prev) => {
      const newVal = Math.max(0, prev[category] + amount);
      const newTouches = { ...prev, [category]: newVal };
      const newTotal = Object.values(newTouches).reduce((sum, v) => sum + v, 0);
      if (newTotal >= 1000 && total < 1000) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      return newTouches;
    });
  }, [total]);

  const resetAll = useCallback(() => {
    setTouches({ "ball-mastery": 0, passing: 0, dribbling: 0, juggling: 0, "game-touches": 0 });
  }, []);

  const handleSave = () => {
    onSaveTouches(touches);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Touch Counter</h1>
        <p className="text-zinc-400 mt-1">Track your daily 1,000 touches</p>
      </div>

      {/* Main Counter */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8 relative overflow-hidden">
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-10 bg-zinc-900/90"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="text-6xl mb-4"
                >
                  <PartyPopper className="h-16 w-16 text-amber-400 mx-auto" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white">1,000 Touches!</h2>
                <p className="text-emerald-400 mt-2">Target reached! Amazing work!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mb-6">
          <motion.p
            key={total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-6xl md:text-7xl font-bold text-white tabular-nums"
          >
            {total.toLocaleString()}
          </motion.p>
          <p className="text-zinc-500 text-sm mt-2">
            {isComplete ? "Target reached!" : `${(1000 - total).toLocaleString()} to go`}
          </p>
        </div>

        <Progress value={progressPercent} className="h-3 bg-zinc-800 mb-2" />

        <div className="flex justify-between text-xs text-zinc-500">
          <span>0</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1,000</span>
        </div>
      </Card>

      {/* Category Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const colors = colorClasses[cat.color];
          const catTouches = touches[cat.key];

          return (
            <Card key={cat.key} className="bg-zinc-900 border-zinc-800 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-medium text-white">{cat.label}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increment(cat.key, -10)}
                    className="h-8 w-8 border-zinc-700 text-zinc-400"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increment(cat.key, -1)}
                    className="h-8 w-8 border-zinc-700 text-zinc-400 text-xs"
                  >
                    -1
                  </Button>
                </div>

                <motion.p
                  key={catTouches}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  className={`text-2xl font-bold tabular-nums ${colors.text}`}
                >
                  {catTouches}
                </motion.p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increment(cat.key, 1)}
                    className="h-8 w-8 border-zinc-700 text-zinc-400 text-xs"
                  >
                    +1
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increment(cat.key, 10)}
                    className="h-8 w-8 border-zinc-700 text-zinc-400"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Quick add buttons */}
              <div className="flex gap-1.5 mt-3">
                {[25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => increment(cat.key, amt)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-medium ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity`}
                  >
                    +{amt}
                  </button>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={resetAll}
          className="border-zinc-700 text-zinc-300"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button
          onClick={handleSave}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          Save Today&apos;s Touches
        </Button>
      </div>
    </div>
  );
}
